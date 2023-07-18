import { useState } from "react";

function useTodos<ItemType>(): [ItemType[], (value: ItemType) => void] {
  const [todos, setTodos] = useState<ItemType[]>([]);

  const addTodo = (todoValue: ItemType) => {
    setTodos((curr) => [...curr, todoValue]);
  };

  return [todos, addTodo];
}

const TodoList = () => {
  const [todos, addTodo] = useTodos<string>();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      todo?: HTMLInputElement;
    };
    const todoValue = elements.todo?.value;
    console.log(elements);

    if (!todoValue) return;
    addTodo(todoValue);
  };

  return (
    <section>
      <h2>To do List</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo" />
        <input type="text" name="todo" />
        <button>Ajouter</button>
      </form>
      {todos.map((todo: string, index: number) => (
        <li key={index}>{todo}</li>
      ))}
    </section>
  );
};

export default TodoList;
