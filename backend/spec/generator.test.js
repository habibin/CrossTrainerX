const Generator = require("../src/generator/exerciseUpdater");

let exerciseBarbellBeg,
  exerciseBarbellInt,
  exerciseBarbellAdv,
  exerciseDumbbellBeg,
  exerciseDumbbellInt,
  exerciseDumbbellAdv,
  exerciseBodyweightBeg,
  exerciseBodyweightInt,
  exerciseBodyweightAdv,
  exerciseRunningBeg,
  exerciseRunningInt,
  exerciseRunningAdv,
  exerciseCyclingBeg,
  exerciseCyclingInt,
  exerciseCyclingAdv,
  exerciseYogaBeg,
  exerciseYogaInt,
  exerciseYogaAdv,
  exerciseStretchingBeg,
  exerciseStretchingInt,
  exerciseStretchingAdv,
  surveyBarbellSame,
  surveyBarbellEasy,
  surveyBarbellHard,
  surveyDumbbellSame,
  surveyDumbbellEasy,
  surveyDumbbellHard,
  surveyBodyweightSame,
  surveyBodyweightEasy,
  surveyBodyweightHard,
  surveyRunningSame,
  surveyRunningEasy,
  surveyRunningHard,
  surveyCyclingSame,
  surveyCyclingEasy,
  surveyCyclingHard,
  surveyYogaSame,
  surveyYogaEasy,
  surveyYogaHard,
  surveyStretchingSame,
  surveyStretchingEasy,
  surveyStretchingHard;

