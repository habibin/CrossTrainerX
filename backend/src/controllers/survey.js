const db = require("../database/db-connector");
const SurveyModel = require("../models/survey");

async function createSurvey(survey, callback) {
  try {
    const addSurveyQuery = `INSERT INTO Surveys (exercise_id, user_id, datetime, reps, weight, sets, rest, difficulty, duration, distance)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    db.pool.query(
      addSurveyQuery,
      [
        survey.exerciseId,
        survey.userId,
        survey.datetime,
        survey.reps,
        survey.weight,
        survey.sets,
        survey.rest,
        survey.difficulty,
        survey.duration,
        survey.distance
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

async function getSurvey(surveyId, callback) {
  try {
    const getSurveyQuery = `SELECT
        id,
        exercise_id AS exerciseId,
        user_id AS userId,
        datetime,
        reps AS reps,
        weight,
        sets,
        rest,
        difficulty,
        duration,
        distance
      FROM
          Surveys
      WHERE
          id = ?;`;
    db.pool.query(getSurveyQuery, [surveyId], (error, rows, fields) => {
      callback(error, rows[0]);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getAllSurveys(surveyId, callback) {
  try {
    const getAllSurveysQuery = `SELECT
        id,
        exercise_id AS exerciseId,
        user_id AS userId,
        datetime,
        reps,
        weight,
        sets,
        rest,
        difficulty,
        duration,
        distance
      FROM
        Surveys
      ;`;
    db.pool.query(getAllSurveysQuery, [surveyId], (error, rows, fields) => {
      let responseSurveys = [];

      rows.forEach((survey) => {
        responseSurveys.push(
          new SurveyModel(
            survey.id,
            survey.exerciseId,
            survey.userId,
            survey.datetime,
            survey.reps,
            survey.weight,
            survey.sets,
            survey.rest,
            survey.difficulty,
            survey.duration,
            survey.distance
          )
        );
      });

      callback(error, responseSurveys);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

function updateSurvey(survey, callback) {
  try {
    const updateSurveyQuery = `
      UPDATE Surveys 
      SET exercise_id = ?,
          user_id = ?,
          datetime = ?,
          reps = ?,
          weight = ?,
          sets = ?,
          rest = ?,
          difficulty = ?,
          duration = ?,
          distance = ?,
      WHERE id = ?;
    `;

    db.pool.query(
      updateSurveyQuery,
      [
        survey.exerciseId,
        survey.userId,
        survey.datetime,
        survey.reps,
        survey.weight,
        survey.sets,
        survey.rest,
        survey.difficulty,
        survey.duration,
        survey.distance,
        survey.id
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

function deleteSurvey(surveyId, callback) {
  try {
    const deleteSurveyId = `
    DELETE FROM Surveys WHERE id = ?`;
    db.pool.query(deleteSurveyId, [surveyId], (error, rows, fields) => {
      callback(error, rows);
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

module.exports = {
  createSurvey,
  getSurvey,
  getAllSurveys,
  updateSurvey,
  deleteSurvey,
};
