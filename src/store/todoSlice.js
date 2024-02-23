import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../utils/data';

const initialState = {
    todos: Data,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload.updates } : todo
      );
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;