export async function fetchTODO(id: string) {
  const res = await fetch("http://localhost:8080/todos" + "/" + id);
  if (!res.ok) return null;
  const data: TodoType = await res.json();
  return data;
}
