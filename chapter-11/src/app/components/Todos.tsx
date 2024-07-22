import { fetchTODOs } from "@/lib/fetchTODOs";
import Todo from "./Todo";

const initialState: TodoType[] = [
  {
    userId: 0,
    title: "",
    completed: false,
    id: 0,
  },
];

const Todos = async () => {
  const todos = await fetchTODOs();
  return <>{todos && todos.map((todo) => <Todo todo={todo} />)}</>;
};
export default Todos;
