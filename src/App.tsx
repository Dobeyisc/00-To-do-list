import { ItemId } from './types/interface';
import { useItems } from './Hooks/useItem';
import { useSEO } from './Hooks/useCEO';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import './App.css';

function App() {
  const { items, addItem, removeItem } = useItems();

  useSEO({
    title: `(${items.length}) Lista de tareas`,
    description: 'Añadir, editar, eliminar elementos'
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;

    const input = elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    addItem(input.value);

    input.value = '';
  };

  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id);
  };

  return (
    <VStack spacing={4} align="center">
      <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <Text fontSize="2xl">Lista de tareas</Text>
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
        <Text fontSize="xl" mt={4}>
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
                <Text>{item.text}</Text>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={createHandleRemoveItem(item.id)}
                >
                  Eliminar
                </Button>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
}

export default App;
