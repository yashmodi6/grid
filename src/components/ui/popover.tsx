"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/utils/cn";

interface PopoverProps extends React.ComponentProps<typeof PopoverPrimitive.Root> {
  stayOpenOnInteraction?: boolean;
}

function Popover({
  stayOpenOnInteraction = false,
  open: openProp,
  onOpenChange,
  ...props
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  // Determine which state to use (controlled OR internal)
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
      open={open}
      onOpenChange={(next) => {
        // If stayOpenOnInteraction, only allow closing on outside click.
        if (stayOpenOnInteraction && !next && open) {
          // Radix passes `next=false` also on inner clicks/keyboard — ignore those.
          return;
        }
        setOpen(next);
      }}
    />
  );
}

function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

interface PopoverContentProps extends React.ComponentProps<typeof PopoverPrimitive.Content> {
  stayOpenOnInteraction?: boolean;
}

function PopoverContent({
  className,
  stayOpenOnInteraction = false,
  align = "center",
  sideOffset = 4,
  onPointerDownOutside,
  onInteractOutside,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        // FIXED OUTSIDE INTERACTION LOGIC
        onPointerDownOutside={(e) => {
          if (stayOpenOnInteraction) {
            // Only close if click is truly outside popover AND trigger
            const isInsidePopover = e.target.closest("[data-slot='popover-content']");
            const isInsideTrigger = e.target.closest("[data-slot='popover-trigger']");

            if (isInsidePopover || isInsideTrigger) {
              e.preventDefault();
              return;
            }
          }

          onPointerDownOutside?.(e);
        }}
        onInteractOutside={(e) => {
          if (stayOpenOnInteraction) {
            const isInsidePopover = e.target.closest("[data-slot='popover-content']");
            const isInsideTrigger = e.target.closest("[data-slot='popover-trigger']");

            if (isInsidePopover || isInsideTrigger) {
              e.preventDefault();
              return;
            }
          }

          onInteractOutside?.(e);
        }}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 z-50 w-72 rounded-md border p-4 shadow-md",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
