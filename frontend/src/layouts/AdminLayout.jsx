import Sidebar from "../components/layout/Sidebar";


function AdminLayout({ children }) {
  return (
    <>
      <div className="admin-sidebar-shell">
        <Sidebar />
      </div>
     

      <div
        className="admin-layout-content"
        style={{
          
          marginLeft:"470px"
         
        
          
        }}
      >
        {children}
      </div>
    </>
  );
}

export default AdminLayout;
