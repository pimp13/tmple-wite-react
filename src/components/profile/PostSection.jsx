import { useState } from "react";
import useDataProvider from "../../hooks/useDataProvider";
import { envConfig } from "../../config/env";
import { formatCount } from "../../helpers/formatCount";

function PostRow({ post }) {
  return (
    <article className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md">
      <img
        src={post.meta.thumb}
        alt={post.title}
        className="h-20 w-28 flex-shrink-0 rounded-lg object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <span className="text-[11px] font-medium text-indigo-600">
            # {post?.category?.name ?? "بدون دسته"}
          </span>
          <h3 className="mt-0.5 line-clamp-1 text-sm font-bold text-slate-900">
            {post.title}
          </h3>
          <p className="line-clamp-1 text-xs text-slate-500">
            {post.meta.summary}
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-700">
            {/* <ThumbsUp className="h-3 w-3" strokeWidth={2.5} />+ */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check w-4 h-4"
              ariaHidden="true"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            {post.meta?.likeCount ? formatCount(post.meta.likeCount) : 0}
          </span>
          <span className="inline-flex items-center font-mono gap-1 rounded bg-rose-50 px-1.5 py-0.5 text-rose-700">
            {/* <ThumbsDown className="h-3 w-3" strokeWidth={2.5} />- */}
            {post.meta?.dislikeCount ? formatCount(post.meta.dislikeCount) : 0}
          </span>
        </div>
      </div>
    </article>
  );
}

export const PostSection = () => {
  const stepCountShow = 5;
  const [visibleCount, setVisibleCount] = useState(stepCountShow);

  const { loading, data: postsData } = useDataProvider({
    urlPrefix: envConfig.VITE_GO_API_URL,
    provider: "/posts",
  });

  if (loading && postsData?.data.length === 0) return <Loading />;

  //   if (!postsData?.data || postsData?.data?.length === 0)
  //     return <div className="min-h-screen p-10">پست یافت نشد</div>;

  const allPosts = postsData?.data || [];
  if (allPosts.length === 0) return <div>پست یافت نشد.</div>;
  const visibleCourses = allPosts.slice(0, visibleCount);
  const hasMore = allPosts.length > visibleCount;

  return (
    <div className="mt-8">
      <h2 className="mb-3 text-md font-semibold uppercase tracking-wide text-slate-400">
        پست ها
      </h2>
      <div className="flex flex-col gap-3">
        {visibleCourses.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setVisibleCount(allPosts.length)}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer flex items-center gap-1"
          >
            {/* آیکون ساعت */}
            <span>مشاهده بیشتر</span>
            <span>...</span>
          </button>
        </div>
      )}
    </div>
  );
};
