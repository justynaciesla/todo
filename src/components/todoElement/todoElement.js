import React from "react";
import { Draggable } from "react-beautiful-dnd";
import bin from "../../assets/icons/trash-bin.png";
import drag from "../../assets/icons/drag.png";
import "./todoElement.css";

const TodoElement = ({
  todo: { id, title, description },
  arrayType,
  handleChange,
  removeTodo,
  index,
}) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <li
          className="todo-element"
          ref={provided.innerRef}
          // key={id}
          {...provided.draggableProps}
        >
          <div className="input-remove-btn__wrapper">
            <input
              type="text"
              name="title"
              className="todo-title-input"
              placeholder="Title"
              autoComplete="off"
              required
              value={title}
              onChange={(e) => handleChange(e, id, arrayType)}
            />

            <button
              className="img__wrapper"
              onClick={() => removeTodo(arrayType, id)}
            >
              <img className="remove__img" src={bin} alt="Remove Todo" />
            </button>
          </div>
          <div className="textarea_image_wrapper">
            <textarea
              type="text"
              name="description"
              className="todo_textarea"
              placeholder="Description"
              value={description}
              cols={10}
              rows={4}
              onChange={(e) => handleChange(e, id, arrayType)}
            />

            <div {...provided.dragHandleProps} className="img_drag__wrapper">
              <img
                title="Grab here"
                className="drag__img"
                src={drag}
                alt="drag and drop"
              />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default TodoElement;
