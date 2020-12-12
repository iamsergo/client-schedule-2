import 'core-js/features/map'
import 'core-js/features/set'

import React from 'react'
import ReactDOM from 'react-dom'

import bridge from '@vkontakte/vk-bridge'
import '@vkontakte/vkui/dist/vkui.css'

import './index.sass'

import App from './App'

import { Provider } from 'react-redux'
import store from './redux/store'

bridge.send('VKWebAppInit')
bridge.subscribe(e => {
  if(e.detail.type === 'VKWebAppUpdateConfig')
    document.body.setAttribute('scheme', e.detail.data.scheme)//, 'space_gray')
})

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)