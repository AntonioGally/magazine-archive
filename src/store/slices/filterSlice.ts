import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
    filters: {
        title: string
        author: string;
        abstract: string;
    }
}

const initialState: FilterState = {
    filters: {
        title: "",
        author: "",
        abstract: "",
    }
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitle: (state, action: { payload: string }) => {
            state.filters.title = action.payload;
        },
        setAuthor: (state, action: { payload: string }) => {
            state.filters.author = action.payload;
        },
        setAbstract: (state, action: { payload: string }) => {
            state.filters.abstract = action.payload;
        },
    },
});

export const { setTitle, setAuthor, setAbstract } = filterSlice.actions;

export default filterSlice.reducer;
