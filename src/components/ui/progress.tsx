"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"
import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Displays a horizontal progress bar with customizable styling and progress value.
 *
 * Renders a styled progress indicator that visually represents the completion percentage based on the {@link value} prop.
 *
 * @param value - The current progress percentage (0–100). If omitted or falsy, the progress defaults to 0%.
 */
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full",
        //Modified classes
        "border bg-white",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-pink-400 h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
