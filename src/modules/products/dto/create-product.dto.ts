
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'; // add JoiSchemaOptions

@JoiSchemaOptions({ allowUnknown: false, stripUnknown: true }) // ADD THIS
export class CreateProductDTO {
  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().optional().allow(null, '')) // required → optional
  description?: string;

  @JoiSchema(Joi.number().required().positive()) // min(0) → positive() (prevents 0)
  price: number;

  @JoiSchema(Joi.number().required().min(1))
  stockCount: number;

  @JoiSchema(Joi.string().uuid().required()) // add .uuid()
  shopId: string;
}

//last

// import * as Joi from 'joi';
// import { JoiSchema } from 'nestjs-joi';

// export class CreateProductDTO {
//   @JoiSchema(Joi.string().required())
//   name: string;

//   @JoiSchema(Joi.string().required())
//   description: string;

//   @JoiSchema(Joi.number().required().min(0))
//   price: number;

//   @JoiSchema(Joi.number().required().min(1))
//   stockCount: number;

//   @JoiSchema(Joi.string().required())
//   shopId: string;
// }

// import { JoiSchema } from 'nestjs-joi';
// import * as Joi from 'joi';

// export class CreateProductDTO {
//   @JoiSchema(Joi.string().required())
//   name: string;

//   @JoiSchema(Joi.string().required())
//   description: string;

//   @JoiSchema(Joi.number().required().min(0))
//   price: number;

//   @JoiSchema(Joi.number().required().min(1))
//   stockCount: number;

//   @JoiSchema(Joi.string().uuid().required())
//   shopId: string;
// }
