import { fetchTODO } from "@/lib/fetchTODO";
import Todo from "../components/Todo";
type Props = {
  params: { id: string };
};
export const revalidate = 0;
export default async function page({ params }: Props) {
  const todo = await fetchTODO(params.id);
  return todo && <Todo todo={todo} />;
}
