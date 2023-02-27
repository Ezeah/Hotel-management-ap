import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { PathsToValidate, Validator } from 'mongoose';

function validateData(schema: Joi.ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    // const dataToValidate = req.method === 'GET' ? req.query : req.body;
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  };
}

export default validateData;
