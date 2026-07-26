import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  GitBranch,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Users,
} from "lucide-react";

// --- helpers -----------------------------------------------------------

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

// deterministic pseudo-random intensity (0-4) so the strip looks the same every render
function cellIntensity(i) {
  const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  return Math.floor(v * 5);
}

const INTENSITY_CLASSES = [
  "bg-indigo-50",
  "bg-indigo-100",
  "bg-indigo-300",
  "bg-indigo-500",
  "bg-indigo-700",
];

// --- decorative "contribution graph" banner -----------------------------

function ContributionBanner() {
  const cells = Array.from({ length: 15 * 7 }, (_, i) => cellIntensity(i));
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-90">
      <div className="grid grid-flow-col grid-rows-7 gap-1 p-6">
        {cells.map((level, i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-sm ${INTENSITY_CLASSES[level]}`}
          />
        ))}
      </div>
    </div>
  );
}

// --- small post row for the profile's post list --------------------------

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
            # {post.category.name}
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
            <ThumbsUp className="h-3 w-3" strokeWidth={2.5} />+
            {formatCount(post.meta.likeCount)}
          </span>
          <span className="inline-flex items-center font-mono gap-1 rounded bg-rose-50 px-1.5 py-0.5 text-rose-700">
            <ThumbsDown className="h-3 w-3" strokeWidth={2.5} />-
            {formatCount(post.meta.dislikeCount)}
          </span>
        </div>
      </div>
    </article>
  );
}

// --- stat pill -------------------------------------------------------------

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:shadow">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="font-mono text-sm font-bold text-slate-900">
          {value}
        </div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}

// --- demo data -------------------------------------------------------------

const profile = {
  username: "DevPouyaGh",
  displayName: "Pouya GhazanfaryNiya",
  bio: "این متن تستی هست برای بیوگرافی کاربر لورم ایپسوم متن ساختگی و لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  avatar:
    "https://dummyjson.com/image/200x200/171923/ffffff?text=P&fontSize=64",
  location: "Tehran, Iran",
  website: "pouyagh.dev",
  joined: "Mar 2023",
  isActive: true,
  followers: 842,
};

const posts = [
  {
    id: 15,
    title:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه ",
    meta: {
      thumb:
        "https://dummyjson.com/image/400x200/6392F8/ffffff?text=Thumb+Post!&fontSize=16",
      summary: "لورم ایپسوم متن ساختگی با تولید و متون بلکه",
      likeCount: 1234,
      dislikeCount: 23,
    },
    category: { id: 1, name: "برنامه نویسی" },
  },
  {
    id: 17,
    title:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه ",
    meta: {
      thumb:
        "https://dummyjson.com/image/400x200/EF4444/ffffff?text=DB&fontSize=16",
      summary: "لورم ایپسوم متن ساختگی با تولید و متون بلکه",
      likeCount: 5023,
      dislikeCount: 112,
    },
    category: { id: 3, name: "دیتابیس" },
  },
  {
    id: 18,
    title:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه ",
    meta: {
      thumb:
        "https://dummyjson.com/image/400x200/22C55E/ffffff?text=Queue&fontSize=16",
      summary: "لورم ایپسوم متن ساختگی با تولید و متون بلکه",
      likeCount: 341,
      dislikeCount: 9,
    },
    category: { id: 1, name: "برنامه نویسی" },
  },
];

// --- page --------------------------------------------------------------

export default function ProfilePage() {
  const totalLikes = posts.reduce((s, p) => s + p.meta.likeCount, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* banner */}
      <div className="relative h-44 overflow-hidden bg-slate-900 sm:h-52">
        <ContributionBanner />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* header */}
        <div className="-mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
          <div className="relative flex-shrink-0">
            <img
              src={profile.avatar}
              alt={profile.displayName}
              className="h-28 w-28 rounded-2xl border-4 border-slate-50 object-cover shadow-lg"
            />
            <span
              className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-slate-50 ${
                profile.isActive ? "bg-emerald-500" : "bg-slate-300"
              }`}
              title={profile.isActive ? "active" : "inactive"}
            />
          </div>

          <div className="flex flex-1 items-center justify-between gap-4 pb-1">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {profile.displayName}
              </h1>
              <p className="flex items-center gap-1 font-mono text-sm text-slate-500">
                <GitBranch className="h-3.5 w-3.5" />@{profile.username}
              </p>
            </div>
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 cursor-pointer">
              Follow
            </button>
          </div>
        </div>

        {/* bio */}
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600">
          {profile.bio}
        </p>

        {/* meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </span>
          <a
            href={`https://${profile.website}`}
            className="flex items-center gap-1.5 text-indigo-600 hover:underline"
          >
            <LinkIcon className="h-3.5 w-3.5" />
            {profile.website}
          </a>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            Joined {profile.joined}
          </span>
        </div>

        {/* stats */}
        <div className="mt-6 flex gap-3">
          <Stat icon={FileText} label="Posts" value={posts.length} />
          <Stat
            icon={Users}
            label="Followers"
            value={formatCount(profile.followers)}
          />
          <Stat
            icon={ThumbsUp}
            label="Total likes"
            value={`+${formatCount(totalLikes)}`}
          />
        </div>

        {/* posts */}
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Posts
          </h2>
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
