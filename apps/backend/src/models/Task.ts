import { getModelForClass, prop } from "@typegoose/typegoose";

export class TaskClass {
  @prop({ required: true })
  public name!: string;

  @prop()
  public note?: string;

  @prop({ default: false })
  public completed?: boolean;

  @prop({ default: false })
  public important?: boolean;

  @prop({ required: true })
  public userId!: string;

  @prop()
  public groupId?: string;
}

export const Task = getModelForClass(TaskClass);