beforeEach(() => {
  exerciseBarbellBeg = {
    id: 1,
    name: "Bench press",
    type: "Strength",
    secondaryType: "Push",
    description:
      "Lie with your back on a weight bench and then lower a barbell to your chest and press it back up",
    userId: "65512a3b7409f13021857720",
    muscleGroup: "Chest",
    equipment: "Bench, barbell",
    reps: 12,
    sets: 3,
    weight: 40,
    weightClass: "Barbell",
    rest: 60,
    duration: null,
    distance: null,
    difficulty: null,
    times_completed: 0,
  };

  exerciseBarbellInt = {
    id: 1,
    name: "Bench press",
    type: "Strength",
    secondaryType: "Push",
    description:
      "Lie with your back on a weight bench and then lower a barbell to your chest and press it back up",
    userId: "65512a3b7409f13021857720",
    muscleGroup: "Chest",
    equipment: "Bench, barbell",
    reps: 8,
    sets: 4,
    weight: 60,
    weightClass: "Barbell",
    rest: 60,
    duration: null,
    distance: null,
    difficulty: null,
    times_completed: 0,
  };

  exerciseBarbellAdv = {
    id: 1,
    name: "Bench press",
    type: "Strength",
    secondaryType: "Push",
    description:
      "Lie with your back on a weight bench and then lower a barbell to your chest and press it back up",
    userId: "65512a3b7409f13021857720",
    muscleGroup: "Chest",
    equipment: "Bench, barbell",
    reps: 5,
    sets: 5,
    weight: 90,
    weightClass: "Barbell",
    rest: 90,
    duration: null,
    distance: null,
    difficulty: null,
    times_completed: 0,
  };

  exerciseDumbbellBeg = {
    id: 13,
    name: "Dumbbell flys",
    type: "Strength",
    secondaryType: "Push",
    description:
      "Lie with your back on a weight bench with your arms extended out to each side. Then, lift the dumbbells up over your head until they meet in the middle in front of you.",
    userId: "65512a3b7409f13021857720",
    muscleGroup: "Chest",
    equipment: "Dumbells, bench",
    reps: 12,
    sets: 3,
    weightClass: "Dumbbell",
    weight: 10,
    rest: 60,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/13",
  };

  exerciseDumbbellInt = {
    id: 13,
    name: "Dumbbell flys",
    type: "Strength",
    secondaryType: "Push",
    description:
      "Lie with your back on a weight bench with your arms extended out to each side. Then, lift the dumbbells up over your head until they meet in the middle in front of you.",
    userId: "65512a3b7409f13021857720",
    muscleGroup: "Chest",
    equipment: "Dumbells, bench",
    reps: 8,
    sets: 4,
    weightClass: "Dumbbell",
    weight: 25,
    rest: 60,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/13",
  };

  exerciseDumbbellAdv = {
    id: 13,
    name: "Dumbbell flys",
    type: "Strength",
    secondaryType: "Push",
    description:
      "Lie with your back on a weight bench with your arms extended out to each side. Then, lift the dumbbells up over your head until they meet in the middle in front of you.",
    userId: "65512a3b7409f13021857720",
    muscleGroup: "Chest",
    equipment: "Dumbells, bench",
    reps: 5,
    sets: 5,
    weightClass: "Dumbbell",
    weight: 45,
    rest: 90,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/13",
  };

  // exerciseBodyweightBeg = {
  //   id: 31,
  //   name: "Push-ups",
  //   type: "Strength",
  //   secondaryType: "Push",
  //   description:
  //     "From the plank position, lower yourself to the floor and then push up",
  //   userId: "65512a3b7409f13021857720",
  //   muscleGroup: "Chest",
  //   equipment: null,
  //   reps: 10,
  //   sets: 1,
  //   weightClass: "Bodyweight",
  //   weight: null,
  //   rest: 60,
  //   timesCompleted: 0,
  //   self: "http://localhost:8080/exercises/31",
  // };

  // exerciseBodyweightInt = {
  //   id: 31,
  //   name: "Push-ups",
  //   type: "Strength",
  //   secondaryType: "Push",
  //   description:
  //     "From the plank position, lower yourself to the floor and then push up",
  //   userId: "65512a3b7409f13021857720",
  //   muscleGroup: "Chest",
  //   equipment: null,
  //   reps: 10,
  //   sets: 2,
  //   weightClass: "Bodyweight",
  //   weight: null,
  //   rest: 60,
  //   timesCompleted: 0,
  //   self: "http://localhost:8080/exercises/31",
  // };

  // exerciseBodyweightAdv = {
  //   id: 31,
  //   name: "Push-ups",
  //   type: "Strength",
  //   secondaryType: "Push",
  //   description:
  //     "From the plank position, lower yourself to the floor and then push up",
  //   userId: "65512a3b7409f13021857720",
  //   muscleGroup: "Chest",
  //   equipment: null,
  //   reps: 10,
  //   sets: 3,
  //   weightClass: "Bodyweight",
  //   weight: null,
  //   rest: 60,
  //   timesCompleted: 0,
  //   self: "http://localhost:8080/exercises/31",
  // };

  exerciseRunningBeg = {
    id: 106,
    name: "Running",
    type: "Cardio",
    secondaryType: "Running",
    description: "Run, Forrest, Run!",
    userId: "65512a3b7409f13021857720",
    duration: 15,
    distance: 1,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/106",
  };

  exerciseRunningInt = {
    id: 106,
    name: "Running",
    type: "Cardio",
    secondaryType: "Running",
    description: "Run, Forrest, Run!",
    userId: "65512a3b7409f13021857720",
    duration: 30,
    distance: 3,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/106",
  };

  exerciseRunningAdv = {
    id: 106,
    name: "Running",
    type: "Cardio",
    secondaryType: "Running",
    description: "Run, Forrest, Run!",
    userId: "65512a3b7409f13021857720",
    duration: 60,
    distance: 5,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/106",
  };

  exerciseCyclingBeg = {
    id: 107,
    name: "Cycling",
    type: "Cardio",
    secondaryType: "Cycling",
    description: "Cycle, Forrest, Cycle!",
    userId: "65512a3b7409f13021857720",
    duration: 20,
    distance: 4,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/107",
  };

  exerciseCyclingInt = {
    id: 107,
    name: "Cycling",
    type: "Cardio",
    secondaryType: "Cycling",
    description: "Cycle, Forrest, Cycle!",
    userId: "65512a3b7409f13021857720",
    duration: 40,
    distance: 10,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/107",
  };

  exerciseCyclingAdv = {
    id: 107,
    name: "Cycling",
    type: "Cardio",
    secondaryType: "Cycling",
    description: "Cycle, Forrest, Cycle!",
    userId: "65512a3b7409f13021857720",
    duration: 60,
    distance: 20,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/107",
  };

  exerciseYogaBeg = {
    id: 108,
    name: "Mountain",
    type: "Flexibility",
    secondaryType: "Yoga",
    description:
      "Stand upright with your arms at your sides, palms facing forward",
    userId: "65512a3b7409f13021857720",
    duration: 10,
    difficulty: 1,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/108",
  };

  exerciseYogaInt = {
    id: 108,
    name: "Mountain",
    type: "Flexibility",
    secondaryType: "Running",
    description: "Run, Forrest, Run!",
    userId: "65512a3b7409f13021857720",
    duration: 25,
    difficulty: 2,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/108",
  };

  exerciseYogaAdv = {
    id: 108,
    name: "Mountain",
    type: "Flexibility",
    secondaryType: "Running",
    description: "Run, Forrest, Run!",
    userId: "65512a3b7409f13021857720",
    duration: 45,
    difficulty: 3,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/108",
  };

  exerciseStretchingBeg = {
    id: 156,
    name: "Ankle Rolls",
    type: "Flexibility",
    secondaryType: "Stretching",
    description: "Draw big circles with your ankles in both directions.",
    userId: "65512a3b7409f13021857720",
    duration: 10,
    difficulty: 1,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/156",
  };

  exerciseStretchingInt = {
    id: 156,
    name: "Ankle Rolls",
    type: "Flexibility",
    secondaryType: "Stretching",
    description: "Draw big circles with your ankles in both directions.",
    userId: "65512a3b7409f13021857720",
    duration: 25,
    difficulty: 2,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/156",
  };

  exerciseStretchingAdv = {
    id: 156,
    name: "Ankle Rolls",
    type: "Flexibility",
    secondaryType: "Stretching",
    description: "Draw big circles with your ankles in both directions.",
    userId: "65512a3b7409f13021857720",
    duration: 45,
    difficulty: 3,
    timesCompleted: 0,
    self: "http://localhost:8080/exercises/156",
  };

  surveyBarbellSame = {
    id: 1,
    exerciseId: 1,
    userId: "65512a3b7409f13021857720",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: 2,
    weight: 2,
    sets: 2,
    rest: 2,
    difficulty: null,
    duration: null,
    distance: null,
  };
  
  surveyBarbellEasy = {
    id: 2,
    exerciseId: 1,
    userId: "65512a3b7409f13021857720",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: 1,
    weight: 1,
    sets: 1,
    rest: 1,
    difficulty: null,
    duration: null,
    distance: null,
  };

  surveyBarbellHard = {
    id: 3,
    exerciseId: 1,
    userId: "65512a3b7409f13021857720",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: 3,
    weight: 3,
    sets: 3,
    rest: 3,
    difficulty: null,
    duration: null,
    distance: null,
  };

  surveyDumbbellSame = {
    id: 1,
    exerciseId: 13,
    userId: "65512a3b7409f13021857720",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: 2,
    weight: 2,
    sets: 2,
    rest: 2,
    difficulty: null,
    duration: null,
    distance: null,
  };

  surveyDumbbellEasy = {
    id: 2,
    exerciseId: 13,
    userId: "65512a3b7409f13021857720",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: 1,
    weight: 1,
    sets: 1,
    rest: 1,
    difficulty: null,
    duration: null,
    distance: null,
  };

  surveyDumbbellHard = {
    id: 3,
    exerciseId: 13,
    userId: "65512a3b7409f13021857720",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: 3,
    weight: 3,
    sets: 3,
    rest: 3,
    difficulty: null,
    duration: null,
    distance: null,
  };

  surveyBodyweightSame = {
    id: 1,
    exerciseId: 13,
    userId: "65512a3b7409f13021857720",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: 2,
    weight: 2,
    sets: 2,
    rest: 2,
    difficulty: null,
    duration: null,
    distance: null,
  };

  surveyBodyweightEasy = {
    id: 2,
    exerciseId: 13,
    userId: "65512a3b7409f13021857720",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: 1,
    weight: 1,
    sets: 1,
    rest: 1,
    difficulty: null,
    duration: null,
    distance: null,
  };

  surveyBodyweightHard = {
    id: 3,
    exerciseId: 13,
    userId: "65512a3b7409f13021857720",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: 3,
    weight: 3,
    sets: 3,
    rest: 3,
    difficulty: null,
    duration: null,
    distance: null,
  };

  surveyRunningSame = {
    id: 4,
    exerciseId: 106,
    userId: "65512ad4f51452e44ecddac4",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 2,
    distance: 2,
  };

  surveyRunningHard = {
    id: 5,
    exerciseId: 106,
    userId: "65512ad4f51452e44ecddac4",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 3,
    distance: 3,
  };

  surveyRunningEasy = {
    id: 6,
    exerciseId: 106,
    userId: "65512ad4f51452e44ecddac4",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 1,
    distance: 1,
  };

  surveyCyclingSame = {
    id: 7,
    exerciseId: 107,
    userId: "65512b098eaf8db1930f6e56",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 2,
    distance: 2,
  };

  surveyCyclingHard = {
    id: 8,
    exerciseId: 107,
    userId: "65512b098eaf8db1930f6e56",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 3,
    distance: 3,
  };

  surveyCyclingEasy = {
    id: 9,
    exerciseId: 107,
    userId: "65512b098eaf8db1930f6e56",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 1,
    distance: 1,
  };

  surveyYogaSame = {
    id: 10,
    exerciseId: 108,
    userId: "655133dd3e05dd89a157815a",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 2,
    distance: null,
  };

  surveyYogaHard = {
    id: 11,
    exerciseId: 108,
    userId: "655133dd3e05dd89a157815a",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 3,
    distance: null,
  };

  surveyYogaEasy = {
    id: 12,
    exerciseId: 108,
    userId: "655133dd3e05dd89a157815a",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 1,
    distance: null,
  };

  surveyStretchingSame = {
    id: 13,
    exerciseId: 147,
    userId: "655133f67409f13021857cfb",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 2,
    distance: null,
  };

  surveyStretchingHard = {
    id: 14,
    exerciseId: 147,
    userId: "655133f67409f13021857cfb",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 3,
    distance: null,
  };

  surveyStretchingEasy = {
    id: 15,
    exerciseId: 147,
    userId: "655133f67409f13021857cfb",
    datetime: "2023-11-20T00:42:59.327Z",
    reps: null,
    weight: null,
    sets: null,
    rest: null,
    difficulty: null,
    duration: 1,
    distance: null,
  };
});

