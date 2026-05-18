import { useState } from 'react';
import { validators } from '../utilities/validators.util';

export type FieldRule = {
  required?: boolean;
  message?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  type?: 'email' | 'url' | 'number' | 'date';
  minDate?: string;
  maxDate?: string;
  validator?: (value: any) => string | undefined;
};

export type FieldConfig = {
  value: any;
  rules?: FieldRule[];
};

export type FormFields = Record<string, FieldConfig>;
export type FormValues = Record<string, any>;
export type FormErrors = Record<string, string | undefined>;

export type FormInstance = {
  values: FormValues;
  errors: FormErrors;
  setValue: (name: string, value: any) => void;
  validate: () => boolean;
  reset: () => void;
  setError: (name: string, message: string) => void;
  clearError: (name: string) => void;
};

/**
 * Validates a field value against its rules.
 * @param value 
 * @param rules 
 * @returns 
 * Checks the provided value against an array of validation rules. It returns an error message if any rule fails, or undefined if the value is valid. The function supports various types of validation, including required fields, email and URL formats, number checks, length constraints, date validations, custom patterns, and custom validator functions.
 */
const validateField = (value: any, rules: FieldRule[] = []): string | undefined => {
  for (const rule of rules) {
    if (rule.validator) {
      const msg = rule.validator(value);
      if (msg) return msg;
    }
    if (rule.required && validators.isEmpty(value)) {
      return rule.message ?? 'This field is required';
    }
    if (rule.type === 'email' && value && !validators.isEmail(value)) {
      return rule.message ?? 'Invalid email address';
    }
    if (rule.type === 'url' && value && !validators.isUrl(value)) {
      return rule.message ?? 'Invalid URL';
    }
    if (rule.type === 'number' && value && !validators.isNumber(value)) {
      return rule.message ?? 'Must be a number';
    }
    if (rule.minLength && value && !validators.minLength(value, rule.minLength)) {
      return rule.message ?? `Minimum ${rule.minLength} characters`;
    }
    if (rule.maxLength && value && !validators.maxLength(value, rule.maxLength)) {
      return rule.message ?? `Maximum ${rule.maxLength} characters`;
    }
    if (rule.type === 'date' && value && !validators.isDate(value)) {
      return rule.message ?? 'Invalid date';
    }
    if (rule.minDate && value && !validators.isDateAfter(value, rule.minDate)) {
      return rule.message ?? `Date must be after ${rule.minDate}`;
    }
    if (rule.maxDate && value && !validators.isDateBefore(value, rule.maxDate)) {
      return rule.message ?? `Date must be before ${rule.maxDate}`;
    }
    if (rule.pattern && value && !validators.matchesPattern(value, rule.pattern)) {
      return rule.message ?? 'Invalid format';
    }
  }
  return undefined;
};

/**
 * Hook for managing form state and validation.
 * @param fields 
 * @returns 
 * Provides form state management and validation based on a configuration object. Each field can have its own validation rules, and the hook returns current values, errors, and helper functions to manage the form.
 * The `useForm` hook initializes form values and errors based on the provided field configurations. It offers a `setValue` function to update field values and perform validation, a `validate` function to check all fields against their rules, a `reset` function to restore initial values, and functions to set or clear specific error messages. This hook abstracts away the complexities of form handling, making it easier to implement forms in React components.
 */
const useForm = (fields: FormFields): FormInstance => {
  const initialValues = Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, v.value])
  );

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const setValue = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    const error = validateField(value, fields[name]?.rules);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let valid = true;
    for (const [name, config] of Object.entries(fields)) {
      const error = validateField(values[name], config.rules);
      if (error) { newErrors[name] = error; valid = false; }
    }
    setErrors(newErrors);
    return valid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setError = (name: string, message: string) => {
    setErrors(prev => ({ ...prev, [name]: message }));
  };

  const clearError = (name: string) => {
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  /**
   * Returns the form instance with all its methods and state.
   * This includes the current values of the form fields, any validation errors, and functions to update field values, validate the form, reset it, and manage errors. The hook abstracts away the complexity of form state management and validation, providing a simple interface for use in components.
   * @returns {FormInstance} The form instance containing values, errors, and helper functions.
   */
  return { values, errors, setValue, validate, reset, setError, clearError };
};

export default useForm;
