class ApiErrorService {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiErrorService(400, msg);
  }

  static unauthorized(msg) {
    return new ApiErrorService(401, msg);
  }

  static internal(msg) {
    return new ApiErrorService(500, msg);
  }
}

module.exports = ApiErrorService;
