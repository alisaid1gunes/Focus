class ApiErrorService {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiErrorService(400, message);
  }

  static unauthorized(message) {
    return new ApiErrorService(401, message);
  }

  static notFound(message) {
    return new ApiErrorService(404, message);
  }

  static internalError(message) {
    return new ApiErrorService(500, message);
  }
}

module.exports = ApiErrorService;
