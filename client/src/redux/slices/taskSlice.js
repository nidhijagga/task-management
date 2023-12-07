import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasksAsync = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await fetch('http://localhost:5000/task/get', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        return rejectWithValue(errorMessage);
      }

      const tasks = await response.json();
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTaskStatusAsync = createAsyncThunk(
    'tasks/toggleTaskStatus',
    async (taskId, { getState, rejectWithValue }) => {
      try {
        const token = getState().auth.token;
        const response = await fetch(`http://localhost:5000/task/toggle/${taskId}`, {
          method: 'PUT',
          headers: {
            Authorization: token,
          },
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          return rejectWithValue(`Failed to toggle task status: ${errorMessage}`);
        }
  
        // Return the updated task with the new status
        const updatedTask = await response.json();
        return updatedTask;
      } catch (error) {
        return rejectWithValue(`Failed to toggle task status: ${error.message}`);
      }
    }
  );

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(toggleTaskStatusAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTask = action.payload;
        state.tasks = state.tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });
  },
});

export const selectTasks = (state) => state.tasks.tasks;
export const selectTasksStatus = (state) => state.tasks.status;

export default tasksSlice.reducer;
