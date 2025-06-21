import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
  import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/Redux/Store";
import { toggleTheme } from "@/Redux/ReduxSlices/themeSlice";

function ThemeChanger({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  const isDark = theme === "dark";

  return (
  <SwitchPrimitive.Root
      checked={isDark}
      onCheckedChange={() => dispatch(toggleTheme())}
      className={cn(
        "relative peer inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
        "bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800",
        "transition-all duration-300 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "shadow-sm dark:shadow-md",
        className
      )}
      {...props}
    >
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 w-full">
        <Sun className="size-4 text-yellow-500/80 dark:text-yellow-500/30 transition-colors duration-300" />
        <Moon className="size-4 text-gray-700/30 dark:text-gray-300/80 transition-colors duration-300" />
      </div>

      {/* Thumb with icon */}
      <SwitchPrimitive.Thumb
        asChild
        className={cn(
          "pointer-events-none block size-7 rounded-full",
          "bg-gray-500 dark:bg-gray-900",
          "shadow-lg ring-0 transition-transform duration-300 ease-in-out",
          "flex items-center justify-center overflow-hidden",
          isDark ? "translate-x-8" : "translate-x-0"
        )}
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ scale: 0.8, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {isDark ? (
                <Moon className="size-4 text-gray-300" />
              ) : (
                <Sun className="size-4 text-yellow-500" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { ThemeChanger };
