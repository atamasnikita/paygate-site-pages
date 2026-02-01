import { renderMarkdown } from "@/lib/markdown";
import { readLegalMarkdown, type LegalDocKey } from "@/lib/legal";

export async function LegalDocPage({ doc }: { doc: LegalDocKey }) {
  const md = await readLegalMarkdown(doc);
  const { html, toc } = await renderMarkdown(md);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10">
        <article
          className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {toc.length ? (
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-medium text-slate-900">Оглавление</div>
              <nav className="mt-3 space-y-2 text-sm">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-slate-600 hover:text-slate-900 ${item.depth === 3 ? "pl-3" : ""}`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

