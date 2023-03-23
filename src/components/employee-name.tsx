export default function EmployeeName({ choice }: { choice: string }) {
  const content = choice.trim().length > 0 ? choice : "?";

  return <div className="text-6xl font-mono">{content}</div>;
}
