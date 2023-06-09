type AppSliceState = {
  token: string | null;
  userId: string | null;
  tasks: Task[]
};

type Task = {
  completed: boolean
  important: boolean
  name: string
  note: string
  id: string
}
