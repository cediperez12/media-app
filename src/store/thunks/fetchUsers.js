import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
    try{
        const response = await axios.get('http://localhost:3005/users')

        await pause(1000)

        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}