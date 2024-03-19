const db = require("../database/db-connector");
const util = require("util");
const WorkoutModel = require("../models/workout");

async function createWorkout(workout, callback) {
  try {
    const addWorkoutQuery = `INSERT INTO Workouts (user_id, exercises, date_completed)
      VALUES (?, ?, ?);`;

    db.pool.query(
      addWorkoutQuery,
      [
        workout.userId,
        JSON.stringify(workout.exercises),
        workout.dateCompleted
      ],
      (error, rows, fields) => {
        callback(error, rows);
      }
    );
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getWorkout(workoutId, callback) {
  try {
    const getWorkoutQuery = `SELECT id, user_id AS userId, exercises, date_completed AS dateCompleted FROM Workouts WHERE id = ?;`;
    db.pool.query(getWorkoutQuery, [workoutId], (error, rows, fields) => {
      callback(error, rows.length > 0 ? rows[0] : null);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getCurrentWorkout(userId, callback) {
  try {
    const getWorkoutQuery = `SELECT id, user_id AS userId, exercises, date_completed AS dateCompleted FROM Workouts WHERE user_id = ? ORDER BY id DESC LIMIT 1;`;
    db.pool.query(getWorkoutQuery, [userId], (error, rows, fields) => {
      callback(error, rows);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getAllWorkouts(userId, callback) {
  try {
    const getAllWorkoutsQuery = `SELECT id, user_id AS userId, exercises, date_completed AS dateCompleted FROM Workouts WHERE user_id = ?;`;
    db.pool.query(getAllWorkoutsQuery, [userId], (error, rows, fields) => {
      let responseWorkouts = [];

      rows.forEach((workout) => {
        responseWorkouts.push(
          new WorkoutModel(
            workout.id,
            workout.userId,
            JSON.parse(workout.exercises),
            workout.dateCompleted,
            workout.userId
          )
        );
      });

      callback(error, responseWorkouts);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

function updateWorkout(workoutId, exercises, dateCompleted, callback) {
  try {
      const updateWorkoutQuery = `
        UPDATE Workouts 
        SET exercises = ?,
          date_completed = ?
        WHERE id = ?;
      `;

      db.pool.query(
        updateWorkoutQuery,
        [JSON.stringify(exercises), dateCompleted, workoutId],
        (error, rows, fields) => {
          callback(error, rows);
        }
      );
  } catch (e) {
    console.error(e);
    return e;
  }
}

function deleteWorkout(workoutId, userId, callback) {
  try {
    const deleteWorkoutQuery = `
      DELETE FROM Workouts
      WHERE id = ? AND user_id = ?;
    `;

    db.pool.query(
      deleteWorkoutQuery,
      [workoutId, userId],
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
  createWorkout,
  getWorkout,
  getAllWorkouts,
  getCurrentWorkout,
  updateWorkout,
  deleteWorkout,
};
