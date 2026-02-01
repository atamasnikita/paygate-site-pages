import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Страница не найдена</h1>
      <p className="mt-3 text-slate-600 max-w-xl">
        Похоже, вы перешли по неверной ссылке. Проверьте адрес или вернитесь на главную.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 min-h-12"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}

