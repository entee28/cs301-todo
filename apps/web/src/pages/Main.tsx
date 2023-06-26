import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../libs/redux";
import { logout } from "../libs/redux/appSlice";
import { fetchTasks } from "../libs/utils";
import "./css/main.css";

export const Main = () => {
  const { tasks, userId } = useAppSelector((state) => state.app);

  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");

  useEffect(() => {
    fetchTasks();
    console.log(tasks);
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
      <div className="row flex-wrap px-4 m-0">
        {/* menu-sidebar start */}
        <div className="navbar-wrap d-flex flex-column px-3 bg-dark-subtle col-md-3">
          <nav className="navbar navbar-expand-md p-0 mt-3">
            <div className="navbar-body-wrap container-fluid">
              <a className="navbar-brand fs-2 pb m-0" href="#"><i className="fa-solid fa-compass"></i> Menu</a>

              {/* hamburger button */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav nav nav-pills flex-column mb-auto">
                  <div className="hr-html my-3"/> {/* hr */}
                  {/* task start */}
                  <h4 className="task">Task</h4>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#"><i className="fa-solid fa-angles-right me-2"></i>Upcoming</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa-solid fa-list-check me-2"></i>Today</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa-solid fa-calendar-days me-2"></i>Calendar</a>
                  </li>
                  {/* task end */}
                  
                  {/* categories start */}
                  <h4 className="categories mt-3">Categories</h4>
                  <li className="nav-item d-flex flex-wrap">
                    <a href="#"><span className="badge text-bg-info mb-1 me-2">Example 1</span></a>
                    <a href="#"><span className="badge text-bg-info mb-1 me-2">Example 2</span></a>
                    <a href="#"><span className="badge text-bg-light mb-1 me-2"><i className="fa-solid fa-plus me-1"></i>Add Category</span></a>
                  </li>
                  {/* categories end */}
                  <button className="logout-btn btn btn-dark d-md-none d-block mt-3" onClick={logout}>Logout</button>
                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex align-items-end flex-fill pb-4">
            <button className="logout-btn flex-fill btn btn-dark d-none d-md-block" onClick={logout}>Logout</button>
          </div>
        </div>
        {/* menu-sidebar end */}

        {/* page-content start */}
        <div className="page-content ps-4 pe-3 col-md-9">
          <h1 className="text-white my-4 mt-md-0">Task</h1>
          {/* Button trigger modal */}
          <button type="button" className="btn btn-outline-secondary w-100 mb-3" data-bs-toggle="modal" data-bs-target="#addTaskModal">
            <p className="my-1 mx-0 text-start"><i className="fa-solid fa-plus me-2"></i> Add new task</p>
          </button>

          {/* add task modal start */}
          <div className="modal fade" id="addTaskModal" tabIndex={-1} aria-labelledby="addTaskModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-2" id="addTaskModalLabel">Add new task</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body px-3 align-self-center">
                  <label htmlFor="taskName">Task Name:</label><br/>
                  <input
                    autoFocus
                    id="taskName"
                    className="bg-dark-subtle mb-2"
                    type="text"
                    placeholder="do homework..."
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <br/>
                  <label htmlFor="taskNote fw-bold">Task Note:</label><br/>
                  <input
                    id="taskNote"
                    className="bg-dark-subtle"
                    type="text"
                    placeholder="answer 10 questions..."
                    value={taskNote}
                    onChange={(e) => setTaskNote(e.target.value)}
                  />
                  <br/>
                </div>
                <div className="modal-footer justify-content-between">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submitHandler}>Submit</button>
                </div>
              </div>
            </div>
          </div>
          {/* add task modal end */}

          <div className="task-list text-white overflow-y-auto">
            {tasks.map((task) => (
              <div className="task-wrap" key={task.id}>
                <div className="d-flex">
                  <input className="task-checkbox" type="checkbox" id={task.id} value={task.id}/>
                  <label className="flex-fill ms-3" htmlFor={task.id}>
                    <strong className="fs-3">{task.name}</strong><p className="ms-3 mb-1 text-break"><i className="fa-solid fa-note-sticky" style={{color: "orange"}}></i> Note: "{task.note}"</p>
                  </label>
                  <div className="pe-3">
                    <div className="btn-group">
                      <button type="button" className="delete-task-btn btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        ...
                      </button>
                      <ul className="dropdown-menu" style={{minWidth: "auto"}}>
                        <li><button className="btn btn-primary dropdown-item text-primary"><i className="fa-regular fa-pen-to-square"></i> Edit</button></li>
                        <li><button className="btn btn-danger dropdown-item text-danger"><i className="fa-regular fa-trash-can"></i> Delete</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="hr-html mb-2"/> {/* hr */}
              </div>
            ))}
          </div>
        </div>
        {/* page-content end */}
      </div>
    </>
  );
};
