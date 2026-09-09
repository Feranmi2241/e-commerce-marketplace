import * as React from "react"

import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

function PaginationItem(props) {
  return <li data-slot="pagination-item" {...props} />
}

function PaginationLink({ className, isActive, size = "icon", ...props }) {
  const sizeClass =
    size === "default"
      ? "h-9 min-w-9 px-3"
      : size === "sm"
        ? "h-8 min-w-8 px-2"
        : "h-9 min-w-9 px-2"

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        "flex items-center justify-center rounded-md border text-sm transition-colors",
        isActive
          ? "border-brand-orange bg-orange-50 text-brand-orange"
          : "border-transparent bg-transparent text-text-secondary hover:border-border-light hover:bg-bg-secondary hover:text-text-primary",
        sizeClass,
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, text = "Previous", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" className="h-4 w-4" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, text = "Next", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" className="h-4 w-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
