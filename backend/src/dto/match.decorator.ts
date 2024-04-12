// import { ClassConstructor } from "class-transformer";
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "match",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} does not match ${args.constraints[0]}`;
        },
      },
    });
  };
}

@ValidatorConstraint({ name: "Match" })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints;
    return fn(args.object) === value;
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: (() => any)[] = args.constraints;
    return `${constraintProperty} and ${args.property} does not match`;
  }
}

export function IsMatch(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isMatch",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
      },
    });
  };
}
