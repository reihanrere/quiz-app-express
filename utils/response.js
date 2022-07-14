class response {
    static successWithCount(res, data, count = 0, message = response.API_MESSAGE_DEFAULT) {
        res.json({ code: response.API_SUCCESS, data, count, message })
    }
    static successWithMessage(res, data, message = response.API_MESSAGE_DEFAULT) {
        res.json({ code: response.API_SUCCESS, message, data })
    }
    static success(res, data) {
        res.json({ code: response.API_SUCCESS, data, message: response.API_MESSAGE_DEFAULT })
    }
    static error(res, message, httpCode = response.HTTP_OK) {
        res.status(httpCode).json({ code: response.API_ERROR, message })
    }
    static getErrorMessage(message) {
        let error = message.errors;
        let result = [];
        if (typeof error !== 'undefined') {
            for (var key in error) {
                result.push({ [key]: error[key].message });
            }
            result = result.join(", ");
        }
        else if (message.name === "CastError" && message.kind === "ObjectId") {
            result = response.API_DATA_NOT_FOUND;
        }
        return result;
    }
}

response.HTTP_OK = 200;
response.HTTP_UNAUTHORIZED = 401;
response.API_SUCCESS = "00";
response.API_ERROR = "01";
response.API_INVALID_LOGIN = "Invalid email or password";
response.API_GENERAL_ERROR = "General Error";
response.API_SAVE_SUCCESS = "Data saved successfully";
response.API_UPDATE_SUCCESS = "Data updated successfully";
response.API_DELETE_SUCCESS = "Data deleted successfully";
response.API_MESSAGE_DEFAULT = "Ok";
response.API_DATA_FOUND = "Data Success";
response.API_COMMENT_SUCCESS = "Comment Succes";
response.API_DATA_NOT_FOUND = "Data not found";
response.API_DEFAULT_LIMIT = 20;
response.API_DEFAULT_ORDER_BY = "_id";
response.API_DEFAULT_ORDER_BY_NAME = "name";
response.API_DEFAULT_ORDER_TYPE = "asc";
response.API_CODE_NOT_FOUND = "School code not registered";
response.API_CODE_ALREADY = "School code Already";
response.API_ID_FOUND = "NIS/NIP already registered";
response.API_INVALID_TOKEN = "Invalid token";
response.API_EMAIL_FOUND = "Email already registered";
response.API_EMAIL_NOT_FOUND = "Email not registered";
response.API_VERIFICATION_CODE_INCORRET = "Verification code incorrect";
response.API_VERIFICATION_CODE_EXPIRED = "Verification code already expired";
response.API_PHONE_FOUND = "phone number already registered";
response.API_EMPTY_FIELD = "Field can't be empty";
response.API_EMAIL_AND_PHONE_FOUND = "Email and Phone number already registered";
response.API_USER_NOT_FOUND = "User not found";
response.API_CONTENT_EMPTY = "Content can't be empty";
response.API_ERROR_EMOTICON = "Invalid Code Emoticon";
response.API_FAIL_UPDATE = "Fail Update"

module.exports = response;
