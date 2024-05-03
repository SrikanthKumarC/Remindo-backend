import { email as emailObj, string, optional, parse, date, object, minLength, transform } from 'valibot';

export enum recurringPattern {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}


export const validateUser = async (data: any) => {
  const schema = object({
    email: string([emailObj('Enter a valid email!')]),
    password: string([minLength(8, 'Password smust be at least 8 characters')]),
    phoneNumber: optional(string())
  })

  try {
    parse(schema, data);
  } catch (error: any) {
    throw new Error(error.message);
  }
  return data;
}

export const validateEvent = async (data: any) => {
  const schema = object({
    title: string(),
    date: string(),
    recurring: optional(string()),
    recurringType: optional(string())
  });

  try {
    parse(schema, data);
  } catch (error: any) {
    throw new Error(error.message);
  }
  return data;
}

export const userTierRates = {
  free: 1,
  premium: 10,
  admin: 10000
};
