import React, { useEffect } from 'react';
import AppContainer from './src/screens'
import firebase from '@react-native-firebase/app';


const App = () => {

  useEffect(() => {
    console.log(firebase.app().name);
  }, [])
  return (
    <>
      <AppContainer />
    </>
  );
};

export default App;
