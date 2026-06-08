
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'; // add JoiSchemaOptions

@JoiSchemaOptions({ allowUnknown: false, stripUnknown: true }) // ADD THIS
export class UpdateProductDTO {
  @JoiSchema(Joi.string().optional())
  name?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  description?: string;

  @JoiSchema(Joi.number().optional().positive()) // min(0) → positive()
  price?: number;

  @JoiSchema(Joi.number().optional().min(1))
  stockCount?: number;

  @JoiSchema(Joi.string().uuid().optional())
  shopId?: string;
}

//last
// import * as Joi from 'joi';
// import { JoiSchema } from 'nestjs-joi';

// export class UpdateProductDTO {
//   @JoiSchema(Joi.string().optional())
//   name?: string;

//   @JoiSchema(Joi.string().optional())
//   description?: string;

//   @JoiSchema(Joi.number().optional().min(0))
//   price?: number;

//   @JoiSchema(Joi.number().optional().min(1))
//   stockCount?: number;

//   @JoiSchema(Joi.string().uuid().optional())
//   shopId?: string;
// }
