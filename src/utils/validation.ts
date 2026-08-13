export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export interface FieldValidationResult {
  valid: boolean;
  message?: string;
}

export function validateRequired(
  value: string,
  fieldLabel: string
): FieldValidationResult {
  if (!isNonEmpty(value)) {
    return { valid: false, message: `${fieldLabel} is required.` };
  }
  return { valid: true };
}

export function validateEmail(value: string): FieldValidationResult {
  if (!isNonEmpty(value)) {
    return { valid: false, message: "Email is required." };
  }
  if (!isValidEmail(value)) {
    return { valid: false, message: "Enter a valid email address." };
  }
  return { valid: true };
}
