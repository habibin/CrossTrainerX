const Exercise = require("../src/models/exercise");

describe("Exercise toJSON functions", () => {
  test("strengthJSON returns correct JSON format", () => {
    const exercise = new Exercise(
      undefined,
      "ExerciseName",
      "Strength",
      null,
      "Description",
      123,
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      null,
      null
    );
    const expectedJSON = {
      id: null,
      name: "ExerciseName",
      type: "Strength",
      secondaryType: null,
      description: "Description",
      userId: 123,
      muscleGroup: "MuscleGroup",
      equipment: "Equipment",
      reps: 10,
      sets: 3,
      weight: 50,
      weightClass: 2,
      rest: 60,
      timesCompleted: 0,
      self: null,
    };
    expect(exercise.strengthJSON()).toEqual(expectedJSON);
  });

  test("cardioJSON returns correct JSON format", () => {
    const exercise = new Exercise(
      undefined,
      "ExerciseName",
      "Cardio",
      "Running",
      "Description",
      123,
      "MuscleGroup",
      null,
      null,
      null,
      null,
      null,
      null,
      120,
      5,
      null
    );
    const expectedJSON = {
      id: null,
      name: "ExerciseName",
      type: "Cardio",
      secondaryType: "Running",
      description: "Description",
      userId: 123,
      duration: 120,
      distance: 5,
      timesCompleted: 0,
      self: null,
    };
    expect(exercise.cardioJSON()).toEqual(expectedJSON);
  });

  test("flexibilityJSON returns correct JSON format", () => {
    const exercise = new Exercise(
      undefined,
      "ExerciseName",
      "Flexibility",
      "Yoga",
      "Description",
      123,
      "MuscleGroup",
      null,
      null,
      null,
      null,
      null,
      null,
      60,
      null,
      3
    );
    const expectedJSON = {
      id: null,
      name: "ExerciseName",
      type: "Flexibility",
      secondaryType: "Yoga",
      description: "Description",
      userId: 123,
      duration: 60,
      difficulty: 3,
      timesCompleted: 0,
      self: null,
    };
    expect(exercise.flexibilityJSON()).toEqual(expectedJSON);
  });
});
