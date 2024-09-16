import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ChatState {
    response: string;
    chatId: string | null;
    analyzing: boolean;
  }

  const initialState: ChatState = {
    response: "",
    chatId: null,
    analyzing: false,
  };

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatResponse: (state, action: PayloadAction<string>) => {
            state.response = action.payload;
        },
        setChatId: (state, action) => {
            state.chatId = action.payload;
        },
        setAnalyzing: (state, action: PayloadAction<boolean>) => {
            state.analyzing = action.payload;
        }
    },
});


export const { setChatResponse, setChatId, setAnalyzing } = chatSlice.actions;
export default chatSlice.reducer;
