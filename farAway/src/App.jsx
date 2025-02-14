import { useState } from "react";
import Form from "./components/Form";
import List from "./components/List";
import Logo from "./components/Logo";
import Stats from "./components/Stats";


function App() {

  const [items,setItems] = useState([
    { id : 1 , description : 'test1' , quantity : 1 , packed : true },
    { id : 2 , description : 'test2' , quantity : 1 , packed : true },
    { id : 3 , description : 'test3' , quantity : 1 , packed : false },
  ]);

  // footer data
  const numberOfItems = items.length;
  const numberOfPackedItems = items.filter((item) => item.packed).length;
  const percentageOfPackedItems = (numberOfPackedItems / numberOfItems) * 100;

  function onDeleteItem(id){
    const updatedList = items.filter((item) => item.id !== id);
    setItems(updatedList);
  }

  function onToggleItem(id){
    const updatedList = items.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    setItems(updatedList);
  }

  function onlearList(){


  }


  return (
    <>
      <Logo/>
      <Form items={items} setItems={setItems}/>
      <List items={items} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} onlearList={onlearList}/>
      <Stats percentageOfPackedItems={percentageOfPackedItems} numberOfPackedItems={numberOfPackedItems} numberOfItems={numberOfItems}/>
    </>
  )
}

export default App
