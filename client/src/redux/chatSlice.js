import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../lib/axios'; // Ensure you're importing axiosInstance

// Async Thunks
export const fetchUsers = createAsyncThunk(
  "chat/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/api/message/users", {
        withCredentials: true, // Include cookies for authentication
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/api/message/${userId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch messages");
    }
  }
);


export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async (message, { getState, rejectWithValue }) => {
    try {
      const { selectedUser } = getState().chat;
      if (!selectedUser) throw new Error("No selected user");

      const res = await axiosInstance.post(
        `/api/message/send/${selectedUser._id}`,
        message,
        { withCredentials: true }
      );

      console.log("Message sent, response:", res.data);  // Log the response

      return res.data;  // Should be the newly created message object
    } catch (err) {
      return rejectWithValue(err.response?.data || "Sending message failed");
    }
  }
);




const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    users: [],
    selectedUser: null,
    messages: [],
    isUsersLoading: false,
    isMessagesLoading: false,
    isError: false, // Optional: Add an error flag
    errorMessage: '', // Optional: Store the error message
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setError: (state, action) => { // Optional: Set error state
      state.isError = true;
      state.errorMessage = action.payload;
    },
    clearError: (state) => { // Optional: Clear error state
      state.isError = false;
      state.errorMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isUsersLoading = true;
        state.isError = false; // Reset error state
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => { // Optional: handle rejection error
        state.isUsersLoading = false;
        state.isError = true;
        state.errorMessage = action.payload; // Store error message
      })
      .addCase(fetchMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { setSelectedUser, addMessage, clearMessages, setError, clearError } = chatSlice.actions;

export default chatSlice.reducer;
