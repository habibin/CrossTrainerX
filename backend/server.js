const Auth = require("./src/auth/auth");
const Auth0 = require("./src/auth/auth0Constants");

const ExerciseModel = require("./src/models/exercise");
const WorkoutModel = require("./src/models/workout");
const UserModel = require("./src/models/user");
const SurveyModel = require("./src/models/survey");

const ExerciseController = require("./src/controllers/exercise");
const WorkoutController = require("./src/controllers/workout");
const UserController = require("./src/controllers/user");
const SurveyController = require("./src/controllers/survey");

const HeaderValidation = require("./src/validation/headerValidation");
const ModelValidator = require("./src/validation/modelValidation");

const ExerciseUpdater = require("./src/generator/exerciseUpdater");
const GeneratorQueries = require("./src/generator/generatorQueries");
const GeneratorControllers = require("./src/generator/generatorControllers");

const express = require("express");
const bodyParser = require("body-parser");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());


// JWT checker for ensuring authorization on all endpoints
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${Auth0.OAUTH_DOMAIN}/.well-known/jwks.json`,
  }),
  issuer: `https://${Auth0.OAUTH_DOMAIN}/`,
  algorithms: ["RS256"],
});

function handleError(error, res) {
  console.error(error);
  res.status(500).json({ Error: "Internal server error" });
  return
}

// GET / welcome to the app
app.get("/", function (req, res) {
  res.status(200).send("Welcome to CrossTrainerX! Please send a POST request to the /login endpoint to get started.");
});

/*
###################################
##### AUTHORIZATION ENDPOINTS #####
###################################
*/

// POST /login endpoint which generates a new state and redirects to Auth0 to request an auth code
app.post("/login", (req, res) => {
  try {
    const stateHandler = (error, state) => {
      if (error) {
        handleError(error, res);
        return res.end();
      } else {
        res.send(
          `https://${Auth0.OAUTH_DOMAIN}/authorize?response_type=code&client_id=${Auth0.OAUTH_CLIENT_ID}&redirect_uri=${Auth0.URL}/oauth&scope=openid%20profile%20email&state=${state}`
        );
      }
    };

    Auth.createState(stateHandler);
  } catch (e) {
    console.error(e);
  }
});


// GET /oauth endpoint, which verifies the state is valid and requests the JWT using the auth code
app.get("/oauth", async (req, res) => {
  try {
    if (await Auth.stateExists(req.query.state)) {
      const tokenData = await Auth.retrieveJwt(req.query.code);
      const bearerToken = tokenData.id_token;
      const userId = Auth.extractSubFromJwt(bearerToken);
      //AuthUser.addUser(userId);

      const responseData = {
        token: tokenData.id_token,
        token_type: tokenData.token_type,
        expires: tokenData.expires_in,
        user: userId,
      };
      res.json(responseData);
    } else {
      const errorMsg = { Error: "The provided state is invalid. " };
      res.status(400).json(errorMsg);
    }
  } catch (e) {
    handleError(e, res);
  }
});

/*
##############################
##### EXERCISE ENDPOINTS #####
##############################
*/

/*
### /exercises ###
*/

// POST /exercises endpoint, adds exercise to database
app.post("/exercises", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const newExercise = new ExerciseModel(
      "id",
      req.body.name,
      req.body.type,
      req.body.secondaryType,
      req.body.description,
      Auth.extractSubFromJwt(req.headers.authorization),
      req.body.muscleGroup,
      req.body.equipment,
      req.body.reps,
      req.body.sets,
      req.body.weight,
      req.body.weightClass,
      req.body.rest,
      req.body.duration,
      req.body.distance,
      req.body.difficulty
    );

    if (ModelValidator.exerciseInvalid(newExercise)) {
      res.status(400).json({ Error: "The exercise request data is invalid" });
    } else {
      let responseHandler = (error, data) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            newExercise.id = data.insertId;
            res.status(201).json(newExercise.toJSON());
          }
        } catch (e) {
          handleError(e, res);
          return res.end();
        }
      };

      ExerciseController.createExercise(newExercise, responseHandler);
    }
  } catch (e) {
    handleError(e, res);
  }
});