afterEach(() => {

});

test("exerciseBarbellBeg surveyBarbellSame updates", () => {
  const result = Generator.updateUserExercise(exerciseBarbellBeg, surveyBarbellSame);

  expect(result.weight).toEqual(42);
  expect(result.reps).toEqual(12);
  expect(result.sets).toEqual(3);
  expect(result.rest).toEqual(60);
});

test("exerciseBarbellBeg surveyBarbellEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseBarbellBeg,
    surveyBarbellEasy
  );

  expect(result.weight).toEqual(44);
  expect(result.reps).toEqual(12);
  expect(result.sets).toEqual(4);
  expect(result.rest).toEqual(50);
});

test("exerciseBarbellBeg surveyBarbellHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseBarbellBeg,
    surveyBarbellHard
  );

  expect(result.weight).toEqual(36);
  expect(result.reps).toEqual(12);
  expect(result.sets).toEqual(2);
  expect(result.rest).toEqual(70);
});

test("exerciseBarbellInt surveyBarbellSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseBarbellInt,
    surveyBarbellSame
  );

  expect(result.weight).toEqual(63);
  expect(result.reps).toEqual(8);
  expect(result.sets).toEqual(4);
  expect(result.rest).toEqual(60);
});

test("exerciseBarbellInt surveyBarbellEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseBarbellInt,
    surveyBarbellEasy
  );

  expect(result.weight).toEqual(66);
  expect(result.reps).toEqual(8);
  expect(result.sets).toEqual(5);
  expect(result.rest).toEqual(50);
});

