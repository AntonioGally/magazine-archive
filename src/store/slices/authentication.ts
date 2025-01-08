import { createSlice } from "@reduxjs/toolkit";

interface AuthenticationState {
    isAuthenticated: boolean;
    email?: string;
    uid?: string;
}

const initialState: AuthenticationState = {
    isAuthenticated: false,
    email: undefined,
    uid: undefined,
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action: { payload: { email: string, uid: string } }) => {
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.uid = action.payload.uid;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.email = undefined;
            state.uid = undefined;
        }
    }
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;