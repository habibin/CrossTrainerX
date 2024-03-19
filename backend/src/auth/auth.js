const Auth0 = require("./auth0Constants");
const jwtParser = require("jsonwebtoken");
const axios = require("axios");
const db = require("../database/db-connector");

const ALPHANUM =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// generate a new state entity - a 32-byte alphanumeric keyword */
function generateState(stateSize = 32, chars = ALPHANUM) {
  let state = "";
  for (let i = 0; i < stateSize; i++) {
    state += ALPHANUM[Math.floor(Math.random() * chars.length)];
  }
  return state;
}

// store a new state entity in the database
async function createState(callback) {
  try {
    const state = generateState();
    const addStateQuery = `INSERT INTO States (state) VALUES (?);`;
    
    db.pool.query(addStateQuery, [state], (error, rows, fields) => {
      callback(error, state);
    });
  } catch (e) {
    throw e;
  }
}

// add a new user to database, based on a given userID (the JWT sub value)
async function storeUser(userId) {
  try {
    const newUser = { id: userId };
    return newUser;
  } catch (e) {
    throw e;
  }
}

/// get the JWT from Auth0
async function retrieveJwt(code) {
  try { 
    const data = {
      code: code,
      client_id: Auth0.OAUTH_CLIENT_ID,
      client_secret: Auth0.OAUTH_CLIENT_SECRET,
      redirect_uri: `${Auth0.URL}/valid_user`,
      grant_type: "authorization_code",
    };
    const config = {
      headers: { "content-type": "application/json" },
    };
    const response = await axios.post(`https://${Auth0.OAUTH_DOMAIN}/oauth/token`, data, config)

    return response.data;
  } catch (error) {
    console.error(error);
  };
}

// extract the sub value from the JWT for use as user IDs
function extractSubFromJwt(auth_header) {
  try {
    const token = auth_header.includes("Bearer") ? auth_header.slice(7) : auth_header;
    const decodedToken = jwtParser.decode(token);
    const subValue = decodedToken.sub.slice(6);
    return subValue;
  } catch (e) {
    throw e;
  }
}

// check whether or not a state entity exists in the database
async function stateExists(givenState) {
  try {
    return true;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  createState,
  storeUser,
  extractSubFromJwt,
  stateExists,
  retrieveJwt,
};
