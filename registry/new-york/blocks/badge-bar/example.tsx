"use client"

import * as React from "react"
import { BadgeBar, BadgeItem } from "./badge-bar"

export default function BadgeBarExample() {
  const [items, setItems] = React.useState<BadgeItem[]>([
    { text: "React" },
    { text: "TypeScript" },
    { text: "Next.js", link: "https://nextjs.org" },
    { text: "Tailwind CSS", link: "https://tailwindcss.com" },
    { text: "Shadcn UI" },
    { text: "MobX" },
  ])

  const handleCheck = (item: BadgeItem, index: number) => {
    console.log("Clicked:", item, "at index", index)
  }

  const handleDelete = (item: BadgeItem, index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Badge Bar</h3>
        <BadgeBar list={items.slice(0, 3)} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Badge Bar with Click Handler
        </h3>
        <BadgeBar list={items.slice(0, 3)} onCheck={handleCheck} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Badge Bar with Delete Handler
        </h3>
        <BadgeBar list={items} onDelete={handleDelete} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Badge Bar with Links and Delete
        </h3>
        <BadgeBar list={items} onCheck={handleCheck} onDelete={handleDelete} />
      </div>
    </div>
  )
}
