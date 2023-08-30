import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {

  const[value, setvalue] = useState('')
  const [todos, settodos] = useState([])
  


  const handlechange = (e) => {
    setvalue(e.target.value)
    
  }
  const btnclick = (e) => {
    e.preventDefault();
    let todo
    if (value !== "") {
        todo = {
        name: value,
        id: Date.now(),
        iscomplete: false,
      };
      
      settodos((prev) => [todo, ...prev]);
      setvalue('');
      fetch('/api/v1/todos', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer Dff5-6bvSYo8_ExUaRXgJ38tgZ_9-7dntIC0EQUt8nXe89f_eA`,
        },
        body: JSON.stringify([todo]), // Send only the new todo
      }).then(res => {
        if(res.ok == true)return res.json()
      }).then(res => {
      })
    } else {
      alert('Enter something');
    }
  
  };

  const getitems = () => {
    fetch('/api/v1/todos', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer Dff5-6bvSYo8_ExUaRXgJ38tgZ_9-7dntIC0EQUt8nXe89f_eA`,
      },
    }).then(res => {
      
       return res.json()
    }).then(res => {
      settodos(res.items)
    })
  }
console.log(todos)

  return (
    <div className="App">
  <form onSubmit={btnclick}>
    <input 
      type="text"
      value={value} 
      onChange={(e) => handlechange(e)}
    />
    <button >Submit</button>
  </form>
  
<div className="todo">
    <h1 id='plan_txt'>Your plan</h1>
    <button type='submit' onClick={() => getitems()}>get</button>
{todos.map((item) => (
  <div className="full">
  <div className="progress">
<div className="each_todo">
      <h1>{item.name}</h1>
      <div className="buttons">
        <button>delete</button>
        <button>Complete</button>
      </div>
  </div>
  </div>
  <div className="completed">

  </div>
  
  </div>
  ))}
</div>
  
</div>
  );
}

export default App;
