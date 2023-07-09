import { getModelForClass, prop } from "@typegoose/typegoose";

export class TaskClass {
  @prop({ required: true })
  public name!: string;

  @prop({ default: "" })
  public note?: string;

  @prop({ required: true })
  public completed!: boolean;

  @prop({ required: true })
  public important!: boolean;

  @prop({ required: true })
  public userId!: string;

  @prop()
  public groupId?: string;
}

export const Task = getModelForClass(TaskClass);
