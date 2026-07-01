import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-white/80">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white",
            "placeholder:text-white/30 outline-none transition-all",
            "focus:border-violet-400/60 focus:bg-white/10 focus:ring-2 focus:ring-violet-400/20",
            error && "border-red-400/60 focus:border-red-400/60 focus:ring-red-400/20",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );
  }
);
FormField.displayName = "FormField";
