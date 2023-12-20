import { useState } from "react"
import { Item } from "../App.tsx"
import structureItem from "../types/interface.ts"

export const useItems = () => {
  const [items, setItems] = useState<structureItem[]>([])

  const addItem = (text: string) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      text,
      timestamp: Date.now()
    }

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id)
    })
  }

  return {
    items,
    addItem,
    removeItem
  }
}