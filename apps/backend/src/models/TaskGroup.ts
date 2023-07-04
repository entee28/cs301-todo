import { getModelForClass, prop } from "@typegoose/typegoose";

export class TaskGroupClass {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public userId!: string;
}

export const TaskGroup = getModelForClass(TaskGroupClass);
