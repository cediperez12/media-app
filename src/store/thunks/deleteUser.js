import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk(
    'user/delete', async (user, thunkAPI) => {
        try{
            await axios.delete(`http://localhost:3005/users/${user.id}`)
            return user
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)