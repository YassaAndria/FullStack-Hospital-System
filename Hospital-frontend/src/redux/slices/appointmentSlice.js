import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as appointmentService from '../../services/appointment.service';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await appointmentService.getAppointments();
      return data.appointments || data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const bookAppointment = createAsyncThunk(
  'appointments/book',
  async (data, { rejectWithValue }) => {
    try {
      const result = await appointmentService.createAppointment(data);
      return result.appointment || result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editAppointment = createAsyncThunk(
  'appointments/edit',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const result = await appointmentService.updateAppointment(id, data);
      return result.appointment || result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeAppointment = createAsyncThunk(
  'appointments/remove',
  async (id, { rejectWithValue }) => {
    try {
      await appointmentService.deleteAppointment(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAppointmentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(bookAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments.push(action.payload);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(a => a._id === action.payload._id);
        if (index !== -1) state.appointments[index] = action.payload;
      })
      .addCase(removeAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(a => a._id !== action.payload);
      });
  },
});

export const { clearAppointmentError } = appointmentSlice.actions;
export default appointmentSlice.reducer;
