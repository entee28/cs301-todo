type AppSliceState = {
  token: string | null;
  userId: string | null;
  tasks: Task[];
  groups: Group[];
  currentlySelectedGroup: Group | null;
};

type Task = {
  completed: boolean;
  important: boolean;
  name: string;
  note: string;
  _id: string;
  userId: string;
  groupId?: string;
};

type Group = {
  name: string;
  _id: string;
  userId: string;
};

type SchemaReturnType<TModel> = TModel & {
  _id: string;
};
