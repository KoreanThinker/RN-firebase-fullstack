import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';


import Todo from './Todo'


export type RootState = ReturnType<typeof rootReducer>;


const rootReducer = combineReducers({
    Todo: persistReducer({ key: 'Todo', storage: AsyncStorage }, Todo),
})


export default function configureStore() {
    const store = createStore(rootReducer);
    const persistor = persistStore(store);
    return { store, persistor };
};