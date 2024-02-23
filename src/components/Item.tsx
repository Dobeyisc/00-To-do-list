import { Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,Box, Grid, GridItem, Textarea, Button, Input, Text, VStack, 
  Flex} from '@chakra-ui/react';
import { useState } from 'react';
import { ItemId } from '../types/interface';
import { useItems } from '../Hooks/useItem';
import { useSEO } from '../Hooks/useCEO';

const Item = () => {

  const { items, addItem, removeItem, editItem } = useItems();
  const [editingItemId, setEditingItemId] = useState<ItemId | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [newItemText, setNewItemText] = useState<string>('');
  const [newItemDescription, setNewItemDescription] = useState<string>('');

  useSEO({ title: `(${items.length}) Lista de tareas`, description: 'Añadir, editar, eliminar elementos' });

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
    }
  };

  const handleAddItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newItemText.length >= 1) {
      addItem(newItemText);
      setNewItemText('');
      const input = event.currentTarget.elements.namedItem('newItem') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  };

  const handleAddItemDescription = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newItemDescription.length >= 1) {
      addItem(newItemDescription);
      setNewItemDescription('');
      const input = event.currentTarget.elements.namedItem('newDescription') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  };

  return (
    <Flex 
    height="100vh"
    align="center"
    justify="center"
    >
    <Grid templateColumns='repeat(5, 1fr)' gap={2}>
      <GridItem colSpan={2}>
        <VStack spacing={2} align="center">
          <Box p={4} borderWidth="2px" borderRadius="lg" boxShadow="md">
            <Text as="b" fontSize="4xl">Lista de tareas</Text>
            <Text p={4} fontSize="2xl">Añadir</Text>
            <form onSubmit={handleAddItem} aria-label="Añadir elementos a la lista">
              <Input
                name="newItem"
                required
                type="text"
                placeholder="Nueva tarea 👨‍💻"
                onChange={(e) => setNewItemText(e.target.value)}
              />
            </form>
            <Text p={4} fontSize="2xl">Descripcion</Text>
            <form onSubmit={handleAddItemDescription}>
              <Textarea
                name="newItemDescription"
                placeholder="Descripción de la tarea"
                onChange={(e) => setNewItemDescription(e.target.value)}
              />
              <Button mt={4} colorScheme="teal" size="sm" type="submit">
                Añadir
              </Button>
            </form>
          </Box>
        </VStack>
      </GridItem>
  
      <GridItem colStart={4} colEnd={6}>
        <Accordion>
          {items.map((item) => (
            <AccordionItem key={item.id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    {item.text}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
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
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </GridItem>
    </Grid>
    </Flex>
  )};
  
export default Item;
