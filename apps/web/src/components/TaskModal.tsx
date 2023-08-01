import { useState } from "react";
import { useAppSelector } from "../libs/redux";
import { trpc } from "../libs/utils";

type Props = {
  taskName: string;
  taskNote: string;
  taskId: string;
  setTaskName: (name: string) => void;
  setTaskNote: (note: string) => void;
  refetch: () => void;
};

export const TaskModal = ({
  taskName,
  taskNote,
  taskId,
  setTaskName,
  setTaskNote,
  refetch,
}: Props) => {
  const { userId, groups, currentlySelectedGroup } = useAppSelector(
    (state) => state.app
  );

  const [groupId, setGroupId] = useState(currentlySelectedGroup?._id);

  const createTask = trpc.addTask.useMutation();
  const updateTask = trpc.updateTask.useMutation();

  const submitHandler = () => {
    if (!userId) return;

    let normalizedGroupId = groupId === "all" ? undefined : groupId;

    console.log(normalizedGroupId);

    if (taskName && taskId) {
      updateTask
        .mutateAsync({
          _id: taskId,
          task: {
            name: taskName,
            note: taskNote,
            userId,
            groupId: normalizedGroupId,
          },
        })
        .then(() => {
          refetch();
        })
        .catch((err) => {
          console.error(err);
        });
      return;
    }

    createTask
      .mutateAsync({
        name: taskName,
        note: taskNote,
        completed: false,
        important: false,
        userId,
        groupId: normalizedGroupId,
      })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      className="modal fade"
      id="addTaskModal"
      tabIndex={-1}
      aria-labelledby="addTaskModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-2" id="addTaskModalLabel">
              {taskName && taskId ? "Update Task" : "Add new task"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-3 align-self-center">
            <label htmlFor="taskName">Task Name:</label>
            <br />
            <input
              autoFocus
              id="taskName"
              className="bg-dark-subtle mb-2"
              type="text"
              placeholder="do homework..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <br />
            <label htmlFor="taskNote fw-bold">Task Note:</label>
            <br />
            <input
              id="taskNote"
              className="bg-dark-subtle mb-2"
              type="text"
              placeholder="answer 10 questions..."
              value={taskNote}
              onChange={(e) => setTaskNote(e.target.value)}
            />
            <br />
            <label htmlFor="taskGroup fw-bold">Task Group:</label>
            <br />
            <select
              className="form-select"
              id="taskGroup"
              onChange={(e) => {
                setGroupId(e.target.value);
              }}
              defaultValue={currentlySelectedGroup?._id}
            >
              <option value={"all"}>All tasks</option>
              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
            <br />
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
