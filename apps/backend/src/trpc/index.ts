import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { Task, TaskClass } from "../models/Task";
import { TaskGroup, TaskGroupClass } from "../models/TaskGroup";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

const taskInput = z.object({
  name: z.string().nonempty(),
  note: z.string().optional(),
  completed: z.boolean().optional(),
  important: z.boolean().optional(),
  userId: z.string().nonempty(),
  groupId: z.string().optional(),
});

export const appRouter = router({
  getTasks: publicProcedure
    .input(
      z.object({
        userId: z.string().nonempty(),
      })
    )
    .query(async ({ input }): Promise<SchemaReturnType<TaskClass>[]> => {
      const { userId } = input;

      const tasks = await Task.find({
        userId,
      });

      let result: SchemaReturnType<TaskClass>[] = [];

      tasks.forEach((task) => {
        result.push({
          _id: task._id.toString(),
          name: task.name,
          note: task.note,
          completed: task.completed,
          important: task.important,
          userId: task.userId,
          groupId: task.groupId,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        });
      });

      return result;
    }),
  addTask: publicProcedure
    .input(taskInput)
    .mutation(async ({ input }): Promise<SchemaReturnType<TaskClass>> => {
      const { name, note, completed, important, userId, groupId } = input;

      const task = new Task({
        name,
        note: note || "",
        completed: completed || false,
        important: important || false,
        userId,
        groupId,
      });

      await task.save();

      return {
        _id: task._id.toString(),
        name: task.name,
        note: task.note,
        completed: task.completed,
        important: task.important,
        userId: task.userId,
        groupId: task.groupId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };
    }),
  updateTask: publicProcedure
    .input(
      z.object({
        _id: z.string().nonempty(),
        task: taskInput,
      })
    )
    .mutation(async ({ input }): Promise<SchemaReturnType<TaskClass>> => {
      const { _id, task } = input;
      const { name, note, completed, important, userId, groupId } = task;

      const foundTask = await Task.findById(_id);

      if (!foundTask) {
        throw new Error("Invalid _id");
      }

      foundTask.name = name;
      foundTask.note = note || "";
      foundTask.completed = completed || false;
      foundTask.important = important || false;
      foundTask.userId = userId;
      foundTask.groupId = groupId;

      await foundTask.save();

      return {
        _id: foundTask._id.toString(),
        name: foundTask.name,
        note: foundTask.note,
        completed: foundTask.completed,
        important: foundTask.important,
        userId: foundTask.userId,
        groupId: foundTask.groupId,
      };
    }),
  deleteTask: publicProcedure
    .input(
      z.object({
        _id: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }): Promise<string> => {
      const { _id } = input;
      await Task.findByIdAndDelete(_id);
      return "Task deleted";
    }),
  getTaskGroups: publicProcedure
    .input(
      z.object({
        userId: z.string().nonempty(),
      })
    )
    .query(async ({ input }): Promise<SchemaReturnType<TaskGroupClass>[]> => {
      const { userId } = input;

      const groups = await TaskGroup.find({
        userId,
      });

      let result: SchemaReturnType<TaskGroupClass>[] = [];

      groups.forEach((group) => {
        result.push({
          _id: group._id.toString(),
          name: group.name,
          userId: group.userId,
        });
      });

      return result;
    }),
  addTaskGroup: publicProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        userId: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }): Promise<SchemaReturnType<TaskGroupClass>> => {
      const { name, userId } = input;

      const group = new TaskGroup({
        name,
        userId,
      });

      await group.save();

      return {
        _id: group._id.toString(),
        name: group.name,
        userId: group.userId,
      };
    }),
  updateTaskGroup: publicProcedure
    .input(
      z.object({
        _id: z.string().nonempty(),
        name: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }): Promise<SchemaReturnType<TaskGroupClass>> => {
      const { _id, name } = input;

      const foundGroup = await TaskGroup.findById(_id);

      if (!foundGroup) {
        throw new Error("Invalid _id");
      }

      foundGroup.name = name;

      await foundGroup.save();

      return {
        _id: foundGroup._id.toString(),
        name: foundGroup.name,
        userId: foundGroup.userId,
      };
    }),
  deleteTaskGroup: publicProcedure
    .input(
      z.object({
        _id: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }): Promise<string> => {
      const { _id } = input;
      await TaskGroup.findByIdAndDelete(_id);
      return "Task group deleted";
    }),
});
