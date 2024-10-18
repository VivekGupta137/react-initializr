"use client"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="bg-[hsl(var(--background))] h-lvh w-full flex items-center justify-center">
      <div className="h-5 w-5 rounded-full border-dashed border-4 animate-spinner-linear-spin border-[#58C4DC]"></div>
  </div>
  }