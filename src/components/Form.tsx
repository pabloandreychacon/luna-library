import React, { createContext, useContext } from 'react';
import type { FormInstance } from '../hooks/useForm.hook';
import { colors, fontSizes, fontWeights, radii } from '../styles';

// ─── Context ──────────────────────────────────────────────────

type FormContextValue = FormInstance & { layout?: FormLayout };
const FormContext = createContext<FormContextValue | null>(null);
export const useFormContext = () => useContext(FormContext);

// ─── Types ────────────────────────────────────────────────────

export type FormLayout = 'vertical' | 'horizontal' | 'inline';

/**
 * Form component that provides context for managing form state and validation. It includes a nested Form.Item component for individual form fields, which automatically connects to the form context for value and error handling. The Form component handles form submission and validation, while Form.Item displays labels, inputs, and error messages based on the provided rules.
 */
export type FormProps = {
  form: FormInstance;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, string | undefined>) => void;
  layout?: FormLayout;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Form.Item component that represents an individual form field. It accepts a name prop to connect to the form context, a label for display, and children which should be a form input component. It automatically handles value changes and displays validation errors based on the form context. The required prop adds an asterisk to the label and indicates that the field is required.
 */
export type FormItemProps = {
  name?: string;
  label?: React.ReactNode;
  children: React.ReactElement<any>;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// ─── Form.Item ────────────────────────────────────────────────
/**
 * Form.Item component that represents an individual form field. It accepts a name prop to connect to the form context, a label for display, and children which should be a form input component. It automatically handles value changes and displays validation errors based on the form context. The required prop adds an asterisk to the label and indicates that the field is required.
 * @param name The name of the form field, used to connect to the form context for value and error handling.
 * @param label The label to display for the form field.
 * @param children The form input component (e.g., Input, Checkbox) that will be rendered and connected to the form context.
 * @param required If true, indicates that the field is required and adds an asterisk to the label.
 * @param className Optional additional class name for styling.
 * @param style Optional additional styles for the form item container. 
 * @returns A Form.Item component that displays a label, the input field, and any validation error messages based on the form context.
 * @description Form.Item component that represents an individual form field. It accepts a name prop to connect to the form context, a label for display, and children which should be a form input component. It automatically handles value changes and displays validation errors based on the form context. The required prop adds an asterisk to the label and indicates that the field is required.
 * 
 */
const FormItem = ({ name, label, children, required, className, style }: FormItemProps) => {
  const ctx = useFormContext();
  const error = name && ctx ? ctx.errors[name] : undefined;
  const value = name && ctx ? ctx.values[name] : undefined;

  const child = name && ctx
    ? React.createElement(children.type, {
      ...children.props,
      value: value ?? '',
      onChange: (val: any) => {
        if (val && typeof val === 'object' && val.target) {
          ctx.setValue(name, val.target.type === 'checkbox' ? val.target.checked : val.target.value);
        } else {
          ctx.setValue(name, val);
        }
      },
      variant: error ? 'danger' : (children.props.variant ?? undefined),
    })
    : children;

  return (
    <div
      className={className}
      style={{
        marginBottom: '1.25rem',
        display: ctx?.layout === 'horizontal' ? 'flex' : 'block',
        alignItems: ctx?.layout === 'horizontal' ? 'flex-start' : undefined,
        gap: ctx?.layout === 'horizontal' ? '1rem' : undefined,
        ...style,
      }}
    >
      {label && (
        <label style={{
          display: 'block',
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.medium,
          color: colors.text,
          marginBottom: ctx?.layout === 'horizontal' ? 0 : '0.25rem',
          minWidth: ctx?.layout === 'horizontal' ? '120px' : undefined,
          paddingTop: ctx?.layout === 'horizontal' ? '0.5rem' : undefined,
        }}>
          {required && <span style={{ color: colors.danger, marginRight: '0.25rem' }}>*</span>}
          {label}
        </label>
      )}
      <div style={{ flex: 1 }}>
        {child}
        {error && (
          <span style={{
            display: 'block',
            marginTop: '0.25rem',
            fontSize: fontSizes.xs,
            color: colors.danger,
          }}>
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Form ─────────────────────────────────────────────────────
/**
 * 
 * @param form The form instance created by the useForm hook, which manages form state and validation.
 * @param onFinish Callback function that is called when the form is successfully submitted and passes validation. It receives the form values as an argument.
 * @param onFinishFailed Callback function that is called when the form submission fails validation. It receives the form errors as an argument.
 * @param layout The layout of the form, which can be 'vertical', 'horizontal', or 'inline'. This affects how the form items are displayed.
 * @param children The form fields (Form.Item components) that will be rendered inside the form.  
 * @param className Optional additional class name for styling the form.
 * @param style Optional additional styles for the form container.
 * 
 * @returns A Form component that provides context for managing form state and validation. It includes a nested Form.Item component for individual form fields, which automatically connects to the form context for value and error handling. The Form component handles form submission and validation, while Form.Item displays labels, inputs, and error messages based on the provided rules.
 * @description Form component that provides context for managing form state and validation. It includes a nested Form.Item component for individual form fields, which automatically connects to the form context for value and error handling. The Form component handles form submission and validation, while Form.Item displays labels, inputs, and error messages based on the provided rules. 
 */
const Form = ({ form, onFinish, onFinishFailed, layout = 'vertical', children, className, style }: FormProps) => {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const valid = form.validate();
    if (valid) {
      onFinish?.(form.values);
    } else {
      onFinishFailed?.(form.errors);
    }
  };

  return (
    <FormContext.Provider value={{ ...form, layout }}>
      <form
        onSubmit={handleSubmit}
        className={className}
        style={{
          display: layout === 'inline' ? 'flex' : 'block',
          flexWrap: layout === 'inline' ? 'wrap' : undefined,
          gap: layout === 'inline' ? '1rem' : undefined,
          alignItems: layout === 'inline' ? 'flex-end' : undefined,
          ...style,
        }}
        noValidate
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;

export default Form;
