
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNavbar />
        <main className="dashboard-container"></main>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
