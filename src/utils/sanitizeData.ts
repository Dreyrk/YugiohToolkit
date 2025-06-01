import mongoose from "mongoose";

type ObjectId = mongoose.Types.ObjectId;

export type Sanitized<T> = T extends ObjectId
  ? string
  : T extends Date
  ? Date
  : T extends (infer U)[]
  ? Sanitized<U>[]
  : T extends object
  ? {
      [K in keyof T as K extends "_id" ? "id" : K extends "__v" ? never : K]: K extends "_id"
        ? string
        : Sanitized<T[K]>;
    }
  : T;

function isMongooseObjectId(value: unknown): value is ObjectId {
  return value instanceof mongoose.Types.ObjectId;
}

export default function sanitizeData<T>(data: T): Sanitized<T> {
  // Gère les cas null ou undefined
  if (data === null || data === undefined) {
    return data as Sanitized<T>;
  }

  if (isMongooseObjectId(data)) {
    return data.toString() as Sanitized<T>;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item)) as Sanitized<T>;
  }

  if (data instanceof Date) {
    return data as Sanitized<T>;
  }

  if (typeof data === "object" && data !== null) {
    const sanitizedObject: { [key: string]: unknown } = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = (data as { [key: string]: unknown })[key];

        if (key === "_id") {
          sanitizedObject.id = isMongooseObjectId(value) ? value.toString() : String(value);
        } else if (key === "__v") {
          continue;
        } else {
          sanitizedObject[key] = sanitizeData(value);
        }
      }
    }
    return sanitizedObject as Sanitized<T>;
  }

  return data as Sanitized<T>;
}
