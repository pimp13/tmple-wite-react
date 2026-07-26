import { ThumbsUp, ThumbsDown } from "lucide-react";
import { formatCount } from "../helpers/formatCount";

export function PostCard({ post }) {
  const { title, meta, author, category, is_active } = post;

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-slate-200 hover:-translate-y-0.5">
      {/* thumb */}
      <div className="relative">
        <img
          src={meta.thumb}
          alt={title}
          className="h-44 w-full object-cover"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-white/90 px-3 py-1 font-mono text-xs font-medium text-indigo-700 backdrop-blur">
          # {category?.name ?? "Public"}
        </span>
        {!is_active && (
          <span className="absolute top-3 right-3 rounded-full bg-slate-900/80 px-2 py-1 font-mono text-[10px] tracking-wide text-white">
            draft
          </span>
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
          {meta.summary}
        </p>

        {/* footer: author + diff-style reactions */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                is_active ? "bg-emerald-500" : "bg-slate-300"
              }`}
              title={is_active ? "active" : "inactive"}
            />
            <span className="font-mono text-xs text-slate-600">
              @{author.username}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-700">
              <ThumbsUp className="h-3 w-3" strokeWidth={2.5} />+
              {meta.likeCount ? formatCount(meta.likeCount) : 0}
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-rose-50 px-1.5 py-0.5 text-rose-700">
              <ThumbsDown className="h-3 w-3" strokeWidth={2.5} />-
              {meta.dislikeCount ? formatCount(meta.dislikeCount) : 0}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
