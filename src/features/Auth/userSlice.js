import userApi from "../../api/userApi";
import StorageKeys from "../../constants/storage-keys";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const register = createAsyncThunk('user/register', async (payload) => {
      const data = await userApi.register(payload);
      localStorage.setItem(StorageKeys.TOKEN, data.data.jwt);
      localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user));
      return data.data.user;
    }
);

export const login = createAsyncThunk('user/login', async (payload) => {
    const data = await userApi.login(payload);
    localStorage.setItem(StorageKeys.TOKEN, data.data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user));
    return data.data.user;
  }
);
// JSON.parse(localStorage.getItem(StorageKeys.USER)) ||

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current:  {},
        settings: {}
    },
    reducers: {
        logout(state) {
            //clear localStorage
            localStorage.removeItem(StorageKeys.USER);
            localStorage.removeItem(StorageKeys.TOKEN);
            state.current = {};
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        },

        [login.fulfilled]: (state, action) => {
            state.current = action.payload
        }
    }
});

const {actions, reducer} = userSlice;
export const {logout} = actions;
export default reducer;