import React from "react";

// set the defaults
const ExerciseContext = React.createContext({
  workout: {},
  setWorkout: () => {}
});

export default ExerciseContext;