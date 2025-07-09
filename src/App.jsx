
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginView";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
