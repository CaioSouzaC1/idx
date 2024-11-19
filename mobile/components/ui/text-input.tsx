import * as React from "react";
import { TextInput as RNTextInput, TextInputProps } from "react-native";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const TextInputClassContext = React.createContext<string | undefined>(
  undefined
);

const textInputVariants = cva(
  "text-base text-foreground bg-background placeholder:text-foreground/40",
  {
    variants: {
      size: {
        sm: "h-8 px-2 py-1 text-sm",
        md: "h-10 px-3 py-2 text-base",
        lg: "h-12 px-4 py-3 text-lg",
      },
      variant: {
        outline: "border border-input rounded-md",
        filled: "bg-gray-100 rounded-md",
        underlined: "border-b border-input",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "outline",
    },
  }
);

export type CustomTextInputProps = TextInputProps &
  VariantProps<typeof textInputVariants> & {
    className?: string;
  };

const TextInput = React.forwardRef<RNTextInput, CustomTextInputProps>(
  ({ className, size, variant, ...props }, ref) => {
    const inputClass = React.useContext(TextInputClassContext);

    return (
      <RNTextInput
        ref={ref}
        className={cn(
          textInputVariants({ size, variant }),
          inputClass,
          className
        )}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput, TextInputClassContext };
