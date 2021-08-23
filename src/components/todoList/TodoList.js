import React from "react";
import TodoElement from "../todoElement/todoElement";
import { Droppable } from "react-beautiful-dnd";
import plus from "../../assets/icons/plus.png";
import "./TodoList.css";

const TodoList = ({
  title,
  list,
  arrayType,
  handleChange,
  addTodo,
  removeTodo,
}) => {
  return (
    <Droppable droppableId={arrayType}>
      {(provided) => (
        <div
          className="todo-list__wrapper"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="todo-list__header">
            <h3>{title}</h3>
          </div>

          <div className="todo-list">
            <ul>
              {provided.placeholder}
              {list.map((todo, index) => {
                return (
                  <TodoElement
                    key={todo.id}
                    index={index}
                    todo={todo}
                    handleChange={handleChange}
                    removeTodo={removeTodo}
                    arrayType={arrayType}
                  />
                );
              })}
            </ul>

            <div className="add-button__wrapper">
              <button onClick={() => addTodo(arrayType)}>
                <img className="add-new__img" src={plus} alt="Add" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
