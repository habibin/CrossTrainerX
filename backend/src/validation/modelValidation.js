function exerciseInvalid(exercise) {
  const idValid = exercise.id && typeof exercise.id === "string";
  const nameValid = exercise.name && typeof exercise.name === "string";
  const typeValid = 
    exercise.type &&
    typeof exercise.type === "string" &&
    ["Strength", "Cardio", "Flexibility"].includes(exercise.type);
  const descriptionValid =
    exercise.description && typeof exercise.description === "string";
  const userIdValid = exercise.userId && typeof exercise.userId === "string";

  switch (exercise.type) {
    case "Strength":
      const strengthSecondaryTypeValid =
        ["Push", "Pull", "Legs"].includes(exercise.secondaryType);
      const muscleGroupValid =
        exercise.muscleGroup && typeof exercise.muscleGroup === "string";
      const equipmentValid =
        exercise.equipment && typeof exercise.equipment === "string";
      const repsValid =
        typeof exercise.reps === "number" && Number.isInteger(exercise.reps);
      const setsValid =
        typeof exercise.sets === "number" && Number.isInteger(exercise.sets);
      const weightValid =
        typeof exercise.weight === "number" &&
        Number.isInteger(exercise.weight);
      const weightClassValid =
        typeof exercise.weightClass === "number" &&
        Number.isInteger(exercise.weightClass) &&
        [1, 2, 3].includes(exercise.weightClass);
      
      const restValid =
        typeof exercise.rest === "number" && Number.isInteger(exercise.rest);

      if (
        idValid &&
        nameValid &&
        typeValid &&
        strengthSecondaryTypeValid &&
        descriptionValid &&
        userIdValid &&
        muscleGroupValid &&
        equipmentValid &&
        repsValid &&
        setsValid &&
        weightValid &&
        weightClassValid &&
        restValid
      ) {
        return false;
      }
    case "Cardio":
      const cardioSecondaryTypeValid =
        exercise.secondaryType !== undefined &&
        typeof exercise.secondaryType === "string" &&
        ["Running", "Cycling"].includes(
          exercise.secondaryType
        );
      const cardioDurationValid =
        typeof exercise.duration === "number" &&
        Number.isInteger(exercise.duration);
      const distanceValid =
        typeof exercise.distance === "number" &&
        Number.isInteger(exercise.distance);

      if (
        idValid &&
        nameValid &&
        typeValid &&
        cardioSecondaryTypeValid &&
        descriptionValid &&
        userIdValid &&
        cardioDurationValid &&
        distanceValid
      ) {
        return false;
      }
    case "Flexibility":
      const flexibilitySecondaryTypeValid =
        exercise.secondaryType !== undefined &&
        typeof exercise.secondaryType === "string" &&
        ["Yoga", "Stretching"].includes(exercise.secondaryType);
      const flexDurationValid =
        typeof exercise.duration === "number" &&
        Number.isInteger(exercise.duration);
      const difficultyValid =
        typeof exercise.difficulty === "number" &&
        Number.isInteger(exercise.difficulty);

      if (
        idValid &&
        nameValid &&
        typeValid &&
        flexibilitySecondaryTypeValid &&
        descriptionValid &&
        userIdValid &&
        flexDurationValid &&
        difficultyValid
      ) {
        return false;
      }
    default:
      return true;
  }
}

function userInvalid(user) {
  const idValid = user.userId && typeof user.userId === "string";
  const emailValid = user.email && typeof user.email === "string";
  const avatarValid =
    user.avatarId &&
    [1, 2, 3, 4, 5].includes(user.avatarId);
  const firstNameValid = user.firstName && typeof user.firstName === "string";
  const lastNameValid = user.lastName && typeof user.lastName === "string";
  const cityValid = !user.city || (user.city && typeof user.city === "string");
  const stateValid = !user.state || (user.state && typeof user.state === "string");
  const ageValid = !user.age || (user.age && typeof user.age === "number");
  const genderValid = !user.gender || (user.gender && typeof user.gender === "string");
  const weightValid = !user.weight || (user.weight && typeof user.weight === "number");
  const heightValid = !user.height || (user.height && typeof user.height === "number");
  const fitnessTrackValid =
    user.fitnessTrack && typeof user.fitnessTrack === "string" && 
    ["Strength", "Cardio", "Flexibility"].includes(user.fitnessTrack);
  const secondaryTrackValid =
    (
      (user.fitnessTrack == "Strength"    && user.secondaryTrack === null) ||
      (user.fitnessTrack == "Cardio"      && ["Running", "Cycling"].includes(user.secondaryTrack)) ||
      (user.fitnessTrack == "Flexibility" && ["Yoga", "Stretching"].includes(user.secondaryTrack))
    );

  if (
    idValid &&
    emailValid &&
    avatarValid &&
    firstNameValid &&
    lastNameValid &&
    cityValid &&
    stateValid &&
    ageValid &&
    genderValid &&
    weightValid &&
    heightValid &&
    fitnessTrackValid &&
    secondaryTrackValid
  ) {
    return false;
  }
  return true;
}

function workoutInvalid(workout) {
  const idValid = workout.id && typeof workout.id === "number" && Number.isInteger(workout.id);
  const userValid = workout.userId && typeof workout.userId === "string";
  const exercisesValid = workout.exercises && typeof workout.exercises === "object";
  const dateCompletedValid =
    workout.dateCompleted == null || (workout.dateCompleted && typeof workout.dateCompleted === "string");

  if (
    idValid &&
    userValid &&
    exercisesValid &&
    dateCompletedValid
  ) {
    return false;
  }
  return true;
}

function surveyInvalid(survey) {
  const validSurveyValues = [null, 1, 2, 3];
  const idValid =
    survey.id && typeof survey.id === "number" && Number.isInteger(survey.id);
  const exerciseIdValid =
    survey.exerciseId &&
    typeof survey.exerciseId === "number" &&
    Number.isInteger(survey.exerciseId);
  const userIdValid = survey.userId && typeof survey.userId === "string";
  const dateTimeValid = survey.datetime && typeof survey.datetime === "object";
  const repsValid = validSurveyValues.includes(survey.reps);
  const weightValid = validSurveyValues.includes(survey.weight);
  const setsValid = validSurveyValues.includes(survey.sets);
  const restValid = validSurveyValues.includes(survey.rest);
  const difficultyValid = validSurveyValues.includes(survey.difficulty);
  const durationValid = validSurveyValues.includes(survey.duration);
  const distanceValid = validSurveyValues.includes(survey.distance);
    
  const strengthValid =
    survey.reps &&
    survey.weight &&
    survey.sets &&
    survey.rest &&
    !survey.difficulty &&
    !survey.duration &&
    !survey.distance;
  const cardioValid =
    !survey.reps &&
    !survey.weight &&
    !survey.sets &&
    !survey.rest &&
    !survey.difficulty &&
    survey.duration &&
    survey.distance;
  const flexibilityValid =
    !survey.reps &&
    !survey.weight &&
    !survey.sets &&
    !survey.rest &&
    survey.difficulty &&
    survey.duration &&
    !survey.distance;

  if (
    idValid &&
    exerciseIdValid &&
    userIdValid &&
    dateTimeValid &&
    repsValid &&
    weightValid &&
    setsValid &&
    restValid &&
    difficultyValid &&
    durationValid &&
    distanceValid &&
    (strengthValid || cardioValid || flexibilityValid)
  ) {
    return false;
  }
  return true;
}


module.exports = {
  exerciseInvalid,
  userInvalid,
  workoutInvalid,
  surveyInvalid
};
