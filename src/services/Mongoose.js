class MongooseService {
  constructor(model) {
    this.model = model;
  }

  save(body) {
    return this.model.create(body);
  }

  get(obj) {
    return this.model.findOne(obj).lean();
  }

  getAllWithQuery(obj) {
    return this.model.find(obj).lean();
  }

  getAll() {
    return this.model.find({}).lean();
  }

  delete(id) {
    return this.model.findOneAndRemove(id);
  }

  update(id, value) {
    return this.model.findOneAndUpdate({ _id: id }, value, { new: true });
  }

  updateAndReturnOld(id, value) {
    return this.model.findOneAndUpdate({ _id: id }, value);
  }
}

module.exports = MongooseService;
