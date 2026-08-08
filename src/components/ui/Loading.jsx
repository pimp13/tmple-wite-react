export const Loading = ({ className, title = "درحال بارگذاری..." }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 gap-3 ${className}`}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#1e3b7b]" />
      <p className="text-sm text-slate-500">{title}</p>
    </div>
  );
};
