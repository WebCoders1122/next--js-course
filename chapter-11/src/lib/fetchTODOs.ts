export async function fetchTODOs() {
  const res = await fetch("http://localhost:8080/todos");
  if (!res.ok) return null;
  const data: TodoType[] = await res.json();
  return data;
}
