export default function getFormattedDate(date: string): string {
  return Intl.DateTimeFormat("us-en", { dateStyle: "medium" }).format(
    new Date(date)
  );
}
