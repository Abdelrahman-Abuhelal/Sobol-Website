import * as React from "react"

import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-3 disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            default: "bg-primary text-primary-foreground shadow-[0_12px_26px_oklch(0.44_0.095_184/0.18)] hover:-translate-y-0.5 hover:bg-[oklch(0.39_0.09_184)] hover:shadow-[0_16px_32px_oklch(0.44_0.095_184/0.22)]",
            outline: "border border-border bg-surface shadow-sm hover:border-primary/50 hover:bg-primary-soft/50 hover:text-primary",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        }

        const sizes = {
            default: "h-11 px-6 py-2",
            sm: "h-9 px-3 text-xs",
            lg: "h-14 px-8 text-base",
            icon: "h-9 w-9",
        }

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
