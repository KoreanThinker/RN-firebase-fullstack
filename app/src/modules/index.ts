import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';


import Todo from './Todo'


const rootReducer = combineReducers({
    Todo: persistReducer({ key: 'Todo', storage: AsyncStorage }, Todo),
})


export type RootState = ReturnType<typeof rootReducer>;


export default function configureStore() {
    const store = createStore(rootReducer);
    const persistor = persistStore(store);
    return { store, persistor };
};

