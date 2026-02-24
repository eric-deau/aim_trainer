export default function HeaderGuest() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Git Gud
        </h1>
        <p className="text-sm text-zinc-600">
          Sign up / log in to save runs.
        </p>
      </div>
    </header>
  );
}