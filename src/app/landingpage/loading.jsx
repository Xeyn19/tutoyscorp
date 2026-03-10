export default function LandingPageLoading() {
  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse overflow-hidden rounded-[32px] border border-slate-900/10 bg-[#07121f] p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <div className="h-10 w-40 rounded-full bg-white/10" />
          <div className="hidden h-10 w-36 rounded-full bg-white/10 md:block" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="h-8 w-40 rounded-full bg-white/10" />
            <div className="h-16 max-w-2xl rounded-3xl bg-white/10" />
            <div className="h-6 max-w-xl rounded-full bg-white/10" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-40 rounded-full bg-white/10" />
              <div className="h-12 w-36 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="h-5 w-32 rounded-full bg-white/10" />
            <div className="mt-6 h-36 rounded-[20px] bg-white/10" />
          </div>
        </div>
      </div>
    </main>
  );
}
