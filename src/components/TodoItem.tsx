import "./TodoList.css";
import { useDispatch } from "react-redux";
import IconCross from "../assets/iconCross.svg";
import { completeTodo } from "../store/todos-slice";

export type TodoProps = {
    id: number;
    name: string;
    deleteHandler: () => {};
    index: number;
    completed: boolean;
};

const TodoItem = ({ id, name, deleteHandler, completed }: TodoProps) => {
    const dispatch = useDispatch();

    function completedHandler() {
        completed = !completed;
        dispatch(completeTodo({ id: id, completed: completed }));
    }

    return (
        <div className="todo_item">
            <div
                className="checkbox_container"
                style={{
                    width: "3rem",
                    height: "3rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <button
                    onClick={completedHandler}
                    className={`${completed ? "checkbox-checked" : "checkbox"}`}
                ></button>
            </div>
            <div
                style={{ flex: "1", padding: "10px" }}
                className={`${completed ? "todo--completed" : ""}`}
            >
                {name}
            </div>
            <div>
                <button className="todo_item--btn" onClick={deleteHandler}>
                    <img src={IconCross}></img>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
