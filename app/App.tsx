import React, { useEffect } from 'react';
import AppContainer from './src/screens'
import firebase from '@react-native-firebase/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/modules';

const { store, persistor } = configureStore();

const App = () => {

  useEffect(() => {
    console.log(firebase.app().name);
  }, [])
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
