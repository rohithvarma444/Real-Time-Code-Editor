import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    teamID: null,
    isLoggedIn: false,
    editorStatus: 'disconnected', 
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setTeamID: (state, action) => {
            state.teamID = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setEditorStatus: (state, action) => {
            state.editorStatus = action.payload;
        }
    }
});

export const { setUsername, setTeamID, setLoggedIn, setEditorStatus } = userSlice.actions;

export default userSlice.reducer;
