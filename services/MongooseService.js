class MongooseService {
  constructor(model) {
    this.model = model;
  }

  save(body) {
    return this.model.save(body);
  }

  getId(id) {
    return this.model.findOne({ _id: id });
  }

  getEmail(email) {
    return this.model.findOne({ email });
  }

  delete(id) {
    return this.model.findOneAndRemove(id);
  }

  update(id, value) {
    return this.model.findOneAndUpdate({ _id: id }, value);
  }
}

module.exports = MongooseService;
