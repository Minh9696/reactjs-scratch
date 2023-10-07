const { createSlice } = require("@reduxjs/toolkit");

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        increase(state, action) {
            return state + 1
        },
        decrease(state, action) {
            return state - 1;
        },
    },
})

const {actions, reducer} = counterSlice;
export const {increase, decrease} = actions; // maned export
export default reducer; // export default
