"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

interface InputProps extends React.ComponentProps<"input"> {
    label?: string
    labelClassName?: string
    togglePassword?: boolean
}

function Input({ className, type, label, labelClassName, togglePassword, ...props }: InputProps) {
    const [showPassword, setShowPassword] = useState(false)

    const toggleVisibility = () => {
        setShowPassword(!showPassword)
    }

    // Determine input type based on toggle state
    const inputType = type === "password" && showPassword ? "text" : type

    return (
        <div className="relative">
            {label && (
                <label htmlFor={props.id} className={cn("ml-0.5", labelClassName)}>
                    {label}
                </label>
            )}
            <div className="flex items-center">
                <input
                    type={inputType}
                    data-slot="input"
                    className={cn(
                        "file:text-foreground placeholder:text-muted-foreground placeholder:text-xs selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-full bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pr-12 pl-4",
                        className
                    )}
                    {...props}
                />
                {togglePassword && type === "password" && (
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute right-3 h-fit text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                        ) : (
                            <EyeIcon className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}

export { Input }