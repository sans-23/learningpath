// src/redux/slices/learningPathSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  learningPathTiles: null,
  courseTiles: [],
  materialTiles: new Map(),
  materials: [],
  selectedLearningPath: null,
  selectedCourse: null,
};

const learningPathSlice = createSlice({
  name: 'learningPath',
  initialState,
  reducers: {
    setLearningPathTiles: (state, action) => {
      state.learningPathTiles = action.payload;
    },
    setCourseTiles: (state, action) => {
      state.courseTiles = action.payload;
    },
    setMaterialTiles: (state, action) => {
      state.materialTiles = action.payload;
    },
    setMaterials: (state, action) => {
      state.materials = action.payload;
    },
    setSelectedLearningPath: (state, action) => {
      state.selectedLearningPath = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    // Add more reducers as needed for other actions
  },
});

export const {
  setLearningPathTiles,
  setCourseTiles,
  setMaterialTiles,
  setMaterials,
  setSelectedLearningPath,
  setSelectedCourse,
} = learningPathSlice.actions;

export default learningPathSlice.reducer;
