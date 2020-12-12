import React from 'react'
import './Cell.sass'

import { PlainLesson } from '../../types/PlainLesson'
import SingleCell from './SingleCell'

interface QuarterCellProps
{
  column : number
  row : number
  lessons : PlainLesson[]
}

const QuarterCell : React.FC<QuarterCellProps> = ({
  column,
  row,
  lessons
}) => {
  return(
    <div
      className="cell__quarter"
      style={{
        gridRow : row,
        gridColumn : column,
      }}
    >
      {lessons.map((l, i) => {
        const column = l.coords.k + 1
        const row = l.coords.z + 1

        return <SingleCell key={i} column={column} row={row} lesson={l} />
      })}
    </div>
  )
}

export default QuarterCell