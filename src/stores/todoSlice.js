import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

const todoAPI = `${import.meta.env.VITE_API}/todo`

export const getTodo = createAsyncThunk("todo/getTodo", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")
  const id = jwtDecode(token).id
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch(`${todoAPI}/user/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

const todoEntity = createEntityAdapter({
  selectId: (todo) => todo.id
})

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    ...todoEntity.getInitialState(),
    status: "idle"
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodo.fulfilled, (state, action) => {
        state.status = "success",
          todoEntity.setAll(state, action.payload.data)
      })
      .addCase(getTodo.pending, (state) => {
        state.status = "pending"
      })
      .addCase(getTodo.rejected, (state) => {
        state.status = "failed"
      })
  }
})

export const todoSelector = todoEntity.getSelectors(state => state.todoSlice)

// export const { update } = todoSlice.actions
export default todoSlice.reducer