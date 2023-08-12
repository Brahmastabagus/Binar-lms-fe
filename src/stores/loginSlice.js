import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const loginAPI = `${import.meta.env.VITE_API}/user/login`

export const getLogin = createAsyncThunk("login/getLogin", async (data) => {
  const response = await fetch(loginAPI,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  const json = await response.json()

  return json
})

const loginEntity = createEntityAdapter({
  selectId: (login) => login
})

const loginSlice = createSlice({
  name: "login",
  initialState: {
    ...loginEntity.getInitialState()
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.fulfilled, (state, action) => {
        loginEntity.setAll(state, action.payload)
      })
      .addCase(getLogin.rejected, (state, action) => {
        loginEntity.setAll(state, action.payload)
      })
  }
})

export const loginSelector = loginEntity.getSelectors(state => state.loginSlice)

export const { update } = loginSlice.actions
export default loginSlice.reducer