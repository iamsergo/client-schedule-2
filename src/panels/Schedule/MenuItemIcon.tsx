import React from 'react'

import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline' // по дням
import Icon28GridSquareOutline from '@vkontakte/icons/dist/28/grid_square_outline' // полностью
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline' // экзамены
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline' // сохранить
import Icon28UnfavoriteOutline from '@vkontakte/icons/dist/28/unfavorite_outline' // удалить
import Icon28ViewOutline from '@vkontakte/icons/dist/28/view_outline' // разница
import Icon28HideOutline from '@vkontakte/icons/dist/28/hide_outline' // без разницы

export type MenuItemId =  'byDays' | 'full' | 'exams' | 'without_diff' | 'with_diff' | 'save' | 'delete'

interface MenuItemIconProps
{
  id : MenuItemId
}

const MenuItemIcon : React.FC<MenuItemIconProps> = ({
  id
}) => {
  switch(id)
  {
    case 'byDays': return <Icon28ArticleOutline />
    case 'full': return <Icon28GridSquareOutline />
    case 'exams': return <Icon28Users3Outline />
    case 'save': return <Icon28FavoriteOutline fill="orange" />
    case 'delete': return <Icon28UnfavoriteOutline fill="red" />
    case 'with_diff': return <Icon28ViewOutline fill="#4bb34b" />
    case 'without_diff': return <Icon28HideOutline fill="gray" />
  }
}

export default MenuItemIcon