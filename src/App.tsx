import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    id: number;
    value: string;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue);

    const newTodo: Todo = {
      id: todos.length,
      value: inputValue,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const copyTodos = [...todos];

    copyTodos.map((todo) => {
      if (todo.id === id) {
        todo.value = inputValue;
      }
      return todo;
    });

    setTodos(copyTodos);
  };
  const handleChecked = (id: number, checked: boolean) => {
    // todo配列から今回該当のtodo要素のcheckedを反転させる
    const copyTodos = [...todos];

    copyTodos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    // その配列をsetTodoで置き換える
    setTodos(copyTodos);
  };

  const handleDelete = (id: number) => {
    // idと一致していない配列だけに絞る
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };
  return (
    <div className="App">
      <div>
        <h2>Todo App With Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" className="submitButton" value="作成" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.value}
                disabled={todo.checked}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              {/* チェックボックスをクリックしたら状態を変化させたいため関数を定義する */}
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              {/* ボタンをクリックしたらクリックした項目を削除させる処理を記載 */}
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
