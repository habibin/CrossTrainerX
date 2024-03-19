// determine if the request MIME type is invalid
function requestMIMEInvalid(contentTypeVal) {
  return (
    contentTypeVal &&
    contentTypeVal != "*/*" &&
    !contentTypeVal.includes("application/json") &&
    !contentTypeVal.includes("text/html")
  );
}

// determine if the response MIME type is invalid
function responseMIMEInvalid(acceptVal) {
  return (
    acceptVal &&
    acceptVal != "*/*" &&
    !acceptVal.includes("application/json") &&
    !acceptVal.includes("text/html")
  );
}

// determine if the Content Type and Accept headers are valid
function validate(acceptVal, contentTypeVal) {
  let output = {
    acceptValid: true,
    contentTypeValid: true,
    status_code: null,
    error_msg: null,
  };

  if (!acceptVal && !contentTypeVal) {
    return output;
  }

  if (requestMIMEInvalid(contentTypeVal)) {
    output.contentTypeValid = false;
    output.error_msg = {
      Error: "The request MIME type is not supported by this endpoint",
    };
    output.status_code = 415;
  } else if (responseMIMEInvalid(acceptVal)) {
    output.acceptValid = false;
    output.error_msg = {
      Error:
        "The requested response MIME type is not supported by this endpoint",
    };
    output.status_code = 406;
  }
  return output;
}

// determine if the request and response type headers are valid
function headersInvalid(req, res) {
  let contentValidity = validate(req.get("Accept"), req.get("Content-Type"));
  if (!contentValidity.contentTypeValid || !contentValidity.acceptValid) {
    res.status(contentValidity.status_code).json(contentValidity.error_msg);
    return true;
  }
  return false;
}

module.exports = {
  headersInvalid,
};
