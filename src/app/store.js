import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/Counter/counterSlice.js';

console.log('counterReducer', counterReducer)
const rootReducer = {
    counter: counterReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;