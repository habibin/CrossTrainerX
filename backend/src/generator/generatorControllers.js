async function generateWorkout(exerciseMap, workoutCount) {
  const exerciseType = Object.keys(exerciseMap)[0];
  switch (exerciseType) {
    case "Strength":
      return generateStrengthWorkout(exerciseMap, workoutCount);
    case "Cardio":
      return generateCardioWorkout(exerciseMap, workoutCount);
    case "Flexibility":
      return generateFlexibilityWorkout(exerciseMap, workoutCount);
  }
}

function generateStrengthWorkout(exerciseMap, workoutCount) {
  switch (workoutCount % 3) {
    case 0:
      return getPushExercises(exerciseMap);
    case 1:
      return getPullExercises(exerciseMap);
    case 2:
      return getLegsExercises(exerciseMap);
  } 
}

function getPushExercises(exerciseMap) {
  const chestExercises = exerciseMap["Strength"]["Push"]["Chest"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );
  const shouldersExercises = exerciseMap["Strength"]["Push"]["Shoulders"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );
  const tricepsExercises = exerciseMap["Strength"]["Push"]["Triceps"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );

  return [
    ...chestExercises.slice(0, 2),
    ...shouldersExercises.slice(0, 2),
    ...tricepsExercises.slice(0, 2),
  ];
}

function getPullExercises(exerciseMap) {
  const backExercises = exerciseMap["Strength"]["Pull"]["Back"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );
  const bicepsExercises = exerciseMap["Strength"]["Pull"]["Biceps"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );
  const deltoidsExercises = exerciseMap["Strength"]["Pull"]["Deltoids"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );

  return [
    ...backExercises.slice(0, 2),
    ...bicepsExercises.slice(0, 2),
    ...deltoidsExercises.slice(0, 2),
  ];
}

function getLegsExercises(exerciseMap) {
  const quadsExercises = exerciseMap["Strength"]["Legs"]["Quads"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );
  const calvesExercises = exerciseMap["Strength"]["Legs"]["Calves"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );
  const glutesExercises = exerciseMap["Strength"]["Legs"]["Glutes"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );
  const hamstringsExercises = exerciseMap["Strength"]["Legs"]["Hamstrings"].sort(
    (a, b) => a.timesCompleted - b.timesCompleted
  );

  return [
    ...quadsExercises.slice(0, 2),
    ...calvesExercises.slice(0, 2),
    ...glutesExercises.slice(0, 2),
    ...hamstringsExercises.slice(0, 2)
  ];
}

function generateCardioWorkout(exerciseMap, workoutCount) {}

function generateFlexibilityWorkout(exerciseMap, workoutCount) {}

async function mapExercises(exercises) {
  try {
    let exerciseMap = {};
    exercises.forEach((exercise) => {
      if ( 
        exercise.type != "Strength" &&
        exerciseMap[exercise.type] &&
        exerciseMap[exercise.type][exercise.secondaryType]
      ) {
          exerciseMap[exercise.type][exercise.secondaryType].push(exercise);
          return;
      }

      if (
        exercise.type == "Strength" &&
        exerciseMap[exercise.type] &&
        exerciseMap[exercise.type][exercise.secondaryType] &&
        exerciseMap[exercise.type][exercise.secondaryType][exercise.muscleGroup]
      ) {
        exerciseMap[exercise.type][exercise.secondaryType][exercise.muscleGroup].push(exercise);
        return;
      }

      if (!exerciseMap[exercise.type]) {
        exerciseMap[exercise.type] = {};
      }

      if (!exerciseMap[exercise.type][exercise.secondaryType]) {
        if (exercise.type != "Strength") {
          exerciseMap[exercise.type][exercise.secondaryType] = [exercise];
          return;
        } else {
          exerciseMap[exercise.type][exercise.secondaryType] = {};
        }
      }

      if (!exerciseMap[exercise.type][exercise.secondaryType][exercise.muscleGroup]) {
        exerciseMap[exercise.type][exercise.secondaryType][exercise.muscleGroup] = [exercise];
      }
    });

    return exerciseMap;
  } catch (e) {
    console.error(e);
    return e;
  }
}

module.exports = {
  mapExercises,
  generateWorkout,
};
