import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

export type TocItem = { id: string; text: string; depth: number };

export async function renderMarkdown(markdown: string): Promise<{ html: string; toc: TocItem[] }> {
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];

  const headingCollector = () => {
    return (tree: unknown) => {
      visit(tree as any, "heading", (node: any) => {
        const depth = Number(node?.depth);
        if (!Number.isFinite(depth) || depth < 2 || depth > 3) return;
        const text = extractText(node).trim();
        if (!text) return;
        toc.push({ id: slugger.slug(text), text, depth });
      });
    };
  };

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(headingCollector)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return { html: String(file), toc };
}

function extractText(node: any): string {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node.children)) return node.children.map(extractText).join("");
  return "";
}