test("exerciseBarbellInt surveyBarbellHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseBarbellInt,
    surveyBarbellHard
  );

  expect(result.weight).toEqual(54);
  expect(result.reps).toEqual(8);
  expect(result.sets).toEqual(3);
  expect(result.rest).toEqual(70);
});

test("exerciseBarbellAdv surveyBarbellSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseBarbellAdv,
    surveyBarbellSame
  );

  expect(result.weight).toEqual(95);
  expect(result.reps).toEqual(5);
  expect(result.sets).toEqual(5);
  expect(result.rest).toEqual(90);
});

test("exerciseBarbellAdv surveyBarbellEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseBarbellAdv,
    surveyBarbellEasy
  );

  expect(result.weight).toEqual(99);
  expect(result.reps).toEqual(5);
  expect(result.sets).toEqual(6);
  expect(result.rest).toEqual(80);
});

test("exerciseBarbellAdv surveyBarbellHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseBarbellAdv,
    surveyBarbellHard
  );

  expect(result.weight).toEqual(81);
  expect(result.reps).toEqual(5);
  expect(result.sets).toEqual(4);
  expect(result.rest).toEqual(100);
});

test("exerciseDumbbellBeg surveyDumbbellSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseDumbbellBeg,
    surveyDumbbellSame
  );

  expect(result.weight).toEqual(11);
  expect(result.reps).toEqual(12);
  expect(result.sets).toEqual(3);
  expect(result.rest).toEqual(60);
});

