import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk action để lấy danh sách tasks từ server
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    // Gọi API để lấy danh sách tasks từ server
    const response = await fetch('api/tasks');
    const data = await response.json();
    return data;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [
            { id: 1, taskName: 'Do Homework', status: false },
            { id: 2, taskName: 'Clean House', status: true },
        ],
        loading: false,
        error: null,
    },
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: Date.now(),
                taskName: action.payload,
                status: false,
            };
            state.tasks.push(newTask);
        },
        deleteTask: (state, action) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },
        completeTask: (state, action) => {
            const taskId = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
                task.status = !task.status;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addTask, deleteTask, completeTask } = taskSlice.actions;

export default taskSlice.reducer;
