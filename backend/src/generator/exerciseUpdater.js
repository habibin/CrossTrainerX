function updateUserExercise(exercise, survey) {
  switch (exercise.type) {
    case "Strength":
      return updateStrength(exercise, survey);
    case "Cardio":
      return updateCardio(exercise, survey);
    case "Flexibility":
      return updateFlexibility(exercise, survey);
    default:
      return handleError();
  }
}

function updateStrength(exercise, survey) {
  exercise.timesCompleted += 1;

  switch (survey.reps) {
    case 1:
      exercise.reps += 2;
      break;
    case 3:
      exercise.reps -= 2;
      break;
  }

  switch (survey.sets) {
    case 1:
      exercise.reps -= 2;
      exercise.sets += 1;
      break;
    case 3:
      exercise.reps += 2;
      exercise.sets -= 1;
      break;
  }

  switch (survey.weight) {
    case 1:
      exercise.weight = Math.round(exercise.weight * 1.1);
      break;
    case 2:
      exercise.weight = Math.round(exercise.weight * 1.05);
      break;
    case 3:
      exercise.weight = Math.round(exercise.weight * 0.9);
      break;
  }

  switch (survey.rest) {
    case 1:
      exercise.rest = Math.round(exercise.rest -= 10);
      break;
    case 3:
      exercise.rest = Math.round(exercise.rest += 10);
      break;
  }

  return exercise;
}

function updateCardio(exercise, survey) {
  exercise.timesCompleted += 1;
  
  switch (survey.duration) {
    case 1:
      exercise.duration = Math.round(exercise.duration * 1.1);
      break;
    case 2:
      break;
    case 3:
      exercise.duration = Math.round(exercise.duration * .9);
      break;
  }

  switch (survey.distance) {
    case 1:
      exercise.distance = exercise.distance * 1.1 ;
      break;
    case 2:
      break;
    case 3:
      exercise.distance = exercise.distance * .9;
      break;
  }

  if (exercise.timesCompleted % 4 == 0) {
    exercise.duration = Math.round((exercise.duration / 0.75) * 1.1);
  } else if (exercise.timesCompleted % 4 == 3) {
    exercise.duration = Math.round(exercise.duration * 0.75);
  }

  if (exercise.secondaryType == "Running") {
    exercise.distance =
      exercise.distance > 12 ? 12 : Math.round(exercise.distance * 10) / 10;
  }

  if (exercise.secondaryType == "Cycling") {
    exercise.distance =
      exercise.distance > 50 ? 50 : Math.round(exercise.distance * 10) / 10;
  }

  exercise.duration =
    exercise.duration > 150 ? 150 : Math.round(exercise.duration * 10) / 10;

  return exercise;
}

function updateFlexibility(exercise, survey) {
  switch (survey.duration) {
    case 1:
      exercise.duration += 5;
      break;
    case 2:
      exercise.duration += 3;
      break;
    case 3:
      exercise.duration -= 2;
      break;
  }

  exercise.duration = exercise.duration > 90 ? 90 : exercise.duration;

  return exercise;
}

function updateBarbell(exercise, survey) {
  return updateStrength(exercise, survey);
}

function updateDumbbell(exercise, survey) {
  return updateStrength(exercise, survey);
}

function updateRunning(exercise, survey) {
  return updateCardio(exercise, survey);
}

function updateCycling(exercise, survey) {
  return updateCardio(exercise, survey);
}
function updateYoga(exercise, survey) {
  return updateFlexibility(exercise, survey);
}

function updateStretching(exercise, survey) {
  return updateFlexibility(exercise, survey);
}

function handleError() {
  return null;
}


module.exports = {
  updateUserExercise,
  updateStrength,
  updateCardio,
  updateFlexibility,
  updateBarbell,
  updateDumbbell,
  updateRunning,
  updateCycling,
  updateYoga,
  updateStretching
};
