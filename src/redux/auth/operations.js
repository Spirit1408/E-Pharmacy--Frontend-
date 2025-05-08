import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post('/user/login', credentials);
      
      localStorage.setItem('token', response.data.token);
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Authorization error'
      );
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/user/logout');
      
      localStorage.removeItem('token');
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Logout error'
      );
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return thunkAPI.rejectWithValue('Token not found');
    }
    
    try {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      
      const response = await api.post('/user/refresh');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Refresh error'
      );
    }
  }
);