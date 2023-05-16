import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { INotes } from "../types/notes"
import { RootState } from "../app/store";

export interface CounterState {
    notes: INotes[];
}

const initialState: CounterState = {
    notes: [],
}


export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNote: (state, action: PayloadAction<INotes>) => {
            state.notes.push(action.payload);
        },
        removeNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        editNote: (state, action: PayloadAction<INotes>) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
        },
    },
});

export const { createNote, removeNote, editNote } = notesSlice.actions

export const selectNotes = (state: RootState) => state.notes.notes;

export default notesSlice.reducer
