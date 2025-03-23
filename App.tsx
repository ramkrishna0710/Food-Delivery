import { View, Text } from 'react-native'
import React from 'react'
import '@unistyles/unistyles'
import Navigation from '@navigation/Navigation'
import { Provider } from 'react-redux'
import { persistor, store } from '@states/store'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App