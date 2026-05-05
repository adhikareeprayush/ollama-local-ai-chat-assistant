import { FC, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { twMerge } from 'tailwind-merge';
import { normalizeMarkdownForDisplay } from '../../utils/normalizeMarkdown';

interface MarkdownProps {
  content: string;
  className?: string;
}

export const Markdown: FC<MarkdownProps> = ({ content, className }) => {
  const normalized = useMemo(() => normalizeMarkdownForDisplay(content), [content]);

  return (
    <ReactMarkdown
      className={twMerge('prose-chat', className)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        p: ({ children, ...props }) => (
          <p className="my-3 first:mt-0 last:mb-0 leading-relaxed" {...props}>
            {children}
          </p>
        ),
        ul: ({ children, ...props }) => (
          <ul className="my-3 list-disc space-y-1 pl-5 first:mt-0 last:mb-0" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="my-3 list-decimal space-y-1 pl-5 first:mt-0 last:mb-0" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="leading-relaxed [&>p]:my-0" {...props}>
            {children}
          </li>
        ),
        pre: ({ children, ...props }) => (
          <pre
            className="my-4 max-w-full overflow-x-auto rounded-xl border border-line bg-canvas/95 p-4 text-[13px] leading-relaxed first:mt-0 last:mb-0"
            {...props}
          >
            {children}
          </pre>
        ),
        code: ({ className, children, ...props }) => {
          const isBlock = /language-[\w-]+/.test(className || '');
          return !isBlock ? (
            <code
              className="rounded-md bg-canvas/90 px-1.5 py-0.5 font-mono text-[0.88em] text-accent-glow [overflow-wrap:anywhere]"
              {...props}
            >
              {children}
            </code>
          ) : (
            <code className={twMerge('font-mono text-[13px] leading-relaxed', className)} {...props}>
              {children}
            </code>
          );
        },
        a: ({ children, ...props }) => (
          <a
            className="font-medium text-accent underline-offset-2 hover:text-accent-glow hover:underline"
            {...props}
          >
            {children}
          </a>
        ),
        table: ({ children, ...props }) => (
          <div className="my-4 max-w-full overflow-x-auto rounded-xl border border-line">
            <table className="m-0 min-w-full border-collapse text-left text-sm" {...props}>
              {children}
            </table>
          </div>
        ),
      }}
    >
      {normalized}
    </ReactMarkdown>
  );
};
