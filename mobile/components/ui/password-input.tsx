import * as React from "react";
import { View, TextInput as RNTextInput, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { CustomTextInputProps, TextInput } from "./text-input";

type PasswordInputProps = CustomTextInputProps;

export const PasswordInput = React.forwardRef<RNTextInput, PasswordInputProps>(
  ({ className, size, variant, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <View style={{ position: "relative" }}>
        <TextInput
          ref={ref}
          size={size}
          variant={variant}
          secureTextEntry={!isPasswordVisible}
          className={className}
          {...props}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: [{ translateY: -12 }],
          }}>
          {isPasswordVisible ? (
            <EyeOff size={20} color="gray" />
          ) : (
            <Eye size={20} color="gray" />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
