import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-10 text-center shadow-soft">
      <p className="text-sm uppercase tracking-[0.3em] text-brand-100">404</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Page not found</h2>
      <p className="mt-3 text-slate-300">The route has not been scaffolded yet, but the volunteer portal is ready for more pages.</p>
      <Link className="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950" to="/">
        Return home
      </Link>
    </div>
  );
}

