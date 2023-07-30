// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import learningPathReducer from './slices/learningPathSlice';

const rootReducer = {
  learningPath: learningPathReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
