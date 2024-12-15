import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <h1 className="text-center">React Level 3 Certification Exam</h1>

      <div className="flex gap-3">
        <Link to="/exercise-1">Exercise 1</Link>
        <Link to="/exercise-2">Exercise 2</Link>
        <Link to="/exercise-3">Exercise 3</Link>
      </div>

      <hr className="mt-2 mb-5" />

      <Outlet />
    </div>
  );
};

export default MainLayout;
