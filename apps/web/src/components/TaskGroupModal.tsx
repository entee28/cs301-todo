import { useAppSelector } from "../libs/redux";
import { trpc } from "../libs/utils";

type Props = {
  groupName: string;
  groupId: string;
  setGroupName: (name: string) => void;
  refetch: () => void;
};

export const TaskGroupModal = ({
  groupId,
  groupName,
  setGroupName,
  refetch,
}: Props) => {
  const { userId } = useAppSelector((state) => state.app);
  const createTaskGroup = trpc.addTaskGroup.useMutation();
  const updateTaskGroup = trpc.updateTaskGroup.useMutation();

  const submitHandler = () => {
    if (!userId) return;

    if (groupName && groupId) {
      updateTaskGroup
        .mutateAsync({
          _id: groupId,
          name: groupName,
        })
        .then(() => {
          refetch();
        })
        .catch((err) => {
          console.error(err);
        });
      return;
    }

    createTaskGroup
      .mutateAsync({
        name: groupName,
        userId,
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
      id="addTaskGroupModal"
      tabIndex={-1}
      aria-labelledby="addTaskGroupModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-2" id="addTaskGroupModalLabel">
              Create task group
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-3 align-self-center">
            <label htmlFor="taskName">Group Name:</label>
            <br />
            <input
              autoFocus
              id="taskName"
              className="bg-dark-subtle mb-2"
              type="text"
              placeholder="do homework..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
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
