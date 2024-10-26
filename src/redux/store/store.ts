import { configureStore } from '@reduxjs/toolkit'
import { companySlice } from '../slices/companySlice'

export const store = configureStore({
  reducer: {
    company:companySlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;