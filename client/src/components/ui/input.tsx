import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styling with design tokens
        "bg-input-background text-text-primary border border-input-border",
        "placeholder-input-placeholder",
        "selection:bg-primary selection:text-white",

        // File input compatibility
        "file:text-text-primary file:bg-transparent file:border-0 file:h-7 file:inline-flex file:text-sm file:font-medium",

        // Layout & shape
        "flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-,box-shadow] outline-none md:text-sm",

        // Focus state
        "focus-visible:ring-2 focus-visible:ring-input-focus focus-visible:border-input-focus",

        // Validation and accessibility (invalid/error state)
        "aria-invalid:border-error aria-invalid:ring-1 aria-invalid:ring-error/30 dark:aria-invalid:ring-error/40",

        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    />
  );
}

export { Input };

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        data-slot="input"
        className={cn(
          // Base styling with design tokens
          "bg-input-background text-text-primary border border-input-border",
          "placeholder-input-placeholder",
          "selection:bg-primary selection:text-white",

          // File input compatibility
          "file:text-text-primary file:bg-transparent file:border-0 file:h-7 file:inline-flex file:text-sm file:font-medium",

          // Layout & shape
          "flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-,box-shadow] outline-none md:text-sm",

          // Focus state
          "focus-visible:ring-2 focus-visible:ring-input-focus focus-visible:border-input-focus",

          // Validation and accessibility (invalid/error state)
          "aria-invalid:border-error aria-invalid:ring-1 aria-invalid:ring-error/30 dark:aria-invalid:ring-error/40",

          // Disabled state
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

          className
        )}
        {...props}
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
        onClick={() => setShowPassword((prev) => !prev)} // ✅ TOGGLE instead of fixed true
        tabIndex={-1}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
