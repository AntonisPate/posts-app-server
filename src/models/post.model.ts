import PostInterface from "../interfaces/post.interface";
import detaService from "../services/postsDeta.service";
import joi from "joi";

export class PostModel implements PostInterface {
  title: string | undefined;
  context: string | undefined;
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

        let response = await detaService.createPost(this);
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  public async update(data: any) {
    try {
      this.title = data.title;
      this.context = data.context;

      if (await this.isValid()) {
        let response = await detaService.updatePost(this);
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
      context: joi.string().required(),
      title: joi.string().required(),
      date: joi.number().optional(),
      key: joi.string().optional(),
      formattedDate: joi.string().optional(),
    });
  }

  public async delete() {
    try {
      let response = await detaService.deletePost(this.key);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public static async find(key: any) {
    try {
      return await detaService.getPostObject(key);
    } catch (error) {
      throw error;
    }
  }
}
