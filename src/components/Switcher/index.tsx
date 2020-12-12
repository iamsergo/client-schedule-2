import React from 'react'

import store from '../../redux/store'
import { Provider } from 'react-redux'

import App from '../../App'
import Sleep from '../../panels/Sleep'

const Switcher = () => {
  const hours = new Date().getUTCHours()
  
  return (hours >= 20 || hours < 4) ? <Sleep /> : <Provider store={store}><App /></Provider>
}

export default Switcher