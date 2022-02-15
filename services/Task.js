const Task = require('../models/Task');
const MongooseService = require('./Mongoose');

const {
  taskValidationSave,
  taskValidationUpdate,
} = require('../validations/validations');

class TaskService {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
  }

  async Get(id) {
    try {
      const result = await this.mongooseTask.get({ _id: id });

      if (result) return { result, success: true };

      return { success: false, error: 'kayıt bulunamadı' };
    } catch (err) {
      return { success: false, error: `Kayıt bulunamadı. Hata:${err}` };
    }
  }

  async GetAll(userId) {
    try {
      const result = await this.mongooseTask.getAllWithQuery({ userId });

      if (result) return { result, success: true };

      return { success: false, error: ' Hiç kayıt yok' };
    } catch (err) {
      return { success: false, error: `Kayıtlar bulunamadı. Hata:${err}` };
    }
  }

  async Save(body) {
    const { error } = taskValidationSave(body);
    if (error) return error.details[0].message;
    try {
      const result = await this.mongooseTask.save(body);

      if (result) return { success: true, message: 'Kayıt yapıldı.' };

      return { success: false, error: 'Kayıt yapılamadı.' };
    } catch (err) {
      return { success: false, error: `Kayıt yapılamadı. Hata:${err}` };
    }
  }

  async Update(body, id) {
    try {
      const { error } = taskValidationUpdate(body);
      if (error) return error.details[0].message;

      const result = await this.mongooseTask.update(id, body);

      if (result) return { result, success: true };
      return { success: false, error: 'Güncelleme yapılamadı.' };
    } catch (err) {
      return { success: false, error: `Kayıt güncellenemedi. Hata:${err}` };
    }
  }

  async Delete(id) {
    try {
      await this.mongooseTask.delete({ _id: id });
      return { message: 'Kayıt silindi', success: true };
    } catch (err) {
      return { success: false, error: `Kayıt silinemedi. Hata:${err}` };
    }
  }
}
module.exports = TaskService;
