import React from 'react'
import './Title.sass'

import { Card, Div, Link, Spinner } from '@vkontakte/vkui'
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite'
import Icon28ViewOutline from '@vkontakte/icons/dist/28/view_outline'

export interface TitleProps
{
  title : string
  href ?: string
  isDiff ?: boolean
  mySchedule ?: boolean
  loading ?: boolean
}

const Title : React.FC<TitleProps> = ({
  title,
  href,
  mySchedule = false,
  isDiff = false,
  loading = false
}) => {
  const link = `http://www.bstu.ru/static/themes/bstu/schedule/index.php${href}`
  return(
    <Div>
      <Card>
        <Div className='title'>
          {isDiff && <Icon28ViewOutline height="20" width="20" fill="#4bb34b" />}
          {href ? <Link href={link}>{title}</Link> : title}
          {loading && <Spinner size="small" className="title__spinner" />}
          {!loading && mySchedule && <Icon28Favorite height="20" width="20" fill="#cc00ff" />}
        </Div>
      </Card>
    </Div>
  )
}

export default Title