test("exerciseDumbbellBeg surveyDumbbellEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseDumbbellBeg,
    surveyDumbbellEasy
  );

  expect(result.weight).toEqual(11);
  expect(result.reps).toEqual(12);
  expect(result.sets).toEqual(4);
  expect(result.rest).toEqual(50);
});

test("exerciseDumbbellBeg surveyDumbbellHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseDumbbellBeg,
    surveyDumbbellHard
  );

  expect(result.weight).toEqual(9);
  expect(result.reps).toEqual(12);
  expect(result.sets).toEqual(2);
  expect(result.rest).toEqual(70);
});

test("exerciseDumbbellInt surveyDumbbellSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseDumbbellInt,
    surveyDumbbellSame
  );

  expect(result.weight).toEqual(26);
  expect(result.reps).toEqual(8);
  expect(result.sets).toEqual(4);
  expect(result.rest).toEqual(60);
});

test("exerciseDumbbellInt surveyDumbbellEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseDumbbellInt,
    surveyDumbbellEasy
  );

  expect(result.weight).toEqual(28);
  expect(result.reps).toEqual(8);
  expect(result.sets).toEqual(5);
  expect(result.rest).toEqual(50);
});

test("exerciseDumbbellInt surveyDumbbellHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseDumbbellInt,
    surveyDumbbellHard
  );

  expect(result.weight).toEqual(23);
  expect(result.reps).toEqual(8);
  expect(result.sets).toEqual(3);
  expect(result.rest).toEqual(70);
});

