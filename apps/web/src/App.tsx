import {
  LoaderFunction,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./libs/redux";
import { updateAppData } from "./libs/redux/appSlice";
import { Login, Main } from "./pages";
import { getToken } from "./libs/utils";

function App() {
  const { token } = useAppSelector((state) => state.app);

  const loginLoader: LoaderFunction = () => {
    if (token) {
      return redirect("/");
    }

    return null;
  };

  const loader: LoaderFunction = async ({ request }) => {
    if (!token) {
      const dispatch = useAppDispatch();

      const url = new URL(request.url);
      const authCode = url.searchParams.get("code");

      if (!authCode) {
        return redirect("/login");
      } else {
        const data = await getToken(authCode);
        if (data.access_token) {
          dispatch(updateAppData({ token: data.access_token }));
          return null;
        } else {
          return redirect("/login");
        }
      }
    }

    return null;
  };

  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<Main />} index loader={loader} />
        <Route element={<Login />} path="/login" loader={loginLoader} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
