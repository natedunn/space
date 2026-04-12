import { Input as BaseInput } from "@base-ui/react/input"
import { forwardRef, type ComponentPropsWithoutRef } from "react"
import { cn } from "../../lib/utils"

const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<typeof BaseInput>
>(({ className, ...props }, ref) => {
  return (
    <BaseInput
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
