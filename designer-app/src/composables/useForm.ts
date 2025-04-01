import { reactive, computed, ref } from 'vue';

type ValidationRule<T> = (value: T) => boolean | string;

export interface FieldOptions<T> {
  value: T;
  rules?: ValidationRule<T>[];
  defaultValue?: T;
}

export type FormFields<T> = {
  [K in keyof T]: FieldOptions<T[K]>;
};

export function useForm<T extends Record<string, any>>(initialFields: FormFields<T>) {
  const loading = ref(false);
  const isDirty = ref(false);
  
  // Create a reactive form state
  // Use type assertion to tell TypeScript that this is safe
  const fields = reactive<FormFields<T>>({...initialFields});
  
  // Create reactive errors object
  const errors = reactive<Record<keyof T, string>>(
    Object.keys(initialFields).reduce((acc, key) => {
      acc[key as keyof T] = '';
      return acc;
    }, {} as Record<keyof T, string>)
  );
  
  // Get values from fields
  const values = computed(() => {
    return Object.entries(fields).reduce((acc, [key, field]) => {
      acc[key as keyof T] = field.value;
      return acc;
    }, {} as T);
  });
  
  // Reset form to initial or specified values
  const reset = (newValues?: Partial<T>) => {
    for (const key in fields) {
      if (Object.hasOwn(fields, key)) {
        const typedKey = key as keyof T;
        
        if (newValues && typedKey in newValues) {
          // Use type assertion to make TypeScript happy
          fields[typedKey].value = newValues[typedKey] as T[typeof typedKey];
        } else if (fields[typedKey].defaultValue !== undefined) {
          fields[typedKey].value = fields[typedKey].defaultValue as T[typeof typedKey];
        }
      }
    }
    
    // Reset errors
    for (const key in errors) {
      if (Object.hasOwn(errors, key)) {
        errors[key as keyof T] = '';
      }
    }
    
    isDirty.value = false;
  };
  
  // Set form values
  const setValues = (newValues: Partial<T>) => {
    for (const key in newValues) {
      if (Object.hasOwn(newValues, key) && key in fields) {
        const typedKey = key as keyof T;
        fields[typedKey].value = newValues[typedKey] as T[typeof typedKey];
      }
    }
    isDirty.value = true;
  };
  
  // Set specific field value
  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    if (field in fields) {
      // This is safe because we checked field is in fields
      (fields[field] as FieldOptions<T[K]>).value = value;
      isDirty.value = true;
    }
  };
  
  // Validate a specific field
  const validateField = <K extends keyof T>(field: K): boolean => {
    if (!(field in fields)) {
      return true;
    }
    
    const fieldOptions = fields[field] as FieldOptions<T[K]>;
    
    if (!fieldOptions.rules || fieldOptions.rules.length === 0) {
      return true;
    }
    
    for (const rule of fieldOptions.rules) {
      const result = rule(fieldOptions.value);
      
      if (result !== true) {
        errors[field] = typeof result === 'string' ? result : `Invalid ${String(field)}`;
        return false;
      }
    }
    
    errors[field] = '';
    return true;
  };
  
  // Validate all fields
  const validate = (): boolean => {
    let isValid = true;
    
    for (const key in fields) {
      if (Object.hasOwn(fields, key)) {
        const typedKey = key as keyof T;
        if (!validateField(typedKey)) {
          isValid = false;
        }
      }
    }
    
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async <R>(
    submitFn: (values: T) => Promise<R>,
    options: { resetOnSuccess?: boolean } = {}
  ): Promise<R | undefined> => {
    const { resetOnSuccess = true } = options;
    
    if (!validate()) {
      return undefined;
    }
    
    loading.value = true;
    
    try {
      const result = await submitFn(values.value);
      
      if (resetOnSuccess) {
        reset();
      }
      
      return result;
    } catch (error) {
      // If the error has field-specific validation errors, set them
      if (error && typeof error === 'object' && 'errors' in error) {
        const fieldErrors = error.errors as Partial<Record<keyof T, string>>;
        
        for (const key in fieldErrors) {
          if (Object.hasOwn(fieldErrors, key)) {
            const typedKey = key as keyof T;
            errors[typedKey] = fieldErrors[typedKey] ?? '';
          }
        }
      }
      
      throw error;
    } finally {
      loading.value = false;
    }
  };
  
  return {
    fields,
    errors,
    values,
    loading,
    isDirty,
    reset,
    setValues,
    setValue,
    validate,
    validateField,
    handleSubmit
  };
}

// Common validation rules
export const required = (message = 'This field is required') => {
  return (value: any): boolean | string => {
    if (value === null || value === undefined || value === '') {
      return message;
    }
    if (Array.isArray(value) && value.length === 0) {
      return message;
    }
    return true;
  };
};

export const email = (message = 'Please enter a valid email address') => {
  return (value: string): boolean | string => {
    if (!value) return true; // Skip if empty (use required rule separately)
    
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(value) || message;
  };
};

export const minLength = (length: number, message?: string) => {
  return (value: string): boolean | string => {
    if (!value) return true; // Skip if empty (use required rule separately)
    
    return value.length >= length || message || `Must be at least ${length} characters`;
  };
};

export const maxLength = (length: number, message?: string) => {
  return (value: string): boolean | string => {
    if (!value) return true; // Skip if empty (use required rule separately)
    
    return value.length <= length || message || `Must be less than ${length} characters`;
  };
};

export const numeric = (message = 'Please enter a valid number') => {
  return (value: string): boolean | string => {
    if (!value) return true; // Skip if empty (use required rule separately)
    
    return !isNaN(Number(value)) || message;
  };
};

export const min = (min: number, message?: string) => {
  return (value: number): boolean | string => {
    if (value === null || value === undefined) return true; // Skip if empty
    
    return value >= min || message || `Must be at least ${min}`;
  };
};

export const max = (max: number, message?: string) => {
  return (value: number): boolean | string => {
    if (value === null || value === undefined) return true; // Skip if empty
    
    return value <= max || message || `Must be less than ${max}`;
  };
};

export const pattern = (regex: RegExp, message = 'Invalid format') => {
  return (value: string): boolean | string => {
    if (!value) return true; // Skip if empty (use required rule separately)
    
    return regex.test(value) || message;
  };
};

export const confirmed = (valueToMatch: () => any, message = 'Values do not match') => {
  return (value: any): boolean | string => {
    return value === valueToMatch() || message;
  };
};