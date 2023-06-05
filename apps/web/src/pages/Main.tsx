import { useAppSelector } from "../libs/redux";
import { logout } from "../libs/redux/appSlice";

export const Main = () => {
  const { token } = useAppSelector((state) => state.app);
  console.log(token);

  return (
    <>
      <div>Main</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};
