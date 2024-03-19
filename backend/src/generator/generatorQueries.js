const db = require("../database/db-connector");
const ExerciseModel = require("../models/exercise");

async function getCurrentWorkout(userId) {
  return new Promise((resolve, reject) => {
    try {
      const getWorkoutQuery = `SELECT id, user_id AS userId, exercises, date_completed AS dateCompleted FROM Workouts WHERE user_id = ? ORDER BY id DESC LIMIT 1;`;

      db.pool.query(getWorkoutQuery, [userId], (error, rows) => {
        if (error) {
          console.error(error);
          reject(error);
        }

        rows.length > 0 ? resolve(rows[0]) : resolve(null);
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  });
}

async function getWorkoutCount(userId) {
  return new Promise((resolve, reject) => {
    try {
      const countWorkoutsQuery = `SELECT COUNT(*) AS count FROM Workouts WHERE user_id = ?;`;

      db.pool.query(countWorkoutsQuery, [userId], (error, rows) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }

        rows.length > 0 ? resolve(rows[0].count) : resolve(null);
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  });
}

async function getAllExercises(userId) {
  return new Promise((resolve, reject) => {
    try {
      let queryExercises = `SELECT
        ue.id AS id,
        e.name,
        e.type,
        e.secondary_type AS secondaryType,
        e.description,
        ue.user_id AS userId,
        e.muscle_group AS muscleGroup,
        e.equipment,
        ue.reps,
        ue.sets,
        ue.weight,
        e.weight_class AS weightClass,
        ue.rest,
        ue.duration,
        ue.distance,
        ue.difficulty,
        ue.times_completed
      FROM
          Exercises e
      INNER JOIN UserExercises ue ON e.id = ue.exercise_id
      WHERE
          ue.user_id = ?;`;

      db.pool.query(queryExercises, [userId], (error, rows, fields) => {
        if (error) {
          console.error(error);
          reject(error); // Reject the Promise with the error
          return;
        }

        const responseExercises = rows.map((exercise) => {
          return new ExerciseModel(
            exercise.id,
            exercise.name,
            exercise.type,
            exercise.secondaryType,
            exercise.description,
            exercise.userId,
            exercise.muscleGroup,
            exercise.weightClass,
            exercise.equipment,
            exercise.reps,
            exercise.sets,
            exercise.weight,
            exercise.rest,
            exercise.duration,
            exercise.distance,
            exercise.difficulty,
            exercise.timesCompleted
          );
        });

        resolve(responseExercises);
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  });
}

async function getAllUserTrackExercises(primaryTrack, secondaryTrack, experience) {
  return new Promise((resolve, reject) => {
    try {
      let queryExercises, queryParameters;
      if (primaryTrack == "Strength") {
        if (experience) {
          queryExercises = `SELECT
            ue.id AS id,
            e.name,
            e.type,
            e.secondary_type AS secondaryType,
            e.description,
            ue.user_id AS userId,
            e.muscle_group AS muscleGroup,
            e.equipment,
            ue.reps,
            ue.sets,
            ue.weight,
            e.weight_class AS weightClass,
            ue.rest,
            ue.duration,
            ue.distance,
            ue.difficulty,
            ue.times_completed
          FROM
              Exercises e
          INNER JOIN UserExercises ue ON e.id = ue.exercise_id
          WHERE
              ue.user_id IS NULL AND
              e.type = ? AND
              ue.experience = ?;`;
          queryParameters = [primaryTrack, experience];
        } else {
          queryExercises = `SELECT
            ue.id AS id,
            e.name,
            e.type,
            e.secondary_type AS secondaryType,
            e.description,
            ue.user_id AS userId,
            e.muscle_group AS muscleGroup,
            e.equipment,
            ue.reps,
            ue.sets,
            ue.weight,
            e.weight_class AS weightClass,
            ue.rest,
            ue.duration,
            ue.distance,
            ue.difficulty,
            ue.times_completed
          FROM
              Exercises e
          INNER JOIN UserExercises ue ON e.id = ue.exercise_id
          WHERE
              ue.user_id IS NULL AND
              e.type = ? AND
              ue.experience = 1;`;
          queryParameters = [primaryTrack];
        }
      } else if (primaryTrack == "Cardio") {
          if (experience) {
            queryExercises = `SELECT
              ue.id AS id,
              e.name,
              e.type,
              e.secondary_type AS secondaryType,
              e.description,
              ue.user_id AS userId,
              e.muscle_group AS muscleGroup,
              e.equipment,
              ue.reps,
              ue.sets,
              ue.weight,
              e.weight_class AS weightClass,
              ue.rest,
              ue.duration,
              ue.distance,
              ue.difficulty,
              ue.times_completed
            FROM
                Exercises e
            INNER JOIN UserExercises ue ON e.id = ue.exercise_id
            WHERE
                ue.user_id IS NULL AND
                e.type = ? AND
                e.secondary_type = ? AND
                ue.experience = ?;`;
            queryParameters = [primaryTrack, secondaryTrack, experience];
        } else {
          queryExercises = `SELECT
            ue.id AS id,
            e.name,
            e.type,
            e.secondary_type AS secondaryType,
            e.description,
            ue.user_id AS userId,
            e.muscle_group AS muscleGroup,
            e.equipment,
            ue.reps,
            ue.sets,
            ue.weight,
            e.weight_class AS weightClass,
            ue.rest,
            ue.duration,
            ue.distance,
            ue.difficulty,
            ue.times_completed
          FROM
              Exercises e
          INNER JOIN UserExercises ue ON e.id = ue.exercise_id
          WHERE
              ue.user_id IS NULL AND
              e.type = ? AND
              e.secondary_type = ?
              ue.experience = 1;`;
          queryParameters = [primaryTrack, secondaryTrack];
        }
      } else {
        queryExercises = `SELECT
          ue.id AS id,
          e.name,
          e.type,
          e.secondary_type AS secondaryType,
          e.description,
          ue.user_id AS userId,
          e.muscle_group AS muscleGroup,
          e.equipment,
          ue.reps,
          ue.sets,
          ue.weight,
          e.weight_class AS weightClass,
          ue.rest,
          ue.duration,
          ue.distance,
          ue.difficulty,
          ue.times_completed
        FROM
            Exercises e
        INNER JOIN UserExercises ue ON e.id = ue.exercise_id
        WHERE
            ue.user_id IS NULL AND
            e.type = ? AND
            e.secondary_type = ?;`;
        queryParameters = [primaryTrack, secondaryTrack];
      }

      db.pool.query(
        queryExercises,
        queryParameters,
        (error, rows, fields) => {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }

          const responseExercises = rows.map((exercise) => {
            return new ExerciseModel(
              exercise.id,
              exercise.name,
              exercise.type,
              exercise.secondaryType,
              exercise.description,
              exercise.userId,
              exercise.muscleGroup,
              exercise.weightClass,
              exercise.equipment,
              exercise.reps,
              exercise.sets,
              exercise.weight,
              exercise.rest,
              exercise.duration,
              exercise.distance,
              exercise.difficulty,
              exercise.timesCompleted
            );
          });

          resolve(responseExercises);
        }
      );
    } catch (e) {
      console.error(e);
      return e;
    }
  });
}

module.exports = {
  getCurrentWorkout,
  getAllExercises,
  getWorkoutCount,
  getAllUserTrackExercises,
};
