import React from 'react'
import './Cell.sass'

import { PlainLesson } from '../../types/PlainLesson'
import SingleCell from './SingleCell'

interface HalfCellProps
{
  column : number
  row : number
  lessons : PlainLesson[]
}

const HalfCell : React.FC<HalfCellProps> = ({
  column,
  row,
  lessons
}) => {
  const isHalf = lessons[0].coords.k === 2
  const grid = {[`gridTemplate${isHalf ? 'Rows' : 'Columns'}`] : 'repeat(2,1fr)'}

  return(
    <div
      className="cell__half"
      style={{
        ...grid,
        gridRow : row,
        gridColumn : column,
      }}
    >
      {lessons.map((l, i) => {
        const column = isHalf ? 1 : l.coords.k + 1
        const row = isHalf ? l.coords.z + 1 : 1

        return <SingleCell key={i} column={column} row={row} lesson={l} />
      })}
    </div>
  )
}

export default HalfCell