import 'core-js/features/map'
import 'core-js/features/set'

import React from 'react'
import ReactDOM from 'react-dom'

import eruda from 'eruda'

import bridge from '@vkontakte/vk-bridge'
import '@vkontakte/vkui/dist/vkui.css'

import './index.sass'
import Switcher from './components/Switcher'

eruda.init()

bridge.send('VKWebAppInit')
bridge.subscribe(e => {
  if(e.detail.type === 'VKWebAppUpdateConfig')
    document.body.setAttribute('scheme', e.detail.data.scheme)
})

ReactDOM.render(<Switcher />, document.getElementById('root'))