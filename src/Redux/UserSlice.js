import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        signOutStart: (state) => {
            state.loading = true;
        },
        signOutSucess: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null
        },
        signOutFailure: (state, action) => {
            state.error = action.payload
        },

    },
})

export const { signInStart, signInSuccess, signInFailure, signOutStart , signOutFailure , signOutSucess
} = userSlice.actions;
export default userSlice.reducer;