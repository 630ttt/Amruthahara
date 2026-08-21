import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function AdminLayout({ children }) {
  return (
    <>
      <Sidebar />
      <Topbar />

      <div
        style={{
          marginLeft: "250px",
          marginTop: "70px",
          padding: "30px",
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default AdminLayout;