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

      <div>
         <div className="card p-6 rounded-xl border text-center shadow transition-all duration-300">
      <h2 className="text-xl font-bold mb-2">Themed Card</h2>
      <p className="text-muted">This card adapts to your theme automatically.</p>
      <button className="btn-primary px-4 py-2 mt-4 rounded-md font-semibold">
        Primary Action
      </button>
    </div>
      </div>
      <div className="min-h-screen bg-background-primary text-text-primary transition-colors duration-300">
      <header className="p-4 flex justify-between items-center bg-background-secondary border-b border-border-default">
        <h1 className="text-2xl font-bold text-primary-brand">My Semantic App</h1>
      </header>

      <main className="p-8">
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Welcome!</h2>
        <p className="mb-4 text-text-secondary">
          This content changes based on the day/night mode using semantic colors.
        </p>
        <div className="p-6 rounded-lg shadow-md bg-background-secondary border border-border-default">
          <p className="text-text-secondary">
            This is a card element. Its background, text, and border also adapt.
          </p>
        </div>
      </main>
    </div>
    </div>
  );
}

export default Dashboard;
