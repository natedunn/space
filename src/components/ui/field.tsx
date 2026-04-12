import { Field as BaseField } from "@base-ui/react/field"
import { forwardRef, type ComponentPropsWithoutRef } from "react"
import { cn } from "../../lib/utils"

const FieldRoot = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof BaseField.Root>
>(({ className, ...props }, ref) => {
  return (
    <BaseField.Root
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    />
  )
})
FieldRoot.displayName = "FieldRoot"

const FieldError = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof BaseField.Error>
>(({ className, ...props }, ref) => {
  return (
    <BaseField.Error
      ref={ref}
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  )
})
FieldError.displayName = "FieldError"

const FieldDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof BaseField.Description>
>(({ className, ...props }, ref) => {
  return (
    <BaseField.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FieldDescription.displayName = "FieldDescription"

export { FieldRoot, FieldError, FieldDescription }
