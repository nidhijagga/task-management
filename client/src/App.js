import React from "react";
import Layout from "./components/Layout";
import AppRoutes from "./routes";
function App() {
  return (
    <div className="App">
      <Layout>
        <AppRoutes />
      </Layout>
    </div>
  );
}

export default App;
