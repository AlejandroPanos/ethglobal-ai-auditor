import { Outlet } from "react-router";
import Navbar from "@/components/Navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />

      <main className="pt-16 px-4 mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
