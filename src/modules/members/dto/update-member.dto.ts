import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({ allowUnknown: false, stripUnknown: true })
export class UpdateMemberDTO {
  @JoiSchema(Joi.string().optional())
  firstName?: string;

  @JoiSchema(Joi.string().optional())
  lastName?: string;

  @JoiSchema(Joi.string().optional())
  gender?: string;

  @JoiSchema(Joi.string().optional())
  dateOfBirth?: string;

  @JoiSchema(Joi.string().required())
  phone: string;

  @JoiSchema(Joi.string().uuid().optional())  // ADD THIS
  centralMemberId?: string;
}

// import { JoiSchema } from 'nestjs-joi';
// import * as Joi from 'joi';

// export class UpdateMemberDTO {
//   @JoiSchema(Joi.string().optional())
//   firstName?: string;

//   @JoiSchema(Joi.string().optional())
//   lastName?: string;

//   @JoiSchema(Joi.string().optional())
//   gender?: string;

//   @JoiSchema(Joi.string().optional())
//   dateOfBirth?: string;

//   @JoiSchema(Joi.string().required())
//   phone: string;
// }
