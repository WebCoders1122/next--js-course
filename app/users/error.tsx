"use client";

export default function error({
  error,
  reset,
}: {
  error: Error & { digest?: "string" };
  reset: () => void;
}) {
  return (
    <div>
      User Fetching Error
      <br />
      <button onClick={reset}>Reset Error</button>
    </div>
  );
}
