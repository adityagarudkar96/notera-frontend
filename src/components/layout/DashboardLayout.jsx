import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
      isActive ? "bg-indigo-50 text-indigo-700" : "text-body hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-surface border-r border-line h-screen fixed top-0 left-0 overflow-y-auto">
        <div className="px-6 py-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-primary-600">
            Notera<span className="text-heading">.</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Your personal workspace</p>
        </div>

        <div className="px-4 py-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-3">
            Workspace
          </p>

          <nav className="space-y-2">
            <NavLink to="/notes" className={navLinkClass}>
              <span>▤</span>
              All Notes
            </NavLink>
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {user?.username}
              </p>
              <p className="text-xs text-muted truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 min-w-0 md:ml-64">
        {/* Top navigation */}
        <header className="bg-surface border-b border-line px-4 sm:px-6 py-4 fixed top-0 right-0 left-0 md:left-64 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">Workspace</h2>
              <p className="text-xs text-muted">Organize your thoughts</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-body hidden sm:block">
                {user?.username}
              </span>

              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <button
                onClick={handleLogout}
                className="md:hidden text-sm font-medium text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Mobile navigation */}
        {/* Mobile navigation */}
        <div className="md:hidden bg-surface border-b border-line px-4 py-2 mt-[73px]">
          <NavLink to="/notes" className={navLinkClass}>
            <span>▤</span>
            All Notes
          </NavLink>
        </div>

        {/* Active page renders here */}
        <div className="pt-[73px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
