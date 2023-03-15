import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "../thunks/fetchUsers";
import { addNewUser } from "../thunks/addNewUser";
import { deleteUser } from "../thunks/deleteUser";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    reducers:{},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false

                const { payload } = action
                state.data = payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false

                const { payload } = action
                state.error = payload
            })

            .addCase(addNewUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.isLoading = false

                const { payload } = action
                state.data = [...state.data, payload]
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.isLoading = false

                const { payload } = action
                state.error = payload
            })

            .addCase(deleteUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false

                const { payload } = action
                state.data = state.data.filter(user => user.id !== payload.id)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false

                const { payload } = action
                state.error = payload
            })
    }
})

export const usersReducer = usersSlice.reducer
export * from '../thunks/fetchUsers'