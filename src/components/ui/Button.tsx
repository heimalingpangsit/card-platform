import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5",
          "font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50",
          variant === "primary" &&
            "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:brightness-110 active:scale-[0.98]",
          variant === "ghost" &&
            "border border-white/10 bg-white/5 text-white hover:bg-white/10",
          variant === "danger" &&
            "bg-red-500/90 text-white hover:bg-red-500 active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