test("exerciseDumbbellAdv surveyDumbbellSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseDumbbellAdv,
    surveyDumbbellSame
  );

  expect(result.weight).toEqual(47);
  expect(result.reps).toEqual(5);
  expect(result.sets).toEqual(5);
  expect(result.rest).toEqual(90);
});

test("exerciseDumbbellAdv surveyDumbbellEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseDumbbellAdv,
    surveyDumbbellEasy
  );

  expect(result.weight).toEqual(50);
  expect(result.reps).toEqual(5);
  expect(result.sets).toEqual(6);
  expect(result.rest).toEqual(80);
});

test("exerciseDumbbellAdv surveyDumbbellHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseDumbbellAdv,
    surveyDumbbellHard
  );

  expect(result.weight).toEqual(41);
  expect(result.reps).toEqual(5);
  expect(result.sets).toEqual(4);
  expect(result.rest).toEqual(100);
});


// test("exerciseBodyweightBeg surveyBodyweightSame updates", () => {
//   const result = Generator.updateUserExercise(
//     exerciseBodyweightBeg,
//     surveyBodyweightSame
//   );

//   expect(result.weight).toEqual(null);
//   expect(result.reps).toEqual(10);
//   expect(result.sets).toEqual(1);
//   expect(result.rest).toEqual(60);
// });

// test("exerciseBodyweightBeg surveyBodyweightEasy updates", () => {
//   const result = Generator.updateUserExercise(
//     exerciseBodyweightBeg,
//     surveyBodyweightEasy
//   );

//   expect(result.weight).toEqual(null);
//   expect(result.reps).toEqual(10);
//   expect(result.sets).toEqual(2);
//   expect(result.rest).toEqual(50);
// });

// test("exerciseBodyweightBeg surveyBodyweightHard updates", () => {
//   const result = Generator.updateUserExercise(
//     exerciseBodyweightBeg,
//     surveyBodyweightHard
//   );

//   expect(result.weight).toEqual(null);
//   expect(result.reps).toEqual(10);
//   expect(result.sets).toEqual(1);
//   expect(result.rest).toEqual(70);
// });

// test("exerciseBodyweightInt surveyBodyweightSame updates", () => {
//   const result = Generator.updateUserExercise(
//     exerciseBodyweightInt,
//     surveyBodyweightSame
//   );

//   expect(result.weight).toEqual(null);
//   expect(result.reps).toEqual(10);
//   expect(result.sets).toEqual(2);
//   expect(result.rest).toEqual(60);
// });

// test("exerciseBodyweightInt surveyBodyweightEasy updates", () => {
//   const result = Generator.updateUserExercise(
//     exerciseBodyweightInt,
//     surveyBodyweightEasy
//   );

//   expect(result.weight).toEqual(null);
//   expect(result.reps).toEqual(8);
//   expect(result.sets).toEqual(5);
//   expect(result.rest).toEqual(50);
// });

// test("exerciseBodyweightInt surveyBodyweightHard updates", () => {
//   const result = Generator.updateUserExercise(
//     exerciseBodyweightInt,
//     surveyBodyweightHard
//   );

//   expect(result.weight).toEqual(22);
//   expect(result.reps).toEqual(8);
//   expect(result.sets).toEqual(3);
//   expect(result.rest).toEqual(70);
// });

// test("exerciseBodyweightAdv surveyBodyweightSame updates", () => {
//   const result = Generator.updateUserExercise(
//     exerciseBodyweightAdv,
//     surveyBodyweightSame
//   );

//   expect(result.weight).toEqual(47);
//   expect(result.reps).toEqual(5);
//   expect(result.sets).toEqual(5);
//   expect(result.rest).toEqual(90);
// });

// test("exerciseBodyweightAdv surveyBodyweightEasy updates", () => {
//   const result = Generator.updateUserExercise(
//     exerciseBodyweightAdv,
//     surveyBodyweightEasy
//   );

