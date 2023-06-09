import { store } from "../redux";
import { updateAppData } from "../redux/appSlice";

export const fetchTasks = () => {
  fetch(
    `https://cors-anywhere.herokuapp.com/${
      import.meta.env.VITE_API_ENDPOINT
    }/tasks/${store.getState().app.userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      store.dispatch(updateAppData({ tasks: data }));
    })
    .catch((err) => {
      console.error(err);
    });
};
