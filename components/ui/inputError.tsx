import React, { ReactNode } from "react"

export default function InputError({
  children,
}: {
  children: ReactNode | string
}) {
  return <div className="mt-2 text-sm text-red-500">{children}</div>
}
