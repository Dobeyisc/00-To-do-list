import { type ItemId } from './types/interface';
import { useItems } from './Hooks/useItem';
import { useSEO } from './Hooks/useCEO';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import './App.css';
import { useState } from 'react';


function App() {
  const { items, addItem, removeItem, editItem } = useItems();
  const [editingItemId, setEditingItemId] = useState<ItemId | null>(null);
  const [editText, setEditText] = useState<string>('');

  useSEO({
    title: `(${items.length}) Lista de tareas`,
    description: 'Añadir, editar, eliminar elementos'
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;

    const input = elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input?.value == null) return;

    addItem(input.value);

    input.value = '';
  };


  const handleEditClick = (id: ItemId, text: string) => {
    setEditingItemId(id);
    setEditText(text);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingItemId !== null && editText.length >= 1) {
      editItem(editingItemId, editText);
      setEditingItemId(null);
      setEditText('');
  
      const input = event.currentTarget.elements.namedItem('item') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  };

  return (
    <VStack spacing={4} align="center">
      <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <Text fontSize="3xl">Lista de tareas</Text>
        <Text>Añadir</Text>

        <form onSubmit={handleSubmit} aria-label="Añadir elementos a la lista">
          <Input
            name="item"
            required
            type="text"
            placeholder="Tareas 👨‍💻"
          />
          <Button colorScheme="teal" size="sm" type="submit">
            Añadir
          </Button>
        </form>
      </Box>

      <Box w="100%">
        <Text fontSize="xl" mt={2}>
          Lista de elementos
        </Text>
        {items.length === 0 ? (
          <Text>No hay elementos</Text>
        ) : (
          <VStack align="stretch">
            {items.map((item) => (
              <Box
                key={item.id}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {editingItemId === item.id ? (
                  <form onSubmit={handleEditSubmit}>
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <Button
                      colorScheme="blue"
                      size="xs"
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </form>
                ) : (
                  <>
                    <Text>{item.text}</Text>
                    <Button
                      colorScheme="blue"
                      size="xs"
                      onClick={() => handleEditClick(item.id, item.text)}
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={() => removeItem(item.id)}
                    >
                      Eliminar
                    </Button>
                  </>
                )}
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
}
export default App;
