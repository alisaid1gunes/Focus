const Task = require('../models/Task');
const MongooseService = require('./MongooseService');

const {
  taskValidationSave,
  taskValidationUpdate,
} = require('../validations/validations');

class TaskService {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
  }

  async GetId(id) {
    try {
      const result = await this.mongooseTask.get({ _id: id });

      if (result) return result;

      return 'kayıt bulunamadı';
    } catch (err) {
      return `Kayıt bulunamadı. Hata:${err}`;
    }
  }

  async GetAll(userId) {
    try {
      const result = await this.mongooseTask.get({ userId: userId });
      if (result.length > 0) return result;

      return 'Hiç kayıt yok';
    } catch (err) {
      return 'Kayıt bulunamadı. Hata:';
    }
  }

  async Save(body) {
    const { error } = taskValidationSave(body);
    if (error) return error.details[0].message;
    try {
      const result = await this.mongooseTask.save(body);

      if (result) return 'kayıt yapıldı';

      return 'kayıt yapılamadı';
    } catch (err) {
      return `Kayıt edilemedi. Hata:${err}`;
    }
  }

  async Update(body, id) {
    try {
      const { error } = taskValidationUpdate(body);
      if (error) return error.details[0].message;

      const result = await this.mongooseTask.update(id, body);
      if (result) return result;
      return 'güncelleme yapılamadı';
    } catch (err) {
      return `Kayıt edilemedi. Hata:${err}`;
    }
  }

  async Delete(id) {
    try {
      await this.mongooseTask.delete({ _id: id });
      return 'Kayıt silindi';
    } catch (err) {
      return `hata kayıt silinemedi: ${err}`;
    }
  }
}
module.exports = TaskService;
