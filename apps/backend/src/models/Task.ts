import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class TaskClass extends TimeStamps {
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
