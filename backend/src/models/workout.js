const Auth0 = require("../auth/auth0Constants");

class Workout {
  constructor(id, userId,exercises, dateCompleted) {
    this.id = id;
    this.userId = userId;
    this.exercises = exercises;
    this.dateCompleted = dateCompleted;
  }

  // Method to convert the workout object to JSON
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      exercises: this.exercises,
      dateCompleted: this.dateCompleted,
      self: this.id == null ? null : `${Auth0.URL}/workouts/${this.id}`,
    };
  }
}

module.exports = Workout;
