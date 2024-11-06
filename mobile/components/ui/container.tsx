import type { ViewRef } from "@rn-primitives/types";
import * as React from "react";
import { View, ViewProps } from "react-native";
import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/utils";

const Container = React.forwardRef<ViewRef, ViewProps>(
  ({ className, ...props }, ref) => (
    <TextClassContext.Provider value="text-foreground">
      <View
        ref={ref}
        className={cn(
          "p-4 bg-secondary/30 w-screen min-h-screen flex-1",
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  )
);
Container.displayName = "Container";

export { Container };
