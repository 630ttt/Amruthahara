import Sidebar from "../components/layout/Sidebar";


function AdminLayout({ children }) {
  return (
    <>
      <Sidebar />
     

      <div
        style={{
          marginLeft: "250px",
         
        
          
        }}
      >
        {children}
      </div>
    </>
  );
}

export default AdminLayout;