//   expect(result.weight).toEqual(50);
//   expect(result.reps).toEqual(5);
//   expect(result.sets).toEqual(6);
//   expect(result.rest).toEqual(80);
// });

// test("exerciseBodyweightAdv surveyBodyweightHard updates", () => {
//   const result = Generator.updateUserExercise(
//     exerciseBodyweightAdv,
//     surveyBodyweightHard
//   );

//   expect(result.weight).toEqual(40);
//   expect(result.reps).toEqual(5);
//   expect(result.sets).toEqual(4);
//   expect(result.rest).toEqual(100);
// });

test("exerciseRunningBeg surveyRunningSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseRunningBeg,
    surveyRunningSame
  );

  expect(result.distance).toEqual(1);
  expect(result.duration).toEqual(15);
});

test("exerciseRunningBeg surveyRunningEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseRunningBeg,
    surveyRunningEasy
  );

  expect(result.distance).toEqual(1.1);
  expect(result.duration).toEqual(17);
});

test("exerciseRunningBeg surveyRunningHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseRunningBeg,
    surveyRunningHard
  );

  expect(result.distance).toEqual(0.9);
  expect(result.duration).toEqual(14);
});

test("exerciseRunningInt surveyRunningSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseRunningInt,
    surveyRunningSame
  );

  expect(result.distance).toEqual(3);
  expect(result.duration).toEqual(30);
});

test("exerciseRunningInt surveyRunningEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseRunningInt,
    surveyRunningEasy
  );

  expect(result.distance).toEqual(3.3);
  expect(result.duration).toEqual(33);
});

test("exerciseRunningInt surveyRunningHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseRunningInt,
    surveyRunningHard
  );

  expect(result.distance).toEqual(2.7);
  expect(result.duration).toEqual(27);
});

test("exerciseRunningAdv surveyRunningSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseRunningAdv,
    surveyRunningSame
  );

  expect(result.distance).toEqual(5);
  expect(result.duration).toEqual(60);
});

test("exerciseRunningAdv surveyRunningEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseRunningAdv,
    surveyRunningEasy
  );

  expect(result.distance).toEqual(5.5);
  expect(result.duration).toEqual(66);
});

test("exerciseRunningAdv surveyRunningHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseRunningAdv,
    surveyRunningHard
  );

  expect(result.distance).toEqual(4.5);
  expect(result.duration).toEqual(54);
});


test("exerciseCyclingBeg surveyCyclingSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseCyclingBeg,
    surveyCyclingSame
  );

  expect(result.distance).toEqual(4);
  expect(result.duration).toEqual(20);
});

test("exerciseCyclingBeg surveyCyclingEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseCyclingBeg,
    surveyCyclingEasy
  );

  expect(result.distance).toEqual(4.4);
  expect(result.duration).toEqual(22);
});

test("exerciseCyclingBeg surveyCyclingHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseCyclingBeg,
    surveyCyclingHard
  );

  expect(result.distance).toEqual(3.6);
  expect(result.duration).toEqual(18);
});

test("exerciseCyclingInt surveyCyclingSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseCyclingInt,
    surveyCyclingSame
  );

  expect(result.distance).toEqual(10);
  expect(result.duration).toEqual(40);
});

test("exerciseCyclingInt surveyCyclingEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseCyclingInt,
    surveyCyclingEasy
  );

  expect(result.distance).toEqual(11);
  expect(result.duration).toEqual(44);
});

test("exerciseCyclingInt surveyCyclingHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseCyclingInt,
    surveyCyclingHard
  );

  expect(result.distance).toEqual(9);
  expect(result.duration).toEqual(36);
});

test("exerciseCyclingAdv surveyCyclingSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseCyclingAdv,
    surveyCyclingSame
  );

  expect(result.distance).toEqual(20);
  expect(result.duration).toEqual(60);
});

