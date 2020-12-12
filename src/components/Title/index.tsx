import React from 'react'
import './Title.sass'

import { Card, Div } from '@vkontakte/vkui'
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite'
import Icon28ViewOutline from '@vkontakte/icons/dist/28/view_outline'

export interface TitleProps
{
  title : string
  isDiff ?: boolean
  mySchedule ?: boolean
}

const Title : React.FC<TitleProps> = ({
  title,
  mySchedule = false,
  isDiff = false
}) => {
  return(
    <Div>
      <Card>
        <Div className='title'>
          {isDiff && <Icon28ViewOutline height="20" width="20" fill="#4bb34b" />}
          {title}
          {mySchedule && <Icon28Favorite height="20" width="20" fill="#cc00ff" />}
        </Div>
      </Card>
    </Div>
  )
}

export default Title