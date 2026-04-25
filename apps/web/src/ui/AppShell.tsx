import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/sessions", label: "Sessions" },
  { to: "/resume-review", label: "Resume Review" }
];

export function AppShell() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-100">ATTA Back to Tech</p>
            <h1 className="text-lg font-semibold text-white">Volunteer-led returnship support platform</h1>
          </div>
          <nav className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-slate-300">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-full px-4 py-2 transition",
                    isActive ? "bg-brand-500 text-slate-950" : "hover:bg-white/10 hover:text-white"
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