// POST /exercises - this endpoint is not allowed
app.post("/exercises", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// GET /exercises endpoint, retrieves all exercises from database
app.get("/exercises", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    let responseHandler = (error, data) => {
      try {
        if (error) {
          handleError(error, res);
        } else {
          res.status(200).json(data);
        }
      } catch (e) {
        handleError(e, rs);
      }
    };

    ExerciseController.getAllExercises(
      Auth.extractSubFromJwt(req.headers.authorization),
      responseHandler
    );
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /exercises - this endpoint is not allowed
app.patch("/exercises", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /exercises - this endpoint is not allowed
app.put("/exercises", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /exercises - this endpoint is not allowed
app.delete("/exercises", checkJwt, function (req, res) {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

/*
### /exercises/:exerciseID ###
*/

// GET /exercises/:exerciseID endpoint, retrieves specified exercise from database
app.get("/exercises/:exerciseId", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const responseHandler = (error, exercise) => {      
      try {
        if (error) {
          handleError(error, res);
          return res.end();
        }
        if (!exercise) {
          res
            .status(404)
            .json({ Error: "No exercise with this exerciseId exists" });
          return res.end();
        }

        if (
          exercise.userId && exercise.userId != Auth.extractSubFromJwt(req.headers.authorization)
        ) {
          res.status(401).json({
            Error:
              "Access denied: this exercise does not belong to the current user",
          });
          return res.end();
        }
        const newExercise = new ExerciseModel(
          exercise.id,
          exercise.name,
          exercise.type,
          exercise.secondaryType,
          exercise.description,
          exercise.userId,
          exercise.muscleGroup,
          exercise.equipment,
          exercise.reps,
          exercise.sets,
          exercise.weight,
          exercise.weightClass,
          exercise.rest,
          exercise.duration,
          exercise.distance,
          exercise.difficulty
        );

        res.status(200).json(newExercise.toJSON()).end();
      } catch (e) {
        handleError(e, res);
      }
    };

    ExerciseController.getExercise(req.params.exerciseId, responseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /exercises/:exerciseId - this endpoint is not allowed
app.put("/exercises/:exerciseId", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /exercises/:exerciseId endpoint, updates an exercise
app.patch("/exercises/:exerciseId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const getResponseHandler = (error, exercise) => {
      if (error) {
        handleError(error, res);
        return res.end();
      }

      if (!exercise) {
        res
          .status(404)
          .json({ Error: "No exercise with this id exists" });
        return res.end();
      }

      const updatedExercise = new ExerciseModel(
        req.params.exerciseId,
        req.body.name,
        req.body.type,
        req.body.secondaryType,
        req.body.description,
        exercise.userId,
        req.body.muscleGroup,
        req.body.equipment,
        req.body.reps,
        req.body.sets,
        req.body.weight,
        req.body.weightClass,
        req.body.rest,
        req.body.duration,
        req.body.distance,
        req.body.difficulty,
        req.body.timesCompleted
      );

      if (ModelValidator.exerciseInvalid(updatedExercise)) {
        res.status(400).json({ Error: "The exercise request data is invalid" });
        return res.end();
      }

      if (
        updatedExercise.userId &&
        updatedExercise.userId !=
          Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        res.status(401).json({
          Error:
            "Access denied: this exercise does not belong to the current user",
        });
        return res.end();
      }
      
      let updateResponseHandler = (error, _) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            res.status(200).json(updatedExercise.toJSON());
            return res.end();
          }
        } catch (e) {
          handleError(e, res);
        }
      }


      ExerciseController.updateExercise(
        updatedExercise,
        updateResponseHandler
      );
    };

    ExerciseController.getExercise(req.params.exerciseId, getResponseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /exercises/:exerciseId endpoint, deletes specified exercise from database
app.delete("/exercises/:exerciseId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const getResponseHandler = (error, exercise) => {
      if (error) {
        handleError(e, res);
        return res.end();
      }

      if (!exercise) {
        res
          .status(404)
          .json({ Error: "No exercise with this exerciseId exists" });
        return res.end();
      }

      if (
        exercise.userId && exercise.userId != Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        res.status(401).json({
          Error:
            "Access denied: this exercise does not belong to the current user",
        });
        return res.end();
      }

      const deleteResponseHandler = (error, _) => {
        try {
          if (error) {
            handleError(error, res);
            return res.end();
          }
          res.status(204).end();
        } catch (e) {
          handleError(e, res);
        }
      };

      ExerciseController.deleteExercise(
        req.params.exerciseId,
        exercise.userId,
        deleteResponseHandler
      );
    };

    ExerciseController.getExercise(req.params.exerciseId, getResponseHandler);
  } catch (e) {
    handleError(e, res);
  }
});


/*
##############################
##### WORKOUT ENDPOINTS #####
##############################
*/

/*
### /workouts ###
*/

// POST /workouts endpoint, adds workout to database
app.post("/workouts", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    if (!req.body.exercises) {
      return res
        .status(400)
        .json({
          Error:
            "The request object is missing at least one of the required attributes",
        });
    }

    const getExercise = (exerciseId) => {
      return new Promise((resolve, reject) => {
        ExerciseController.getExercise(exerciseId, (error, exercise) => {
          if (error) {
            reject(error);
          } else {
            resolve(exercise);
          }
        });
      });
    };

    const exercisePromises = req.body.exercises.map(exerciseId => getExercise(exerciseId));

    const exercises = await Promise.all(exercisePromises)
      .then((exercisesData) => {
        const results = {};
        exercisesData.forEach((exercise) => {
          if (exercise) {
            results[`${exercise.id}`] = exercise;
          }
        });
        return results;
      })
      .catch(error => {
        return handleError(error, res);
      });

    for (const exercise in exercises) {
      if (
        exercises[exercise] &&
        exercises[exercise].userId !=
          Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        return res.status(401).json({
          Error:
            "Access denied: one or more of these excercises does not belong to the current user",
        });
      }
    };

    if (!exercises || (req.body.exercises.length != (Object.keys(exercises)).length)) {
      return res.status(404).json({
        Error: "One or more of the exercises in the request do not exist",
      });
    }

    const newWorkout = new WorkoutModel(
      1,
      Auth.extractSubFromJwt(req.headers.authorization),
      exercises,
      null
    );

    if (ModelValidator.workoutInvalid(newWorkout)) {
      return res
        .status(400)
        .json({
          Error:
            "The request object is missing at least one of the required attributes",
        });
    } else {
      let responseHandler = (error, data) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            newWorkout.id = data.insertId;
            return res.status(201).json(newWorkout.toJSON());
          }
        } catch (e) {
          return handleError(e, res);
        }
      };

      WorkoutController.createWorkout(newWorkout, responseHandler);
    }
  } catch (e) {
    return handleError(e, res);
  }
});


