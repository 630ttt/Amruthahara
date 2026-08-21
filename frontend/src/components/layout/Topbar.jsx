function Topbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        marginLeft: "250px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Dashboard</h2>

      <h4>Welcome, Admin</h4>
    </div>
  );
}

export default Topbar;