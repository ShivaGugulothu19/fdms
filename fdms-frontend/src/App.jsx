import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => setRefresh((r) => !r);
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <AppRoutes key={refresh} />
    </div>
  );
}

export default App;
