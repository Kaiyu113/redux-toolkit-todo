import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
    edit: "",
  },
  reducers: {
    addTodo: (state, action) => {
      state.todo.push({
        id: Date.now().toString(),
        value: action.payload,
        iscompleted: false,
      });
    },
    deleteTodo: (state, action) => {
      state.todo = state.todo.filter((i) => i.id !== action.payload);
    },
    editTodo: (state, action) => {
      state.edit = action.payload;
    },
    updateTodo: (state, action) => {
      state.todo = state.todo.map((i) => {
        if (i.id === state.edit) {
          i.value = action.payload;
        }
        return i;
      });
      state.edit = "";
    },
    iscompleted: (state, action) => {
      state.todo = state.todo.map((i) => {
        if (i.id === action.payload) {
          i.iscompleted = !i.iscompleted;
        }
        return i;
      });
    },
    sort: (state, action) => {
      if (action.payload === "Date (new to old)") {
        state.todo = state.todo.sort((a, b) => b.id - a.id);
      } else {
        state.todo = state.todo.sort((a, b) => a.id - b.id);
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo, updateTodo, iscompleted, sort } =
  todoSlice.actions;

export default todoSlice.reducer;