// GET /workouts endpoint, retrieves all workouts from database
app.get("/workouts", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    let responseHandler = (error, workouts) => {
      try {
        if (error) {
          handleError(error, res);
        } else {
          res.status(200).json(workouts);
        }
      } catch (e) {
        handleError(e, res);
      }
    };

    WorkoutController.getAllWorkouts(
      Auth.extractSubFromJwt(req.headers.authorization),
      responseHandler
    );
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /workouts - this endpoint is not allowed
app.patch("/workouts", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /workouts - this endpoint is not allowed
app.put("/workouts", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /workouts - this endpoint is not allowed
app.delete("/workouts", checkJwt, function (req, res) {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

/*
##### /workouts/:workoutId #####
*/

// GET /workouts endpoint, retrieves specified workout from database
app.get("/workouts/:workoutId", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const responseHandler = (error, workout) => {      
      try {
        if (error) {
          handleError(error, res);
          return res.end();
        }
        if (!workout) {
          res
            .status(404)
            .json({ Error: "No workout with this id exists" });
          return res.end();
        }

        if (
          workout.userId && workout.userId != Auth.extractSubFromJwt(req.headers.authorization)
        ) {
          res.status(401).json({
            Error:
              "Access denied: this workout does not belong to the current user",
          });
          return res.end();
        }
        const newWorkout = new WorkoutModel(
          workout.id,
          workout.userId,
          JSON.parse(workout.exercises),
          workout.dateCompleted
        );

        res.status(200).json(newWorkout.toJSON()).end();
      } catch (e) {
        handleError(e, res);
      }
    };

    WorkoutController.getWorkout(req.params.workoutId, responseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /workouts - this endpoint is not allowed
app.put("/workouts/:workoutId", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /workouts endpoint, updates an workout
app.patch("/workouts/:workoutId", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    if (!req.body.exercises && !req.body.dateCompleted) {
      return res.status(400).json({
        Error:
          "The request object contains no valid attributes",
      });
    }

    const getWorkoutHandler = async (error, workout) => {
      if (error) {
        handleError(e, res);
        return res.end();
      }

      if (!workout) {
        return res.status(404).json({
          Error: "No workout with this workoutId exists",
        });
      }

      const updatedWorkout = new WorkoutModel(
        workout.id,
        workout.userId,
        JSON.parse(workout.exercises),
        req.body.dateCompleted ? req.body.dateCompleted : workout.dateCompleted
      );

      let exercises = null;

      if (req.body.exercises) {
        const getExercise = (exerciseId) => {
          return new Promise((resolve, reject) => {
            ExerciseController.getExercise(exerciseId, (error, exercise) => {
              if (error) {
                reject(error);
              } else {
                resolve(exercise);
              }
            });
          });
        };

        const exercisePromises = req.body.exercises.map((exerciseId) =>
          getExercise(exerciseId)
        );

        exercises = await Promise.all(exercisePromises)
          .then((exercisesData) => {
            const results = {};
            exercisesData.forEach((exercise) => {
              if (exercise) {
                results[`${exercise.id}`] = exercise;
              }
            });
            return results;
          })
          .catch((error) => {
            return handleError(error, res);
          });

        for (const exercise in exercises) {
          if (
            exercises[exercise] &&
            exercises[exercise].userId !=
              Auth.extractSubFromJwt(req.headers.authorization)
          ) {
            return res.status(401).json({
              Error:
                "Access denied: one or more of these excercises does not belong to the current user",
            });
          }
        }

        if (
          !exercises ||
          req.body.exercises.length != Object.keys(exercises).length
        ) {
          return res.status(404).json({
            Error: "One or more of the exercises in the request do not exist",
          });
        }

        updatedWorkout.exercises = exercises;
      }

      if (ModelValidator.workoutInvalid(updatedWorkout)) {
        return res.status(400).json({
          Error:
            "The request object is missing at least one of the required attributes",
        });
      } else {
        let responseHandler = (error, data) => {
          try {
            if (error) {
              handleError(error, res);
            } else {
              return res.status(201).json(updatedWorkout.toJSON());
            }
          } catch (e) {
            return handleError(e, res);
          }
        };

        WorkoutController.updateWorkout(
          parseInt(req.params.workoutId, 10),
          exercises,
          updatedWorkout.dateCompleted,
          responseHandler
        );
      }
    };

    WorkoutController.getWorkout(req.params.workoutId, getWorkoutHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /workouts endpoint, deletes specified workout from database
app.delete("/workouts/:workoutId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const getResponseHandler = (error, workout) => {
      if (error) {
        handleError(e, res);
        return res.end();
      }

      if (workout && workout.userId != Auth.extractSubFromJwt(req.headers.authorization)) {
        res.status(401).json({
          Error:
            "Access denied: this workout does not belong to the current user",
        });
        return res.end();
      }

      if (!workout) {
        res
          .status(404)
          .json({ Error: "No workout with this id exists" });
        return res.end();
      }

      const deleteResponseHandler = (error, _) => {
        try {
          if (error) {
            handleError(error, res);
            return res.end();
          }
          res.status(204).end();
        } catch (e) {
          handleError(e, res);
        }
      };

      WorkoutController.deleteWorkout(
        req.params.workoutId,
        workout.userId,
        deleteResponseHandler
      );
    };

    WorkoutController.getWorkout(req.params.workoutId, getResponseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// POST /workouts - this endpoint is not allowed
app.post("/workouts/:workoutId", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

/*
### /current_workouts ###
*/

// POST /current_workouts - this endpoint is not allowed
app.post("/current_workout", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// GET /current_workout endpoint, retrieves current workout from database
app.get("/current_workout", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const userId = Auth.extractSubFromJwt(req.headers.authorization);
    let [exercises, currentWorkout, workoutCount] = await Promise.all([
      GeneratorQueries.getAllExercises(userId),
      GeneratorQueries.getCurrentWorkout(userId),
      GeneratorQueries.getWorkoutCount(userId),
    ]);

    exercises = exercises ? exercises : null;
    const exerciseMap = exercises ? await GeneratorControllers.mapExercises(exercises) : null;

    if (currentWorkout.dateCompleted != null) {
      const newWorkout = new WorkoutModel(
        1,
        Auth.extractSubFromJwt(req.headers.authorization),
        await GeneratorControllers.generateWorkout(exerciseMap, workoutCount),
        null
      );

      let responseHandler = (error, data) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            newWorkout.id = data.insertId;
            res.status(200).json(newWorkout.toJSON());
            res.end();
          }
        } catch (e) {
          return handleError(e, res);
        }
      };

      WorkoutController.createWorkout(newWorkout, responseHandler);
    } else {
      if (
        currentWorkout.userId &&
        currentWorkout.userId !=
          Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        res.status(401).json({
          Error:
            "Access denied: this workout does not belong to the current user",
        });
        return res.end();
      }
      const currentWorkoutModel = new WorkoutModel(
        currentWorkout.id,
        currentWorkout.userId,
        JSON.parse(currentWorkout.exercises),
        currentWorkout.dateCompleted
      );
      res.status(200).json(currentWorkoutModel).end();
    }
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /current_workout - this endpoint is not allowed
app.put("/current_workout", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /current_workout - this endpoint is not allowed
app.patch("/current_workout", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /current_workout - this endpoint is not allowed
app.delete("/current_workout", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

/*
### /workouts/:workoutId/exercises/:exerciseId ###
*/

// POST /workouts/:workoutId/exercises/:exerciseId endpoint, retrieves specified exercise from database
app.post("/workouts/:workoutId/exercises/:exerciseId", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const exerciseResponseHandler = (error, exercise) => {      
      try {
        if (error) {
          handleError(error, res);
          return res.end();
        }
        if (!exercise) {
          res
            .status(404)
            .json({ Error: "No exercise with this exerciseId exists" });
          return res.end();
        }

        if (
          exercise.userId && exercise.userId != Auth.extractSubFromJwt(req.headers.authorization)
        ) {
          res.status(401).json({
            Error:
              "Access denied: this exercise does not belong to the current user",
          });
          return res.end();
        }
        const newExercise = new ExerciseModel(
          exercise.id,
          exercise.name,
          exercise.type,
          exercise.secondaryType,
          exercise.description,
          exercise.userId,
          exercise.muscleGroup,
          exercise.equipment,
          exercise.reps,
          exercise.sets,
          exercise.weight,
          exercise.weightClass,
          exercise.rest,
          exercise.duration,
          exercise.distance,
          exercise.difficulty
        );

        res.status(200).json(newExercise.toJSON()).end();
      } catch (e) {
        handleError(e, res);
      }
    };

    ExerciseController.getExercise(
      req.params.exerciseId,
      exerciseResponseHandler
    );
  } catch (e) {
    handleError(e, res);
  }
});

/*
##############################
###### USERS  ENDPOINTS ######
##############################
*/

/*
### /users ###
*/

// POST /users - this endpoint adds a new user
app.post("/users", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const newUser = new UserModel(
      1,
      Auth.extractSubFromJwt(req.headers.authorization),
      req.body.email,
      req.body.avatarId,
      req.body.firstName,
      req.body.lastName,
      req.body.city,
      req.body.state,
      req.body.age,
      req.body.gender,
      req.body.weight,
      req.body.height,
      req.body.fitnessTrack,
      req.body.secondaryTrack
    ); 
  
    if (ModelValidator.userInvalid(newUser)) {
      res.status(400).json({ Error: "The user request data is invalid" });
    } else {
      let responseHandler = async (error, data) => {
        try {
          if (error) {
            if (error.code == 'ER_DUP_ENTRY') {
              res
                .status(400)
                .json({ Error: "A user already exists for this Auth0 account." });

            } else {
              handleError(error, res);
              return res.end();
            };
          } else {
            newUser.id = data.insertId;
            const [userExercises] = await Promise.all([
              GeneratorQueries.getAllUserTrackExercises(
                newUser.fitnessTrack,
                newUser.secondaryTrack,
                req.body.experience
              ),
            ]);

            userExercises.forEach((exercise) => {
              exercise.userId = Auth.extractSubFromJwt(req.headers.authorization)
              const responseHandler = async (error, data)  => {
                try {
                  if (error) {
                    handleError(error, res);
                    return res.end();
                  }
                } catch (e) {
                  handleError(e, res);
                  return res.end();
                }
              }

              ExerciseController.createExercise(exercise, responseHandler);
            })
            res.status(201).json(newUser.toJSON());
          }
        } catch (e) {
          handleError(e, res);
          return res.end();
        }
      };

      UserController.createUser(newUser, responseHandler);
    }
  } catch (e) {
    handleError(e, res);
  }
});

// GET /users endpoint, retrieves all users from database
app.get("/users", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    let responseHandler = (error, users) => {
      try {
        if (error) {
          handleError(error, res);
        } else {
          res.status(200).json(users);
        }
      } catch (e) {
        handleError(e, res);
      }
    };

    UserController.getAllUsers(
      Auth.extractSubFromJwt(req.headers.authorization),
      responseHandler
    );
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /users - this endpoint is not allowed
app.put("/users", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /users - this endpoint is not allowed
app.patch("/users", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /users - this endpoint is not allowed
app.delete("/users", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

/*
### /users/:userId ###
*/

// POST /users - this endpoint is not allowed
app.post("/users/:userId", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// GET /users/:userId endpoint, retrieves specified user from database
app.get("/users/:userId", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const responseHandler = (error, user) => {      
      try {
        if (error) {
          handleError(error, res);
          return res.end();
        }
        if (!user) {
          res
            .status(404)
            .json({ Error: "No user with this id exists" });
          return res.end();
        }

        if (
          user.userId && user.userId != Auth.extractSubFromJwt(req.headers.authorization)
        ) {
          res.status(401).json({
            Error:
              "Access denied: this user is not the current user",
          });
          return res.end();
        }
        const userResponse = new UserModel(
          user.id,
          user.userId,
          user.email,
          user.avatarId,
          user.firstName,
          user.lastName,
          user.city,
          user.state,
          user.age,
          user.gender,
          user.weight,
          user.height,
          user.fitnessTrack,
          user.secondaryTrack
        );

        res.status(200).json(userResponse.toJSON()).end();
      } catch (e) {
        handleError(e, res);
      }
    };

    UserController.getUser(req.params.userId, responseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /users endpoint, updates a user
app.patch("/users/:userId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const getResponseHandler = (error, user) => {
      if (error) {
        handleError(error, res);
        return res.end();
      }

      if (!user) {
        res
          .status(404)
          .json({ Error: "No user with this id exists" });
        return res.end();
      }

      const updatedUser = new UserModel(
        1,
        user.userId,
        req.body.email,
        req.body.avatarId,
        req.body.firstName,
        req.body.lastName,
        req.body.city,
        req.body.state,
        req.body.age,
        req.body.gender,
        req.body.weight,
        req.body.height,
        req.body.fitnessTrack,
        req.body.secondaryTrack
      );

      if (ModelValidator.userInvalid(updatedUser)) {
        res.status(400).json({ Error: "The user request data is invalid" });
        return res.end();
      }

      if (
        updatedUser.userId &&
        updatedUser.userId !=
          Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        res.status(401).json({
          Error:
            "Access denied: this user is not the current user",
        });
        return res.end();
      }
      
      let updateResponseHandler = (error, dbUser) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            updatedUser.userId = dbUser.userId;
            updatedUser.email = dbUser.email;
            updatedUser.avatarId = dbUser.avatarId;
            updatedUser.firstName = dbUser.firstName;
            updatedUser.lastName = dbUser.lastName;
            updatedUser.city = dbUser.city;
            updatedUser.state = dbUser.state;
            updatedUser.age = dbUser.age;
            updatedUser.gender = dbUser.gender;
            updatedUser.weight = dbUser.weight;
            updatedUser.height = dbUser.height;
            updatedUser.fitnessTrack = dbUser.fitnessTrack;
            updatedUser.secondaryTrack = dbUser.secondaryTrack;

            res.status(200).json(updatedUser.toJSON());
            return res.end();
          }
        } catch (e) {
          handleError(e, res);
        }
      }

      UserController.updateUser(
        updatedUser,
        updateResponseHandler
      );
    };

    UserController.getUser(req.params.userId, getResponseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /users - this endpoint is not allowed
app.put("/users/:userId", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /users endpoint, deletes specified workout from database
app.delete("/users/:userId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const getUsereHandler = (error, user) => {
      if (error) {
        handleError(e, res);
        return res.end();
      }

      if (
        user &&
        user.userId != Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        res.status(401).json({
          Error:
            "Access denied: this user is not the current user",
        });
        return res.end();
      }

      if (!user) {
        res
          .status(404)
          .json({ Error: "No user with this id exists" });
        return res.end();
      }

      const deleteUserExercisesHandler = (error, exercises) => {
        try {
          if (error) {
            handleError(error, res);
            return res.end();
          }
        
          const deleteUserHandler = (error, _) => {
            try {
              if (error) {
                handleError(error, res);
                return res.end();
              }
              res.status(204).end();
            } catch (e) {
              handleError(e, res);
            }
          };
          
          UserController.deleteUser(req.params.userId, deleteUserHandler);
        } catch (e) {
          handleError(e, res);
        }
      }
      
      ExerciseController.deleteAllUserExercises(
        req.params.userId,
        deleteUserExercisesHandler
      );
    }

    UserController.getUser(req.params.userId, getUsereHandler);
  } catch (e) {
    handleError(e, res);
  }
});

/*
##############################
##### SURVEY ENDPOINTS #####
##############################
*/

/*
### /surveys ###
*/

// POST /surveys endpoint, adds survey to database
app.post("/surveys", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const getResponseHandler = (error, exercise) => {
      if (error) {
        handleError(error, res);
        return res.end();
      }

      if (!exercise) {
        res.status(404).json({ Error: "No exercise with this id exists" });
        return res.end();
      }

      const newSurvey = new SurveyModel(
        1,
        req.body.exerciseId,
        Auth.extractSubFromJwt(req.headers.authorization),
        new Date(),
        req.body.reps,
        req.body.weight,
        req.body.sets,
        req.body.rest,
        req.body.difficulty,
        req.body.duration,
        req.body.distance
      );

      if (ModelValidator.surveyInvalid(newSurvey.toJSON())) {
        return res.status(400).json({
          Error:
            "The request object is missing at least one of the required attributes",
        });
      }

      if (
        exercise.userId &&
        exercise.userId !=
          Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        res.status(401).json({
          Error:
            "Access denied: this exercise does not belong to the current user",
        });
        return res.end();
      }

      let createSurveyHandler = (error, data) => {
        try {
          if (error) {
            handleError(error, res);
          } else {
            newSurvey.id = data.insertId;
            const updatedExercise = ExerciseUpdater.updateUserExercise(
              exercise,
              newSurvey
            );

            let updateExerciseHandler = (error, data) => {
              try {
                if (error) {
                  handleError(error, res);
                } else {
                  res.status(201).json(newSurvey);
                }
              } catch (e) {
                handleError(e, res);
              }
            };

            ExerciseController.updateExercise(
              updatedExercise,
              updateExerciseHandler
            );
          }
        } catch (e) {
          handleError(e, res);
        }
      };

      SurveyController.createSurvey(newSurvey, createSurveyHandler);
    };

    ExerciseController.getExercise(req.body.exerciseId, getResponseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// GET /surveys endpoint, retrieves all surveys from database
app.get("/surveys", checkJwt, async (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    let responseHandler = (error, data) => {
      try {
        if (error) {
          handleError(error, res);
        } else {
          res.status(200).json(data);
        }
      } catch (e) {
        handleError(e, rs);
      }
    };

    SurveyController.getAllSurveys(
      Auth.extractSubFromJwt(req.headers.authorization),
      responseHandler
    );
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /surveys - this endpoint is not allowed
app.put("/surveys", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /surveys - this endpoint is not allowed
app.patch("/surveys", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /surveys - this endpoint is not allowed
app.delete("/surveys", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

/*
### /surveys/:surveyId ###
*/

// POST /surveys/:surveyId - this endpoint is not allowed
app.post("/surveys/:surveyId", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// GET /surveys/:surveyId - this endpoint is not allowed
app.get("/surveys/:surveyId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const responseHandler = (error, survey) => {      
      try {
        if (error) {
          handleError(error, res);
          return res.end();
        }
        if (!survey) {
          res
            .status(404)
            .json({ Error: "No survey with this id exists" });
          return res.end();
        }

        if (
          survey.userId &&
          survey.userId != Auth.extractSubFromJwt(req.headers.authorization)
        ) {
          res.status(401).json({
            Error:
              "Access denied: this survey does not belong to the current user",
          });
          return res.end();
        }

        const newSurvey = new SurveyModel(
          survey.id,
          survey.exerciseId,
          Auth.extractSubFromJwt(req.headers.authorization),
          new Date(),
          survey.reps,
          survey.weight,
          survey.sets,
          survey.rest,
          survey.difficulty,
          survey.duration,
          survey.distance
        );

        res.status(200).json(newSurvey.toJSON()).end();
      } catch (e) {
        handleError(e, res);
      }
    };

    SurveyController.getSurvey(req.params.surveyId, responseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

// PUT /surveys/:surveyId - this endpoint is not allowed
app.put("/survey/:surveyIds", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// PATCH /surveys/:surveyId - this endpoint is not allowed
app.patch("/surveys/:surveyId", checkJwt, (req, res) => {
  try {
    const error_msg = { Error: "This method is not allowed on this endpoint" };
    res.status(405).json(error_msg);
  } catch (e) {
    handleError(e, res);
  }
});

// DELETE /surveys/:surveyId endpoint, deletes specified survey from database
app.delete("/surveys/:surveyId", checkJwt, (req, res) => {
  try {
    if (HeaderValidation.headersInvalid(req, res)) return;

    const getResponseHandler = (error, survey) => {
      if (error) {
        handleError(e, res);
        return res.end();
      }

      if (!survey) {
        res
          .status(404)
          .json({ Error: "No survey with this id exists" });
        return res.end();
      }

      if (
        survey.userId && survey.userId != Auth.extractSubFromJwt(req.headers.authorization)
      ) {
        res.status(401).json({
          Error:
            "Access denied: this survey does not belong to the current user",
        });
        return res.end();
      }

      const deleteResponseHandler = (error, _) => {
        try {
          if (error) {
            handleError(error, res);
            return res.end();
          }
          res.status(204).end();
        } catch (e) {
          handleError(e, res);
        }
      };

      SurveyController.deleteSurvey(
        req.params.surveyId,
        deleteResponseHandler
      );
    };

    SurveyController.getSurvey(req.params.surveyId, getResponseHandler);
  } catch (e) {
    handleError(e, res);
  }
});

app.listen(Auth0.PORT, () => {
  console.log(`Server listening on port ${Auth0.PORT}...`);
});
