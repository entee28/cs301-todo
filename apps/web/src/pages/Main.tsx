import { useEffect, useMemo, useState } from "react";
import { taskCompleted } from "../../node_modules/@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
import { TaskGroupModal, TaskModal } from "../components";
import { useAppDispatch, useAppSelector } from "../libs/redux";
import {
  logout,
  updateAppData,
  updateSliceGroup,
  updateSliceTasks,
} from "../libs/redux/appSlice";
import { trpc } from "../libs/utils";
import "./css/main.css";

export const Main = () => {
  const { tasks, userId, groups, currentlySelectedGroup } = useAppSelector(
    (state) => state.app
  );
  const dispatch = useAppDispatch();

  const fetchedTasks = trpc.getTasks.useQuery({
    userId: userId || "",
  });
  const fetchedGroups = trpc.getTaskGroups.useQuery({
    userId: userId || "",
  });

  const deleteTask = trpc.deleteTask.useMutation();
  const deleteTaskGroup = trpc.deleteTaskGroup.useMutation();
  const updateTask = trpc.updateTask.useMutation();

  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [taskId, setTaskId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");

  const displayTasks = useMemo(() => {
    if (!currentlySelectedGroup) return tasks; // nếu nó k thuộc group nào thì trả toàn bộ task

    if(currentlySelectedGroup.name === 'Important') return tasks.filter((task) => task.important === true)

    return tasks.filter((task) => task.groupId === currentlySelectedGroup._id);
  }, [currentlySelectedGroup, tasks]);

  useEffect(() => {
    if (fetchedTasks.data) {
      dispatch(updateSliceTasks(fetchedTasks.data));
    }

    if (fetchedGroups.data) {
      dispatch(updateSliceGroup(fetchedGroups.data));
    }
  }, [fetchedTasks]);

  const deleteTaskHandler = (id: string) => {
    deleteTask
      .mutateAsync({ _id: id })
      .then(() => fetchedTasks.refetch())
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTaskGroupHandler = () => {
    deleteTaskGroup
      .mutateAsync({ _id: currentlySelectedGroup?._id || "" })
      .then(() => {
        dispatch(updateAppData({ currentlySelectedGroup: null }));
        fetchedGroups.refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="row flex-wrap px-4 m-0">
        {/* menu-sidebar start */}
        <div className="navbar-wrap d-flex flex-column px-md-3 bg-dark-subtle col-md-3">
          <nav className="navbar navbar-expand-md p-0 mt-3">
            <div className="navbar-body-wrap container-fluid">
              <a className="navbar-brand fs-2 pb m-0" href="#">
                <i className="fa-solid fa-compass"></i> Menu
              </a>

              {/* hamburger button */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav nav nav-pills flex-column mb-auto w-100">
                  <div className="hr-html mt-3 mb-2" /> {/* hr */}
                  {/* task start */}
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        !currentlySelectedGroup && "active fw-bold"
                      }`}
                      aria-current="page"
                      href="#"
                      onClick={() => {
                        dispatch(
                          updateAppData({ currentlySelectedGroup: null })
                        );
                      }}
                    >
                      <i className="fa-solid fa-list-check me-2"></i>All tasks
                      <br/>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        currentlySelectedGroup?.name === "Important" && "active fw-bold"
                      }`}
                      aria-current="page"
                      href="#"
                      onClick={() => {
                        dispatch(
                          updateAppData({ 
                            currentlySelectedGroup:{
                              name: "Important",
                              _id : 123,
                              userId: "hello" || ""
                            }
                            
                          })
                        );
                      }}
                    >
                      <i className="fa-solid fa-list-check me-2"></i>Important tasks
                      <br/>
                    </a>
                  </li>
                  <h5 className="task mt-2">Group Task</h5>
                  <ul
                    className="list-unstyled px-3 overflow-y-auto"
                    style={{ maxHeight: "35vh" }}
                  >
                    {groups.map((group) => (
                      <li key={group._id} className="nav-item">
                        <a
                          className={`nav-link text-limit group-task-item ${
                            currentlySelectedGroup?._id === group._id &&
                            "active fw-bold"
                          }`}
                          href="#"
                          onClick={() => {
                            dispatch(
                              updateAppData({ currentlySelectedGroup: group })
                            );
                          }}
                        >
                          {currentlySelectedGroup?._id === group._id && (
                            <i className="fa-solid fa-angles-right me-2"></i>
                          )}
                          {group.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="btn btn-outline-success add-task-group-btn w-100 p-2 mt-2"
                    data-bs-toggle="modal"
                    data-bs-target="#addTaskGroupModal"
                    onClick={() => {
                      setGroupId("");
                      setGroupName("");
                    }}
                  >
                    <p className="my-1 mx-0 text-start">
                      <i className="fa-solid fa-plus me-2"></i> Create task
                      group
                    </p>
                  </button>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa-solid fa-list-check me-2"></i>Today
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa-solid fa-calendar-days me-2"></i>Calendar
                    </a>
                  </li> */}
                  {/* task end */}
                  {/* categories start */}
                  {/* <h4 className="categories mt-3">Categories</h4>
                  <li className="nav-item d-flex flex-wrap">
                    <a href="#">
                      <span className="badge text-bg-info mb-1 me-2">
                        Example 1
                      </span>
                    </a>
                    <a href="#">
                      <span className="badge text-bg-info mb-1 me-2">
                        Example 2
                      </span>
                    </a>
                    <a href="#">
                      <span className="badge text-bg-light mb-1 me-2">
                        <i className="fa-solid fa-plus me-1"></i>Add Category
                      </span>
                    </a>
                  </li> */}
                  {/* categories end */}
                  <button
                    className="logout-btn btn btn-dark d-md-none d-block mt-3"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </ul>
              </div>
            </div>
          </nav>
          <div className="d-flex align-items-end flex-fill pb-4">
            <button
              className="logout-btn flex-fill btn btn-dark d-none d-md-block"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
        {/* menu-sidebar end */}
                  
        {/* page-content start */}
        <div className="page-content ps-4 pe-3 col-md-9">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-white my-4 mt-md-0">
              {currentlySelectedGroup
                ? currentlySelectedGroup.name
                : "All Task"}
            </h1>

            {currentlySelectedGroup && (
              <div className="p-3">
                <button
                  className="btn btn-outline-primary me-2 mb-2"
                  data-bs-toggle="modal"
                  data-bs-target="#addTaskGroupModal"
                  onClick={() => {
                    setGroupId(currentlySelectedGroup._id);
                    setGroupName(currentlySelectedGroup.name);
                  }}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button
                  className="btn btn-outline-danger mb-2"
                  onClick={deleteTaskGroupHandler}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            )}
          </div>

          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-outline-secondary w-100 mb-3"
            data-bs-toggle="modal"
            data-bs-target="#addTaskModal"
            onClick={() => {
              setTaskName("");
              setTaskNote("");
              setTaskId("");
            }}
          >
            <p className="my-1 mx-0 text-start">
              <i className="fa-solid fa-plus me-2"></i> Add new task
            </p>
          </button>

          {/* add task modal start */}
          <TaskModal
            refetch={fetchedTasks.refetch}
            taskName={taskName}
            taskNote={taskNote}
            taskId={taskId}
            setTaskName={setTaskName}
            setTaskNote={setTaskNote}
          />
          <TaskGroupModal
            groupId={groupId}
            groupName={groupName}
            setGroupName={setGroupName}
            refetch={fetchedGroups.refetch}
          />
          {/* add task modal end */}

          <div className="task-list text-white overflow-y-auto">
            {displayTasks.map((task) => (
              console.log(task),
              
              <div className="task-wrap" key={task._id}>
                <div className="d-flex">                                  
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    id={task._id}
                    value={task._id}
                    checked={task.completed}
                    onChange={() => {
                      updateTask
                        .mutateAsync({
                          _id: task._id,
                          task: {
                            completed: !task.completed,
                          },
                        })
                        .then(() => {
                          fetchedTasks.refetch();
                        });
                    }}
                  />
                  <label className="flex-fill ms-3" htmlFor={task._id}>
                    <strong className="fs-3">{task.name}</strong>
                    <p className="ms-3 mb-1 text-break">
                      <i
                        className="fa-solid fa-note-sticky"
                        style={{ color: "orange" }}
                      ></i>{" "}
                      Note: "{task.note}"
                    </p>
                  </label>
                  <div className="checkbox task-important">
                    <input
                      className="task-important me-3"
                      type="checkbox"
                      id={task._id}
                      value={task._id}
                      checked={task.important}
                      onChange={() => {
                        updateTask
                          .mutateAsync({
                            _id: task._id,
                            task: {
                              important: !task.important
                            },

                          })
                          .then(() => {
                            fetchedTasks.refetch();
                          });
                        
                      }}
                    />
                  </div>
                  <div className="pe-3">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="delete-task-btn btn btn-outline-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ...
                      </button>
                      <ul
                        className="dropdown-menu"
                        style={{ minWidth: "auto" }}
                      >
                        <li>
                          <button
                            className="btn btn-primary dropdown-item text-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#addTaskModal"
                            onClick={() => {
                              setTaskName(task.name);
                              setTaskNote(task.note || "");
                              setTaskId(task._id);
                            }}
                          >
                            <i className="fa-regular fa-pen-to-square"></i> Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn btn-danger dropdown-item text-danger"
                            onClick={() => deleteTaskHandler(task._id)}
                          >
                            <i className="fa-regular fa-trash-can"></i> Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="hr-html mb-2" /> {/* hr */}
              </div>
            ))}
          </div>
        </div>
        {/* page-content end */}
      </div>
    </>
  );
};
