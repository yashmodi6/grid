import React from "react";

export function GridLogo({ size = 500, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <rect x="74" y="74" width="160" height="160" rx="32" fill="currentColor" opacity="0.9" />
      <rect x="265" y="74" width="160" height="160" rx="32" fill="currentColor" opacity="0.9" />
      <rect x="265" y="265" width="160" height="160" rx="32" fill="currentColor" opacity="0.9" />
      <rect x="74" y="265" width="160" height="160" rx="32" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
