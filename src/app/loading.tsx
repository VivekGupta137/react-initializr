"use client"

import { Spinner } from "@nextui-org/spinner"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="bg-[hsl(var(--background))] h-lvh w-full flex items-center justify-center">
      <Spinner size="md" color="primary" />
  </div>
  }