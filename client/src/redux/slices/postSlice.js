import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient';
import { setLoading } from './appConfigSlice';


export const getUserProfile = createAsyncThunk('user/getUserProfile', async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('/user/getUserProfile', body);
        console.log(response);
        return response.result;
    } catch (e) {
        return Promise.reject(e);
    }
    finally{
        thunkAPI.dispatch(setLoading(false));
    }
})

const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        userProfile: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile
            .fulfilled, (state, action) => {
            state.userProfile = action.payload;
        })
    } 
})

export default postSlice.reducer;