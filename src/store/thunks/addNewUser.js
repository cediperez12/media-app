import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from '@faker-js/faker'

export const addNewUser = createAsyncThunk(
    'users/add', async (user, thunkAPI) => {
        try{
            const response = await axios.post('http://localhost:3005/users', {
                name: faker.name.fullName()
            })
            return response.data
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)