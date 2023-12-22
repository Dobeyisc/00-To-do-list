import { useState, useEffect } from 'react';
import structureItem, { ItemId } from '../types/interface';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'todoItems';

export const useItems = () => {
  const [items, setItems] = useState<structureItem[]>([]);
  
 
  useEffect(() => {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if (storedItems) {
      setItems(JSON.parse(storedItems));
      console.log('Items cargados desde localStorage:', storedItems);
    }
  }, []);

  const saveItemsToStorage = (newItems: structureItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    console.log('Items guardados en localStorage:', newItems);
  };

  const generateItemId = (): ItemId => {
    return uuidv4() as ItemId;
  };

  const addItem = (text: string) => {
    const newItem: structureItem = {
      id: generateItemId(),
      text,
      timestamp: Date.now(),
    };

    setItems((prevItems) => {
      const newItems = [...prevItems, newItem];
      saveItemsToStorage(newItems); // Guardar en localStorage
      return newItems;
    });
  };

  const removeItem = (id: ItemId) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      saveItemsToStorage(newItems); // Guardar en localStorage
      return newItems;
    });
  };
  const editItem = (id: ItemId, newText: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      );
      saveItemsToStorage(updatedItems); // Guardar en localStorage
      return updatedItems;
    });
  };

  return {
    items,
    addItem,
    removeItem,
    editItem,
  };
};
