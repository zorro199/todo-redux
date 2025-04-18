import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, clearCompleted, TodosType } from "../store/todos-slice";
import { RootState } from "../store/store";
import TodoItem from "./TodoItem";
import "./TodoList.css";


const Todolist = () => {
    const [visibleTodos, setVisibleTodos] = useState("all");
    const dispatch = useDispatch();
    const todos = useSelector<RootState, TodosType[]>(
        (state) => state.todos.value
    );

    const activeTodos =
        todos &&
        todos.filter(
            (item: { id: number; name: string; completed: boolean }) => {
                return item.completed == false;
            }
        );
    const completedTodos =
        todos &&
        todos.filter(
            (item: { id: number; name: string; completed: boolean }) => {
                return item.completed == true;
            }
        );

    useEffect(() => {
        todos && localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const currentTodos =
        visibleTodos == "all"
            ? todos
            : visibleTodos == "active"
            ? activeTodos
            : visibleTodos == "completed"
            ? completedTodos
            : todos;

    return (
        <div className="Card">
            <div className="todo_list">
                {todos &&
                    currentTodos?.map(
                        (
                            item: {
                                id: number;
                                name: string;
                                completed: boolean;
                            },
                            index: number
                        ) => (
                            <TodoItem
                                deleteHandler={() =>
                                    dispatch(deleteTodo({ id: item.id }))
                                }
                                index={index}
                                key={item.id}
                                id={item.id}
                                completed={item.completed}
                                name={item.name}
                            />
                        )
                    )}
                <div className="controls">
                    <div>
                        <span>{currentTodos?.length | 0} item осталось </span>
                    </div>
                    <div className="segregate">
                        <button
                            className={`segregate-btn ${
                                visibleTodos == "all" && "active"
                            }`}
                            id="all"
                            onClick={() => setVisibleTodos("all")}
                        >
                            Все
                        </button>
                        <button
                            className={`segregate-btn ${
                                visibleTodos == "active" && "active"
                            }`}
                            id="active"
                            onClick={() => setVisibleTodos("active")}
                        >
                            Активные
                        </button>
                        <button
                            className={`segregate-btn ${
                                visibleTodos == "completed" && "active"
                            }`}
                            id="completed"
                            onClick={() => setVisibleTodos("completed")}
                        >
                            Завершенные
                        </button>
                    </div>
                    <div className="clear">
                        <button
                            className="clear-btn"
                            onClick={() => dispatch(clearCompleted({ todos }))}
                        >
                            Очистить завершенные
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todolist;
