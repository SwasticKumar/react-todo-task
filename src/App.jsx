
// import Todo from './Pages/Todo';
import Todo from "./components/Todo";
import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("Not Completed");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (taskName.trim() === "" || description.trim() === "") {
      return;
    }

    if (editMode) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, taskName, description, status };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditMode(false);
      setEditTodoId(null);
    } else {
      const newTodo = {
        id: todos.length + 1,
        taskName,
        description,
        status: "Not Completed",
      };
      setTodos([...todos, newTodo]);
    }

    setTaskName("");
    setDescription("");
    setStatus("Not Completed");
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTaskName(todoToEdit.taskName);
      setDescription(todoToEdit.description);
      setStatus(todoToEdit.status);
      setEditMode(true);
      setEditTodoId(id);
    }
  };

  const filterTodos = () => {
    switch (filter) {
      case "Completed":
        return todos.filter((todo) => todo.status === "Completed");
      case "Not Completed":
        return todos.filter((todo) => todo.status === "Not Completed");
      default:
        return todos;
    }
  };

  return (
    <>
   
      <div className="container mt-md-5">
        
        <h1 className="text-center mt-2 text-success" id="tittle">
          My Todo List
        </h1>
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              className="my-4 rounded-3 border-success form-control"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              placeholder="Todo Name"
              aria-label="Todo Name"
            />

            <input
              type="text"
              class=" mx-5 my-4 rounded-3 border-success form-control"
              placeholder="Todo Description"
              aria-label="Todo Description "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button
              class="btn bg-success btn-primary px-5 my-4 rounded-3"
              onClick={addTodo}
            >
              {editMode ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </form>

        <div className="input-group">
          <h4>My Todos</h4>

          <div className="ms-auto">
            <label htmlFor="filter">
              <h4>Status Filter : </h4>
            </label>
            <select
              className="mx-2 text-white rounded-2"
              style={{background:"#FF69B4"}}
              value={filter}
              name="filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All" className=" text-black bg-light">
                All
              </option>
              <option
                value="Completed"
                className="complete bg-success text-white"
              >
                Completed
              </option>
              <option value="Not Completed" className="bg-danger text-white">
                Not Completed
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="container mt-4 d-grid">
        <div className="row row-cols-1 row-cols-md-2 g-4 row-cols-lg-3 ">
          {filterTodos().map((todo) => (
            <div className="col" key={todo.id}>
              <Todo
                todo={todo}
                updateStatus={updateStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            </div>
          ))}
        </div>
        
      </div>
      
    </>
  );
}

export default App;
