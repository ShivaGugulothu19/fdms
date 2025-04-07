import { Routes, Route } from "react-router-dom";
import CleanForm from "../pages/CleanForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CleanForm />} />
    </Routes>
  );
};

export default AppRoutes;
