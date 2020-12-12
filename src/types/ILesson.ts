export type FromWhom = { title : string, href : string }

export interface ILesson
{
  time ?: string[]
  place : string
  type : 0 | 1 | 2 | 3 | 4
  subject : string
  fromWhoms : FromWhom[]
}