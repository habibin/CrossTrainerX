const Auth0 = require("../auth/auth0Constants");

class Exercise {
  constructor(
    id = null,
    name,
    type,
    secondaryType,
    description,
    userId,
    muscleGroup = null,
    equipment = null,
    reps = null,
    sets = null,
    weight = null,
    weightClass = null,
    rest = null,
    duration = null,
    distance = null,
    difficulty = null,
    timesCompleted = 0
  ) {
    this.id = id !== undefined ? id : null;
    this.name = name;
    this.type = type;
    this.secondaryType = secondaryType;
    this.description = description;
    this.userId = userId;
    this.muscleGroup = muscleGroup !== undefined ? muscleGroup : null;
    this.equipment = equipment !== undefined ? equipment : null;
    this.reps = reps !== undefined ? reps : null;
    this.sets = sets !== undefined ? sets : null;
    this.weight = weight !== undefined ? weight : null;
    this.weightClass = weightClass !== undefined ? weightClass : null;
    this.rest = rest !== undefined ? rest : null;
    this.duration = duration !== undefined ? duration : null;
    this.distance = distance !== undefined ? distance : null;
    this.difficulty =
      difficulty !== undefined ? difficulty : null;
    this.timesCompleted = timesCompleted;
  }

  //method to convert the Exercise object to a JSON
  toJSON() {
    switch (this.type) {
      case "Strength":
        return this.strengthJSON();
      case "Cardio":
        return this.cardioJSON();
      case "Flexibility":
        return this.flexibilityJSON();
      default:
        return { Error: "Invalid type specified" };
    }
  }

  // helper method for strength training exercises
  strengthJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      secondaryType: this.secondaryType,
      description: this.description,
      userId: this.userId,
      muscleGroup: this.muscleGroup,
      equipment: this.equipment,
      reps: this.reps,
      sets: this.sets,
      weightClass: this.weightClass,
      weight: this.weight,
      rest: this.rest,
      timesCompleted: this.timesCompleted,
      self: this.id == null ? null : `${Auth0.URL}/exercises/${this.id}`,
    };
  }

  // helper method for cardio exercises
  cardioJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      secondaryType: this.secondaryType,
      description: this.description,
      userId: this.userId,
      duration: this.duration,
      distance: this.distance,
      timesCompleted: this.timesCompleted,
      self: this.id == null ? null : `${Auth0.URL}/exercises/${this.id}`,
    };
  }

  // helper method for flexibility exercises
  flexibilityJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      secondaryType: this.secondaryType,
      description: this.description,
      userId: this.userId,
      duration: this.duration,
      difficulty: this.difficulty,
      timesCompleted: this.timesCompleted,
      self: this.id == null ? null : `${Auth0.URL}/exercises/${this.id}`,
    };
  }
}

module.exports = Exercise;
