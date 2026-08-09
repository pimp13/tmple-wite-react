import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  GitBranch,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Users,
  CheckIcon,
  MoreHorizontalIcon,
  ClockIcon,
} from "lucide-react";
import { useState } from "react";
import { Loading } from "../components/ui/Loading";
import { FancyInput } from "../components/ui/Input";
import { EditProfileSecttion } from "../components/profile/EditProfileSection";
import useDataProvider from "../hooks/useDataProvider";
import { envConfig } from "../config/env";
import { PostSection } from "../components/profile/PostSection";

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

// --- stat pill -------------------------------------------------------------

function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:shadow">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        {icon}
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
  location: "تهران، ایران",
  website: "pouyagh.dev",
  joined: "مهر 1400",
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
  const [activeTab, setActiveTab] = useState("courses");
  const [isLoading, setIsLoading] = useState(false);

  const totalLikes = posts.reduce((s, p) => s + p.meta.likeCount, 0);

  const tabs = [
    { key: "courses", label: "دوره های من" },
    { key: "edit", label: "ویرایش پروفایل" },
    { key: "weblog", label: "وبلاگ من" },
  ];

  const handleTabChange = (key) => {
    if (key === activeTab) return; // اگر همون تب بود کاری نکن

    setIsLoading(true);

    // شبیه‌سازی لود (اگر داده واقعی داری، اینجا fetch کن)
    setTimeout(() => {
      setActiveTab(key);
      setIsLoading(false);
    }, 600); // مدت زمان لود رو اینجا تنظیم کن
  };

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
              دنبال کردن
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
              className="lucide lucide-map-pin h-3.5 w-3.5"
              ariaHidden="true"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {profile.location}
          </span>
          <a
            href={`https://${profile.website}`}
            className="flex items-center gap-1.5 text-indigo-600 hover:underline"
          >
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
              className="lucide lucide-link h-3.5 w-3.5"
              ariaHidden="true"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            {profile.website}
          </a>
          <span className="flex items-center gap-1.5">
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
              className="lucide lucide-calendar h-3.5 w-3.5"
              ariaHidden="true"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            عضو: {profile.joined}
          </span>
        </div>

        {/* stats */}
        <div className="mt-6 flex gap-3">
          <Stat
            icon={
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
                className="lucide lucide-file-text h-4 w-4"
                ariaHidden="true"
              >
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
            }
            label="Posts"
            value={posts.length}
          />
          <Stat
            icon={
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
                className="lucide lucide-file-text h-4 w-4"
                ariaHidden="true"
              >
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
            }
            label="Followers"
            value={formatCount(profile.followers)}
          />
          <Stat
            icon={
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
                className="lucide lucide-file-text h-4 w-4"
                ariaHidden="true"
              >
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
            }
            label="Total likes"
            value={`+${formatCount(totalLikes)}`}
          />
        </div>

        {/* Tabs */}
        <div className="mt-4 flex border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium transition-colors relative cursor-pointer ${
                activeTab === tab.key
                  ? "text-[#1e3b7b]"
                  : "text-slate-500 hover:text-slate-700"
              } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#1e3b7b]" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-4 min-h-[200px]">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {activeTab === "courses" && <PostSection />}

              {activeTab === "edit" && <EditProfileSecttion />}

              {activeTab === "weblog" && (
                <div>
                  <h2 className="text-md text-slate-600 font-semibold">
                    وبلاگ من
                  </h2>
                  <div className="mt-2">
                    <p className="text-sm">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
                      شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                      درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می
                      طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                      ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
                      ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری
                      موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و
                      زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی
                      سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
                      قرار گیرد.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
