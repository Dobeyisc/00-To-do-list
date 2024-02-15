import {useSEO}  from './Hooks/useCEO';
import Item from './components/Item';


function App() {  

  useSEO({ title: `(${Item.length}) Lista de tareas`, description: 'Añadir, editar, eliminar elementos' });

  return (
   <Item />
  )
}   

export default App;
