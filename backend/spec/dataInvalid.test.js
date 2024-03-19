const ExerciseModel = require("../src/models/exercise");
const UserModel = require("../src/models/user");
const SurveyModel = require("../src/models/survey");
const WorkoutModel = require("../src/models/workout");
const Validation = require("../src/validation/modelValidation");

/***********************
*** EXERCISE TESTING ***
***********************/

describe("Validation.exerciseInvalid function", () => {
  test("valid Strength exercise data", () => {
    const validStrengthExercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      "Legs",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      undefined,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(validStrengthExercise)).toEqual(false);
  });

  test("valid Cardio exercise data", () => {
    const validCardioExercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Cardio",
      "Running",
      "Description",
      "UserId",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      120,
      5,
      undefined
    );
    expect(Validation.exerciseInvalid(validCardioExercise)).toEqual(false);
  });

  test("valid Flexibility exercise data", () => {
    const validFlexibilityExercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Flexibility",
      "Yoga",
      "Description",
      "UserId",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      60,
      undefined,
      3
    );
    expect(Validation
      .exerciseInvalid(validFlexibilityExercise)).toEqual(false);
  });

  test('missing required property "Name"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "Strength",
      null,
      "",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "userId"', () => {
    const exercise = new ExerciseModel(
      "Id",
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
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "name"', () => {
    const exercise = new ExerciseModel(
      "Id",
      undefined,
      "Strength",
      null,
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      undefined,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "type"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      undefined,
      null,
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "secondaryType" for Flexibility', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Flexibility",
      null,
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('incorrect required property "secondaryType" for Flexibility', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Flexibility",
      "Running",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "secondaryType" for Cardio', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Cardio",
      null,
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('incorrect required property "secondaryType" for Flexibility', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Cardio",
      "Yoga",
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "description"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      undefined,
      undefined,
      123,
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('missing required property "userId"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      undefined,
      "Description",
      undefined,
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "muscleGroup"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      undefined,
      "Description",
      "UserId",
      456,
      "Equipment",
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "equipment"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      undefined,
      "Description",
      "UserId",
      "MuscleGroup",
      789,
      10,
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "reps"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      undefined,
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      "10",
      3,
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "sets"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      undefined,
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      "3",
      50,
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "weight"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      undefined,
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      "50",
      2,
      60,
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

test('invalid data type for property "weightClass"', () => {
  const exercise = new ExerciseModel(
    "Id",
    "ExerciseName",
    "Strength",
    undefined,
    "Description",
    "UserId",
    "MuscleGroup",
    "Equipment",
    10,
    3,
    50,
    77,
    60,
    120,
    undefined,
    undefined
  );
  expect(Validation.exerciseInvalid(exercise)).toBe(true);
});

  test('invalid data type for property "rest"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Strength",
      undefined,
      "Description",
      "UserId",
      "MuscleGroup",
      "Equipment",
      10,
      3,
      50,
      2,
      "60",
      120,
      undefined,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "duration"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Cardio",
      "Running",
      "Description",
      "UserId",
      "MuscleGroup",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "120",
      5,
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "distance"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Cardio",
      "Cycling",
      "Description",
      "UserId",
      "MuscleGroup",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      120,
      "5",
      undefined
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });

  test('invalid data type for property "difficulty"', () => {
    const exercise = new ExerciseModel(
      "Id",
      "ExerciseName",
      "Flexibility",
      "Running",
      "Description",
      "UserId",
      "MuscleGroup",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      60,
      undefined,
      "3"
    );
    expect(Validation.exerciseInvalid(exercise)).toBe(true);
  });
});

/***********************
***** USER TESTING *****
***********************/

describe("Validation.userInvalid function", () => {
  test("valid user data", () => {
    const validUser = new UserModel(
      1,
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      25,
      "Male",
      150,
      70,
      "Strength",
      null
    );
    expect(Validation.userInvalid(validUser)).toEqual(false);
  });

  test('missing required property "userId"', () => {
    const user = new UserModel(
      1,
      undefined,
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      25,
      "Male",
      150,
      70,
      "Strength",
      undefined
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "email"', () => {
    const user = new UserModel(
      1,
      "UserId",
      undefined,
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "avatarId"', () => {
    const user = new UserModel(
      1,
      "UserId",
      "test@example.com",
      undefined,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "firstName"', () => {
    const user = new UserModel(
      1,
      "UserId",
      "test@example.com",
      1,
      undefined,
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "lastName"', () => {
    const user = new UserModel(
      1,
      "UserId",
      "test@example.com",
      1,
      "John",
      undefined,
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "city"', () => {
    const user = new UserModel(
      1,
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      undefined,
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Flexibility",
      "Yoga"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "state"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      undefined,
      "25",
      "Male",
      "150",
      "70",
      "Flexibility",
      "Stretching"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "age"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      undefined,
      "Male",
      "150",
      "70",
      "Cardio",
      "Cycling"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('invalid data type for property "age"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "Twenty-Five",
      "Male",
      "150",
      "70",
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "gender"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      undefined,
      "150",
      "70",
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "weight"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      undefined,
      "70",
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('invalid data type for property "weight"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "One Fifty",
      "70",
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "height"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      undefined,
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('invalid data type for property "height"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "Seventy",
      "Cardio",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "fitnessTrack"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      undefined,
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('invalid value for property "fitnessTrack"', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "InvalidTrack",
      "Running"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "secondaryTrack" for Strength', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Strength",
      undefined
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('invalid value for property "secondaryTrack" for Strength', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Strength",
      "Yoga"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });
  
  test('missing required property "secondaryTrack" for Cardio', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Cardio",
      undefined
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('invalid value for property "secondaryTrack" for Cardio', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Cardio",
      "InvalidSecondaryTrack"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('missing required property "secondaryTrack" for Flexibility', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Flexibility",
      undefined
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });

  test('invalid value for property "secondaryTrack" for Flexibility', () => {
    const user = new UserModel(
      "UserId",
      "test@example.com",
      1,
      "John",
      "Doe",
      "City",
      "State",
      "25",
      "Male",
      "150",
      "70",
      "Flexibility",
      "InvalidSecondaryTrack"
    );
    expect(Validation.userInvalid(user)).toBe(true);
  });
});

/************************
**** WORKOUT TESTING ****
************************/

describe("Validation.workoutInvalid function", () => {
  test("valid workout data", () => {
    const validWorkout = new WorkoutModel(
      1,
      "userId",
      {
        1: { reps: 10, sets: 3, weight: 50 },
        2: { reps: 12, sets: 3, weight: 40 },
      },
      null
    );
    expect(Validation.workoutInvalid(validWorkout)).toEqual(false);
  });

  test('missing required property "userId"', () => {
    const workout = new WorkoutModel(
      1,
      undefined,
      {
        1: { reps: 10, sets: 3, weight: 50 },
        2: { reps: 12, sets: 3, weight: 40 },
      },
      "2023-11-09 12:30:00"
    );
    expect(Validation.workoutInvalid(workout)).toBe(true);
  });

  test('missing required property "id"', () => {
    const workout = new WorkoutModel(
      undefined,
      "userId",
      {
        1: { reps: 10, sets: 3, weight: 50 },
        2: { reps: 12, sets: 3, weight: 40 },
      },
      "2023-11-09 12:30:00"
    );
    expect(Validation.workoutInvalid(workout)).toBe(true);
  });

  test('invalid data type for property "id"', () => {
    const workout = new WorkoutModel(
      "1",
      "userId",
      {
        1: { reps: 10, sets: 3, weight: 50 },
        2: { reps: 12, sets: 3, weight: 40 },
      },
      "2023-11-09 12:30:00"
    );
    expect(Validation.workoutInvalid(workout)).toBe(true);
  });

  test('missing required property "exercises"', () => {
    const workout = new WorkoutModel(1, "userId", undefined, "2023-11-09 12:30:00");
    expect(Validation.workoutInvalid(workout)).toBe(true);
  });

  test('invalid data type for property "exercises"', () => {
    const workout = new WorkoutModel(
      1,
      "userId",
      "invalid",
      "2023-11-09 12:30:00"
    );
    expect(Validation.workoutInvalid(workout)).toBe(true);
  });

  test('invalid data type for property "dateCompleted"', () => {
    const workout = new WorkoutModel(
      1,
      "userId",
      { 1: { reps: 10, sets: 3, weight: 50 } },
      123
    );
    expect(Validation.workoutInvalid(workout)).toBe(true);
  });
});

/***********************
**** SURVEY TESTING ****
***********************/

describe("Validation.surveyInvalid function", () => {
  test("valid strength survey data", () => {
    const validSurvey = new SurveyModel(
      1,
      2,
      "UserId",
      {datetime: "datetime"},
      1, // Reps
      2, // Sets
      3, // Weight
      2, // Rest
      null, // Difficulty
      null, // Duration
      null // Distance
    );
    expect(Validation.surveyInvalid(validSurvey)).toEqual(false);
  });

  test("valid cardio survey data", () => {
    const validSurvey = new SurveyModel(
      1,
      2,
      "UserId",
      { datetime: "datetime" },
      null, // Reps
      null, // Sets
      null, // Weight
      null, // Rest
      null, // Difficulty
      2, // Duration
      3 // Distance
    );
    expect(Validation.surveyInvalid(validSurvey)).toEqual(false);
  });

  test("valid flexibility survey data", () => {
    const validSurvey = new SurveyModel(
      1,
      2,
      "UserId",
      { datetime: "datetime" },
      null, // Reps
      null, // Sets
      null, // Weight
      null, // Rest
      3, // Difficulty
      1, // Duration
      null // Distance
    );
    expect(Validation.surveyInvalid(validSurvey)).toEqual(false);
  });

  test('invalid data type for property "reps"', () => {
    const survey = new SurveyModel(
      1,
      2,
      "UserId",
      "datetime",
      4,
      3,
      2,
      3,
      null,
      null,
      null
    );
    expect(Validation.surveyInvalid(survey)).toBe(true);
  });

  test('invalid data type for property "sets"', () => {
    const survey = new SurveyModel(
      1,
      2,
      "UserId",
      "datetime",
      2,
      31,
      2,
      3,
      null,
      null,
      null
    );
    expect(Validation.surveyInvalid(survey)).toBe(true);
  });

  test('invalid data type for property "weight"', () => {
    const survey = new SurveyModel(
      1,
      2,
      "UserId",
      "datetime",
      2,
      3,
      21,
      3,
      null,
      null,
      null
    );
    expect(Validation.surveyInvalid(survey)).toBe(true);
  });


  test('invalid data type for property "difficulty"', () => {
    const survey = new SurveyModel(
      1,
      2,
      "UserId",
      "datetime",
      null,
      null,
      null,
      null,
      6,
      3,
      null
    );
    expect(Validation.surveyInvalid(survey)).toBe(true);
  });

  test('invalid data type for property "duration"', () => {
    const survey = new SurveyModel(
      1,
      2,
      "UserId",
      "datetime",
      null,
      null,
      null,
      null,
      null,
      88,
      1
    );
    expect(Validation.surveyInvalid(survey)).toBe(true);
  });

  test('invalid data type for property "distance"', () => {
    const survey = new SurveyModel(
      1,
      2,
      "UserId",
      "datetime",
      null,
      null,
      null,
      null,
      null,
      3,
      23
    );
    expect(Validation.surveyInvalid(survey)).toBe(true);
  });
});
