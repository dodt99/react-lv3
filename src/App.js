import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";

import MainLayout from "./components/layout/MainLayout";

import NotFound from "./pages/NotFound";
import Exercise1 from "./pages/exercise1";
import Exercise2 from "./pages/exercise2";
import Exercise3 from "./pages/exercise3";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/exercise-1" />} />
          <Route path="/exercise-1" index element={<Exercise1 />} />
          <Route path="/exercise-2" index element={<Exercise2 />} />
          <Route path="/exercise-3" index element={<Exercise3 />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
