import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Bases using design tokens
        "bg-input-background text-text-primary border border-input-border",
        "placeholder-input-placeholder",
        "selection:bg-primary selection:text-white",

        // Layout
        "flex w-full min-h-16 rounded-md px-3 py-2 text-base shadow-xs transition-,box-shadow] outline-none md:text-sm",

        // Focus styles
        "focus-visible:ring-2 focus-visible:ring-input-focus focus-visible:border-input-focus",

        // Validation (error state)
        "aria-invalid:border-error aria-invalid:ring-1 aria-invalid:ring-error/30 dark:aria-invalid:ring-error/40",

        // Disabled styles
        "disabled:cursor-not-allowed disabled:opacity-50",

        // Allow passing in additional className
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
