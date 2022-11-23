import UserInterface from "../interfaces/user.interface";
import detaService from "../services/usersDeta.service";
import joi from "joi";

export class UserModel implements UserInterface {
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  date: number | undefined;
  key: string | undefined;
  formattedDate: string | undefined;

  constructor(data: any) {
    Object.assign(this, data);
  }

  public get getFormattedDate() {
    if (this.date) {
      let date = new Date(this.date);
      return (
        date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString()
      );
    }
    return "";
  }

  public async save() {
    try {
      if (await this.isValid()) {
        if (!this.key) {
          this.date = Date.now();
          this.formattedDate = this.getFormattedDate;
        }

        let response = await detaService.createUser(this);
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  public async update(data: any) {
    try {
      this.name = data.name;
      this.surname = data.surname;
      this.email = data.email;

      if (await this.isValid()) {
        let response = await detaService.updateUser(this);
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  public async isValid() {
    try {
      await this.schema.validateAsync(this);
      return true;
    } catch (error) {
      throw error;
    }
  }

  private get schema() {
    return joi.object({
      name: joi.string().required(),
      surname: joi.string().required(),
      email: joi.string().email().required(),
      date: joi.number().optional(),
      key: joi.string().optional(),
      formattedDate: joi.string().optional(),
    });
  }

  public async delete() {
    try {
      let response = await detaService.deleteUser(this.key);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async find(key: any) {
    try {
      return await detaService.getUserObject(key);
    } catch (error) {
      throw error;
    }
  }
}
