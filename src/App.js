import "./App.css";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/todoList/TodoList";
import { todosTypes } from "./types/todoArraysTypes";
import { getTodosFromLocalStorage } from "./utils/localStorageGetters";
import { getInProgressFromLocalStorage } from "./utils/localStorageGetters";
import { getDoneFromLocalStorage } from "./utils/localStorageGetters";
import { DragDropContext } from "react-beautiful-dnd";

// localStorage.setItem("test", "[1,2,3,4]");
// localStorage.setItem("token", "abc");
// localStorage.removeItem("token");
// localStorage.setItem("test", "[1,3,4]");
// console.log(JSON.parse(localStorage.getItem("test"))

class App extends Component {
  state = {
    todos: getTodosFromLocalStorage(),
    inProgress: getInProgressFromLocalStorage(),
    done: getDoneFromLocalStorage(),
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    }
    if (prevState.inProgress !== this.state.inProgress) {
      localStorage.setItem("inProgress", JSON.stringify(this.state.inProgress));
    }
    if (prevState.done !== this.state.done) {
      localStorage.setItem("done", JSON.stringify(this.state.done));
    }
  }

  handleChange = (e, todoId, arrayType) => {
    const value = e.target.value;
    const name = e.target.name;
    const mappedTodos = this.state[arrayType].map((todo) => {
      if (todo.id === todoId) {
        todo[name] = value;
      }
      return todo;
    });

    this.setState({ [arrayType]: [...mappedTodos] });
  };

  addTodo = (arrayType) => {
    const newTodo = { id: uuidv4(), title: "", description: "" };

    const filteredList = this.state[arrayType].filter(
      (todo) => todo.title === "" && todo.description === ""
    );

    filteredList.length > 0
      ? alert("You already have one empty note!")
      : this.setState({ [arrayType]: [...this.state[arrayType], newTodo] });
  };

  removeTodo = (arrayType, todoId) => {
    const filteredTodos = this.state[arrayType].filter(
      (todo) => todo.id !== todoId
    );

    this.setState({ [arrayType]: [...filteredTodos] });
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const filteredList = this.state[source.droppableId].filter(
      (task) => task.id !== draggableId
    );

    const draggedTask = this.state[source.droppableId].filter(
      (task) => task.id === draggableId
    );

    const updatedList = this.state[destination.droppableId];
    updatedList.push(draggedTask[0]);

    this.setState({ [source.droppableId]: [...filteredList] });
    this.setState({
      [destination.droppableId]: [...updatedList],
    });
  };

  render() {
    return (
      <div className="App">
        <div className="todo-list-wrapper">
          <div className="todo-list-container">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <TodoList
                title="To do"
                list={this.state.todos}
                arrayType={todosTypes.todos}
                handleChange={this.handleChange}
                addTodo={this.addTodo}
                removeTodo={this.removeTodo}
              />

              <TodoList
                title="In progress"
                list={this.state.inProgress}
                arrayType={todosTypes.inProgress}
                handleChange={this.handleChange}
                addTodo={this.addTodo}
                removeTodo={this.removeTodo}
              />

              <TodoList
                title="Done"
                list={this.state.done}
                arrayType={todosTypes.done}
                handleChange={this.handleChange}
                addTodo={this.addTodo}
                removeTodo={this.removeTodo}
              />
            </DragDropContext>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