test("exerciseCyclingAdv surveyCyclingEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseCyclingAdv,
    surveyCyclingEasy
  );

  expect(result.distance).toEqual(22);
  expect(result.duration).toEqual(66);
});

test("exerciseCyclingAdv surveyCyclingHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseCyclingAdv,
    surveyCyclingHard
  );

  expect(result.distance).toEqual(18);
  expect(result.duration).toEqual(54);
});

test("exerciseYogaBeg surveyYogaSame updates", () => {
  const result = Generator.updateUserExercise(exerciseYogaBeg, surveyYogaSame);

  expect(result.duration).toEqual(13);
});

test("exerciseYogaBeg surveyYogaEasy updates", () => {
  const result = Generator.updateUserExercise(exerciseYogaBeg, surveyYogaEasy);

  expect(result.duration).toEqual(15);
});

test("exerciseYogaBeg surveyYogaHard updates", () => {
  const result = Generator.updateUserExercise(exerciseYogaBeg, surveyYogaHard);

  expect(result.duration).toEqual(8);
});

test("exerciseYogaInt surveyYogaSame updates", () => {
  const result = Generator.updateUserExercise(exerciseYogaInt, surveyYogaSame);

  expect(result.duration).toEqual(28);
});

test("exerciseYogaInt surveyYogaEasy updates", () => {
  const result = Generator.updateUserExercise(exerciseYogaInt, surveyYogaEasy);

  expect(result.duration).toEqual(30);
});

test("exerciseYogaInt surveyYogaHard updates", () => {
  const result = Generator.updateUserExercise(exerciseYogaInt, surveyYogaHard);

  expect(result.duration).toEqual(23);
});

test("exerciseYogaAdv surveyYogaSame updates", () => {
  const result = Generator.updateUserExercise(exerciseYogaAdv, surveyYogaSame);

  expect(result.duration).toEqual(48);
});

test("exerciseYogaAdv surveyYogaEasy updates", () => {
  const result = Generator.updateUserExercise(exerciseYogaAdv, surveyYogaEasy);

  expect(result.duration).toEqual(50);
});

test("exerciseYogaAdv surveyYogaHard updates", () => {
  const result = Generator.updateUserExercise(exerciseYogaAdv, surveyYogaHard);

  expect(result.duration).toEqual(43);
});


test("exerciseStretchingBeg surveyStretchingSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseStretchingBeg,
    surveyStretchingSame
  );

  expect(result.duration).toEqual(13);
});

test("exerciseStretchingBeg surveyStretchingEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseStretchingBeg,
    surveyStretchingEasy
  );

  expect(result.duration).toEqual(15);
});

test("exerciseStretchingBeg surveyStretchingHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseStretchingBeg,
    surveyStretchingHard
  );

  expect(result.duration).toEqual(8);
});

test("exerciseStretchingInt surveyStretchingSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseStretchingInt,
    surveyStretchingSame
  );

  expect(result.duration).toEqual(28);
});

test("exerciseStretchingInt surveyStretchingEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseStretchingInt,
    surveyStretchingEasy
  );

  expect(result.duration).toEqual(30);
});

test("exerciseStretchingInt surveyStretchingHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseStretchingInt,
    surveyStretchingHard
  );

  expect(result.duration).toEqual(23);
});

test("exerciseStretchingAdv surveyStretchingSame updates", () => {
  const result = Generator.updateUserExercise(
    exerciseStretchingAdv,
    surveyStretchingSame
  );

  expect(result.duration).toEqual(48);
});

test("exerciseStretchingAdv surveyStretchingEasy updates", () => {
  const result = Generator.updateUserExercise(
    exerciseStretchingAdv,
    surveyStretchingEasy
  );

  expect(result.duration).toEqual(50);
});

test("exerciseStretchingAdv surveyStretchingHard updates", () => {
  const result = Generator.updateUserExercise(
    exerciseStretchingAdv,
    surveyStretchingHard
  );

  expect(result.duration).toEqual(43);
});