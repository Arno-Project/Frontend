import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IntroState {
    stepsEnabled: boolean
    steps: any;
    initialStep:  number;
}

const initialState: IntroState = {
    stepsEnabled: false,
    steps: [],
    initialStep:  0
};

export const introSlice = createSlice({
  name: "intro",
  initialState,
  reducers: {
    toggleSteps: (state, ) => {
      state.stepsEnabled = !state.stepsEnabled
    },
    disableSteps:(state)=>{
      state.stepsEnabled=false
    },
    setSteps: (state,action: PayloadAction<any>) => {
      state.steps = action.payload
      console.log(state.steps)
    },
  },
});

export const { toggleSteps, setSteps,disableSteps } = introSlice.actions;

export default introSlice.reducer;
