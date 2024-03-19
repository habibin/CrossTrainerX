const Auth0 = require("../auth/auth0Constants");

class Survey {
  constructor(
    id,
    exerciseId,
    userId,
    datetime,
    reps = null,
    weight = null,
    sets = null,
    rest = null,
    difficulty = null,
    duration = null,
    distance = null
  ) {
    this.id = id;
    this.exerciseId = exerciseId;
    this.userId = userId;
    this.datetime = datetime;
    this.reps = reps;
    this.weight = weight;
    this.sets = sets;
    this.rest = rest;
    this.difficulty = difficulty;
    this.duration = duration;
    this.distance = distance;
  }

  // Method to convert the survey object to JSON
  toJSON() {
    return {
      id: this.id,
      exerciseId: this.exerciseId,
      userId: this.userId,
      datetime: this.datetime,
      reps: this.reps,
      weight: this.weight,
      sets: this.sets,
      rest: this.rest,
      difficulty: this.difficulty,
      duration: this.duration,
      distance: this.distance,
      self: this.id == null ? null : `${Auth0.URL}/surveys/${this.id}`,
    };
  }
}

module.exports = Survey;
