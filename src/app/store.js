import { configureStore } from "@reduxjs/toolkit";
import  movieReducer from '../features/movieSlice';
const store =configureStore({
    reducer:{
        movies:movieReducer
    }
})
export default store;