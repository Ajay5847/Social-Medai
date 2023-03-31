import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient';
import { setLoading } from './appConfigSlice';


export const getUserProfile = createAsyncThunk('user/getUserProfile', async (body) => {
    try {
        const response = await axiosClient.post('/user/getUserProfile', body);
        return response.result;
    } catch (e) {
        return Promise.reject(e);
    }
})

export const likeAndUnlike = createAsyncThunk('post/likeAndUnlike', async (body, thunkAPI) => {
    try {
        const response = await axiosClient.post('/posts/like', body);
        return response.result.post;
    } catch (e) {
        return Promise.reject(e);
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
        .addCase(likeAndUnlike.fulfilled, (state, action) => {
            const post = action.payload;
            const index = state?.userProfile?.posts?.findIndex(item => item._id === post._id);
            if(index != undefined && index != -1){
                state.userProfile.posts[index] = post;
            }
        })
    } 
})

export default postSlice.reducer;