import { toggleTheme } from "@/Redux/ReduxSlices/themeSlice";
import type { RootState } from "@/Redux/Store";
import { useDispatch, useSelector } from "react-redux";


function Dashboard() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
   <div className="min-h-screen p-6">
  <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="dark:bg-yellow-500">hello ji</p>
  <button
    onClick={handleToggleTheme}
    className="mt-4 px-6 py-3 rounded-lg bg-[var(--color-foreground)] text-[var(--color-background)] focus:ring-2 focus:ring-[var(--color-foreground)]"
  >
    Toggle Theme: {themeMode}
  </button>
<div className="bg-[var(--color-background)] text-[var(--color-foreground)] dark:bg-[var(--color-background)] dark:text-[var(--color-foreground)]">
  Themeable content
</div>

  <div className="mt-8 p-6 rounded-md bg-[var(--color-foreground)] text-[var(--color-background)] border">
    Theme-aware card
  </div>
</div>

  );
}

export default Dashboard;
