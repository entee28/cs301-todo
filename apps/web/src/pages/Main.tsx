import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../libs/redux";
import { logout } from "../libs/redux/appSlice";
import { fetchTasks } from "../libs/utils";

export const Main = () => {
  const { tasks, userId } = useAppSelector((state) => state.app);

  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const submitHandler = () => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        name: taskName,
        note: taskNote,
        completed: false,
        important: false,
        userId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setTaskName("");
          setTaskNote("");
          fetchTasks();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h1>Task</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>
              <strong>{task.name}: </strong>
            </span>
            <span>{task.note}</span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Note"
        value={taskNote}
        onChange={(e) => setTaskNote(e.target.value)}
      />
      <button onClick={submitHandler}>Submit</button>

      <button onClick={logout}>Logout</button>
    </>
  );
};
