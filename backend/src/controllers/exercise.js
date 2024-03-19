const db = require("../database/db-connector");
const util = require("util");
const ExerciseModel = require("../models/exercise");

async function createExercise(exercise, callback) {
  try {
    const addExerciseQuery = `INSERT INTO Exercises (name, type, secondary_type, description, user_id, muscle_group, equipment, weight_class)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    db.pool.query(
      addExerciseQuery, [
        exercise.name,
        exercise.type,
        exercise.secondaryType,
        exercise.description,
        exercise.userId,
        exercise.muscleGroup,
        exercise.equipment,
        exercise.weightClass
      ],
      (error, rows, fields) => {
        if (error) {
          callback(error, rows)
        };

        const addUserExerciseQuery = `INSERT INTO UserExercises (exercise_id, user_id, reps, sets, weight, rest, duration, distance, difficulty)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        if (exercise) {
          db.pool.query(
            addUserExerciseQuery,
            [
              rows.insertId,
              exercise.userId,
              exercise.reps,
              exercise.sets,
              exercise.weight,
              exercise.rest,
              exercise.duration,
              exercise.distance,
              exercise.difficulty,
            ],
            (error, rows, fields) => {
              callback(error, rows);
            }
          );
        }
      }
    );
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getExercise(exerciseId, callback) {
  try {
    const getExerciseQuery = `SELECT
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
        ue.times_completed AS timesCompleted
      FROM
          Exercises e
      INNER JOIN UserExercises ue ON e.id = ue.exercise_id
      WHERE
          ue.id = ?;`;
    db.pool.query(getExerciseQuery, [exerciseId], (error, rows, fields) => {
      callback(error, rows[0]);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getAllExercises(userId, callback) {
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
      let responseExercises = [];

      rows.forEach((exercise) => {
        responseExercises.push(
          new ExerciseModel(
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
          )
        );
      })

      callback(error, responseExercises);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

function updateExercise(exercise, callback) {
  try {
    const updateExerciseQuery = `
      UPDATE Exercises 
      SET name = ?,
          type = ?,
          secondary_type = ?,
          description = ?,
          user_id = ?,
          muscle_group = ?,
          equipment = ?,
          weight_class = ?
      WHERE id = (SELECT exercise_id FROM UserExercises WHERE id = ?);
    `;

    db.pool.query(
      updateExerciseQuery,
      [
        exercise.name,
        exercise.type,
        exercise.secondaryType,
        exercise.description,
        exercise.userId,
        exercise.muscleGroup,
        exercise.equipment,
        exercise.weightClass,
        exercise.id,
      ],
      (error, rows, fields) => {
        if (error) {
          callback(error, rows);
        }

      const updateUserExerciseQuery = `
        UPDATE UserExercises
        SET
          reps = ?, 
          sets = ?, 
          weight = ?,
          rest = ?, 
          duration = ?, 
          distance = ?, 
          difficulty = ?, 
          times_completed = ?
        WHERE id = ?;
      `;

        if (exercise) {
          db.pool.query(
            updateUserExerciseQuery,
            [
              exercise.reps,
              exercise.sets,
              exercise.weight,
              exercise.rest,
              exercise.duration,
              exercise.distance,
              exercise.difficulty,
              exercise.timesCompleted,
              exercise.id,
            ],
            (error, rows, fields) => {
              callback(error, rows);
            }
          );
        }
      }
    );
  } catch (e) {
    console.error(e);
    return e;
  }
}

function deleteExercise(userExerciseId, userId, callback) {
  try {
    const getExerciseId = `
    SELECT exercise_id AS exerciseId FROM UserExercises WHERE id = ?`
    db.pool.query(getExerciseId, [userExerciseId], (error, rows, fields) => {
      if (error) {
        callback(error, rows);
      }

      const exerciseId = rows[0].exerciseId;

      const deleteUserExerciseQuery = `
          DELETE FROM UserExercises
          WHERE id = ?;
        `;

      db.pool.query(
        deleteUserExerciseQuery,
        [userExerciseId],
        (error, rows, fields) => {
          if (error) {
            callback(error, rows);
          }

          const deleteExerciseQuery = `
              DELETE FROM Exercises
              WHERE id = ? AND user_id = ?;
            `;

          db.pool.query(
            deleteExerciseQuery,
            [exerciseId, userId],
            (error, rows, fields) => {
              callback(error, rows);
            }
          );
        }
      );
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

function deleteAllUserExercises(userId, callback) {
  try {
    const deleteUserExerciseQuery = `
      DELETE FROM UserExercises
      WHERE user_id = ?;
    `;

    db.pool.query(
      deleteUserExerciseQuery,
      [userId],
      (error, rows, fields) => {
        callback(error, rows);
      }
    );
  } catch (e) {
    console.error(e);
    return e;
  }
}

module.exports = {
  createExercise,
  getExercise,
  getAllExercises,
  updateExercise,
  deleteExercise,
  deleteAllUserExercises,
};
