import "./App.css";
import Todolist from "./components/TodoList";
import { useDispatch } from "react-redux";
import { addTodo } from "./store/todos-slice";
import React, { useState } from "react";
import Header from "./components/Header";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");

    const addTodoHandler = () => {
        if (!name) {
            alert("You have to entere a name");
            return;
        }
        dispatch(addTodo({ id: Math.random() * 1000, name, completed: false }));
        setName("");
    };

    return (
        <div className="container" >
            <Header />
            <div className="new_todo" >
                <div
                    className="checkbox_container"
                    style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                ></div>
                <input
                    required
                    value={name}
                    type="text"
                    placeholder="Создать задачу.."
                    onChange={(e) => setName(e.target.value)}
                />
                <div>
                    <button className="new_todo-btn" onClick={addTodoHandler}>
                        Add
                    </button>
                </div>
            </div>
            <Todolist />
        </div>
    );
};

export default App;
