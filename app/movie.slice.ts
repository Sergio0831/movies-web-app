import { createSlice } from '@reduxjs/toolkit';

enum Direction {
  NEXT = 'NEXT',
  PREV = 'PREV'
}

interface MovieState {
  pos: number;
  dir: Direction;
}

const initialState: MovieState = {
  pos: 0,
  dir: Direction.NEXT
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    PREV: (state) => {
      state.dir = Direction.PREV;
      state.pos = state.pos === 0 ? 0 : state.pos - 1;
    },
    NEXT: (state) => {
      state.dir = Direction.NEXT;
      state.pos = state.pos + 1;
    }
  }
});

export const { NEXT, PREV } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
