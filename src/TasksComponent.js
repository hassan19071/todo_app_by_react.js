import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useRef, useState } from "react";
import NoTasks from "./NoTasks";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_NEW_TASK":
      return [...state, action.value];
    case "UPDATE_CHECKOUT":
      return state.map((el) => {
        return el.id === action.value.id ? (el = action.value) : el;
      });
    case "DELETE_TASK":
      return state.filter((el) => {
        return el.id !== action.value.id;
      });

    default:
      break;
  }

  return state;
}

export default function Tasks() {
  let [newTask, setNewTask] = useState("");
  let [showAddInput, setShowAddInput] = useState(false);
  let [allTasks, dispatch] = useReducer(reducer, []);
  let date = new Date();
  let today = date.toDateString();
  let [taskDate, setTaskDate] = useState(today);
  let [idCount, setIdCount] = useState(0);
  let inputRef = useRef();
  let compeltedTasks = allTasks.filter((e) => {
    return e.compelete === true;
  });
  let unCompeltedTasks = allTasks.filter((e) => {
    return e.compelete === false;
  });

  let [showStatusTasks, setShowStatusTasks] = useState(0);

  function handleShowingForm() {
    setShowAddInput(!showAddInput);
  }

  function addNewTask(e) {
    e.preventDefault();
    setIdCount(idCount + 1);
    if (newTask) {
      dispatch({
        type: "ADD_NEW_TASK",
        value: { task: newTask, compelete: false, date: taskDate, id: idCount },
      });
      setNewTask("");
      setShowAddInput(false);
    }
  }

  function deleteTask(task) {
    dispatch({
      type: "DELETE_TASK",
      value: { ...task },
    });
  }

  function handleCheckout(e, task) {
    dispatch({
      type: "UPDATE_CHECKOUT",
      value: { ...task, compelete: e },
    });
  }

  return (
    <div className="todo-app">
      <div className="container px-lg-5">
        <div className="project-container">
          <div className="logo">
            <h1>Todo</h1>
          </div>
          <div className="head">
            <div className="row align-items-center flex-sm-row flex-column-reverse">
              <div className="col-sm-8  mt-sm-0 mt-3">
                <div className="date-types">
                  <div className="today-date">
                    <h3>
                      <FontAwesomeIcon icon="fa-regular fa-calendar-days" />{" "}
                      Today, {today}
                    </h3>
                  </div>
                  <div className="types-lists">
                    <ul className="list-unstyled d-flex mb-0 mt-4">
                      <li
                        className={showStatusTasks === 0 ? "active" : ""}
                        onClick={() => setShowStatusTasks(0)}
                      >
                        All
                      </li>
                      <li
                        className={showStatusTasks === 1 ? "active" : ""}
                        onClick={() => setShowStatusTasks(1)}
                      >
                        Compeleted
                      </li>
                      <li
                        className={showStatusTasks === 2 ? "active" : ""}
                        onClick={() => setShowStatusTasks(2)}
                      >
                        Uncompeleted
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="new-task text-sm-end">
                  <button type="button" onClick={handleShowingForm}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" /> New Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="tasks-list">
            {showStatusTasks === 0 &&
              allTasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className="task d-flex justify-content-between"
                  >
                    <div className="d-flex">
                      <div className="checkbox-wrapper-33">
                        <label className="checkbox">
                          <input
                            className="checkbox__trigger visuallyhidden"
                            id={task.id}
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckout(e.target.checked, task)
                            }
                            checked={task.compelete}
                          />
                          <span className="checkbox__symbol">
                            <svg
                              aria-hidden="true"
                              className="icon-checkbox"
                              width="28px"
                              height="28px"
                              viewBox="0 0 28 28"
                              version="1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4 14l8 7L24 7"></path>
                            </svg>
                          </span>
                        </label>
                      </div>
                      <div className="info px-2">
                        <h4 className={task.compelete ? "hide" : ""}>
                          {task.task}
                        </h4>
                        {!task.compelete && (
                          <div className="date-of-task d-flex align-items-center">
                            <div>
                              <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                            </div>
                            <div>
                              <span>{task.date}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="trash">
                      <FontAwesomeIcon
                        icon="fa-solid fa-trash-can"
                        onClick={() => deleteTask(task)}
                      />
                    </div>
                  </div>
                );
              })}

            {showStatusTasks === 1 &&
              compeltedTasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className="task d-flex justify-content-between"
                  >
                    <div className="d-flex">
                      <div className="checkbox-wrapper-33">
                        <label className="checkbox">
                          <input
                            className="checkbox__trigger visuallyhidden"
                            id={task.id}
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckout(e.target.checked, task)
                            }
                            checked={task.compelete}
                          />
                          <span className="checkbox__symbol">
                            <svg
                              aria-hidden="true"
                              className="icon-checkbox"
                              width="28px"
                              height="28px"
                              viewBox="0 0 28 28"
                              version="1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4 14l8 7L24 7"></path>
                            </svg>
                          </span>
                        </label>
                      </div>
                      <div className="info px-2">
                        <h4 className={task.compelete ? "hide" : ""}>
                          {task.task}
                        </h4>
                        {!task.compelete && (
                          <div className="date-of-task d-flex align-items-center">
                            <div>
                              <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                            </div>
                            <div>
                              <span>{task.date}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="trash">
                      <FontAwesomeIcon
                        icon="fa-solid fa-trash-can"
                        onClick={() => deleteTask(task)}
                      />
                    </div>
                  </div>
                );
              })}
            {showStatusTasks === 2 &&
              unCompeltedTasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className="task d-flex justify-content-between"
                  >
                    <div className="d-flex">
                      <div className="checkbox-wrapper-33">
                        <label className="checkbox">
                          <input
                            className="checkbox__trigger visuallyhidden"
                            id={task.id}
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckout(e.target.checked, task)
                            }
                            checked={task.compelete}
                          />
                          <span className="checkbox__symbol">
                            <svg
                              aria-hidden="true"
                              className="icon-checkbox"
                              width="28px"
                              height="28px"
                              viewBox="0 0 28 28"
                              version="1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M4 14l8 7L24 7"></path>
                            </svg>
                          </span>
                        </label>
                      </div>
                      <div className="info px-2">
                        <h4 className={task.compelete ? "hide" : ""}>
                          {task.task}
                        </h4>
                        {!task.compelete && (
                          <div className="date-of-task d-flex align-items-center">
                            <div>
                              <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                            </div>
                            <div>
                              <span>{task.date}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="trash">
                      <FontAwesomeIcon
                        icon="fa-solid fa-trash-can"
                        onClick={() => deleteTask(task)}
                      />
                    </div>
                  </div>
                );
              })}

            {allTasks.length === 0 && showStatusTasks === 0 && (
              <NoTasks description="no tasks to show!" />
            )}
            {compeltedTasks.length === 0 && showStatusTasks === 1 && (
              <NoTasks description="no comperleted tasks to show!" />
            )}
            {unCompeltedTasks.length === 0 && showStatusTasks === 2 && (
              <NoTasks description="no uncomperleted tasks to show!" />
            )}
          </div>
          <div className="tasks-numbers position-absolute">
            <div className="details d-flex justify-content-around">
              <div className="all">All : {allTasks.length}</div>
              <div className="compeleted ">
                Compeleted : {compeltedTasks.length}
              </div>
              <div className="all">
                Uncompeleted : {unCompeltedTasks.length}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddInput && (
        <div className="form position-fixed" onClick={handleShowingForm}>
          <div className="add-new-task" onClick={(e) => e.stopPropagation()}>
            <form>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Type your task here.."
                className="w-100"
                ref={inputRef}
              />
              <label className="me-3">Choose date </label>
              <input
                type="datetime-local"
                value={taskDate}
                className="mt-3"
                onChange={(e) => setTaskDate(e.target.value)}
              />
              <div className="btns mt-3">
                <button type="button" onClick={handleShowingForm}>
                  Cancel
                </button>
                <button type="submit" onClick={addNewTask}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
