import { Day } from "./Day";
import { Group } from "./Group";
import { FromWhom } from "./ILesson";
import { Lesson } from "./Lesson";
import { Week } from "./Week";

export type Coords = {
  i : Day,
  j : Lesson,
  k : Group,
  z : Week
}

export interface PlainLesson
{
  place : string
  type : 0 | 1 | 2
  subject : string
  coords : Coords
  fromWhoms : FromWhom[]
}