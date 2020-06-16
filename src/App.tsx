import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';

interface ToDo {
  id: string;
  name: string;
  description: string;
}

const styles = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flex: 1,
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: 'none',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: 'bold' as 'bold' },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
  },
};

const initialState = { name: '', description: '' };

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState<ToDo[]>([]);

  async function fetchTodos() {
    try {
      const todoData = (await API.graphql(graphqlOperation(listTodos))) as {
        data: { listTodos: { items: ToDo[] } };
      };
      const todoItems = todoData.data.listTodos.items;
      setTodos(todoItems);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key: string, value: string) {
    setFormState({ ...formState, [key]: value });
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { id: '', ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button type="button" style={styles.button} onClick={addTodo}>
        Create Todo
      </button>
      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
