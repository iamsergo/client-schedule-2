import React from 'react'

import { Placeholder, Link} from "@vkontakte/vkui"
import Icon28MoonOutline from "@vkontakte/icons/dist/28/moon_outline"

const Sleep = ({ }) => {
  return(
    <Placeholder
      icon={<Icon28MoonOutline width={56} height={56} />}
      action={
        <>
          <Link href={`http://www.bstu.ru/about/useful/schedule`}>Посмотреть расписание на сайте</Link>
          <br /><br/>
          <Link href={`https://vk.com/club198278031`}>Группа приложения</Link>        
        </>
      }
      stretched
    >
      Приложение отдыхает<br/> с 23:00 до 07:00 каждого дня
    </Placeholder>
  )
}

export default Sleep