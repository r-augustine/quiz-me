import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { questions } from "../../test-questions/questions";

const initialState = {
  status: "",
  difficulty: "",
  questions: [],
  loading: "idle",
  currentRequestId: undefined,
};

// get questions async thunk
export const fetchQuestions = createAsyncThunk(
  "domain/fetchQuestions",
  async (domainName, { rejectWithValue, getState, requestId }) => {
    // do logic here...
    const { domain: state } = getState();

    try {
      const { data } = await axios.get(
        "http://localhost:3050/api/v1/questions"
      );
      //  dummy request to search
      // const data = await (() => {
      //   return new Promise((resolve) =>
      //     setTimeout(() => resolve(questions), 2000)
      //   );
      // })();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {
    setStatus: (state, { payload }) => {
      if (payload === "easy") {
        return (state.difficulty = "easy");
      }

      if (payload === "medium") {
        return (state.difficulty = "medium");
      }

      if (payload === "hard") {
        return (state.difficulty = "hard");
      }
    },
    setDifficulty: (state, { payload }) => {
      if (payload === "solvled") {
        return (state.status = "solved");
      }

      if (payload === "unsolved") {
        return (state.status = "unsolved");
      }
    },
    resetDomainState: (state) => {
      return { ...state, ...initialState };
    },
  },
  extraReducers: {
    [fetchQuestions.pending]: (state, { meta }) => {
      const requestId = meta.requestId;
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = requestId;
      }
    },
    [fetchQuestions.fulfilled]: (state, { payload, meta, ...rest }) => {
      const requestId = meta.requestId;
      state.questions = payload;
      state.loading = "idle";
      state.currentRequestId = undefined;
    },
    [fetchQuestions.rejected]: (state, { payload }) => {
      state.questions = [];
      state.loading = "idle";
      state.currentRequestId = undefined;
    },
  },
});

export const { setStatus, setDifficulty, resetDomainState } =
  domainSlice.actions;
export default domainSlice.reducer;
