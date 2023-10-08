import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/Counter/counterSlice.js';
import userReducer from '../features/Auth/userSlice.js';

console.log('counterReducer', counterReducer)
const rootReducer = {
    counter: counterReducer,
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;