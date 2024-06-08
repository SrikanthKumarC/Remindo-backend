import { email as emailObj, string, optional, parse, date, object, minLength, transform } from 'valibot';

export enum recurringPattern {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

// credits per user tier
const UserTiers = {
  free: { credits: 2 },
  plus: { credits: 3 },
  premium: { credits: 10 }
} as const;

type UserTier = keyof typeof UserTiers;

export function getCredits(tier: UserTier): number {
  return UserTiers[tier].credits;
}
// end of credits per user tier

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

export const notifyByEmail = async (data: any) => {
  const schema = object({
    email: string([emailObj('Enter a valid email!')]),
    message: string()
  });

  try {
    parse(schema, data);
  } catch (error: any) {
    throw new Error(error.message);
  }
  return data;
};

export const userTierRates = {
  free: 1,
  premium: 10,
  admin: 10000
};

