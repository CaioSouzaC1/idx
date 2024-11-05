import React, { createContext, useContext, forwardRef } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import {
  Controller,
  useFormContext,
  FieldPath,
  FieldValues,
  FormProvider,
  ControllerProps,
} from "react-hook-form";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};
const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};
const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = forwardRef<View, View["props"]>(({ style, ...props }, ref) => {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <View ref={ref} style={[styles.formItem, style]} {...props} />
    </FormItemContext.Provider>
  );
});

const FormLabel = forwardRef<Text, Text["props"]>(
  ({ style, ...props }, ref) => {
    const { error } = useFormField();
    return (
      <Text
        ref={ref}
        style={[styles.label, error && styles.labelError, style]}
        {...props}
      />
    );
  }
);

const FormControl = forwardRef<TextInput, TextInput["props"]>(
  ({ style, ...props }, ref) => {
    const { error } = useFormField();
    return (
      <TextInput
        ref={ref}
        style={[styles.input, error && styles.inputError, style]}
        {...props}
      />
    );
  }
);

const FormDescription = forwardRef<Text, Text["props"]>(
  ({ style, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return <Text ref={ref} style={[styles.description, style]} {...props} />;
  }
);

const FormMessage = forwardRef<Text, Text["props"]>(
  ({ style, children, ...props }, ref) => {
    const { error } = useFormField();
    const body = error ? String(error?.message) : children;
    if (!body) return null;
    return (
      <Text ref={ref} style={[styles.message, style]} {...props}>
        {body}
      </Text>
    );
  }
);

const styles = StyleSheet.create({
  formItem: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  labelError: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
  inputError: {
    borderColor: "red",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  message: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};
