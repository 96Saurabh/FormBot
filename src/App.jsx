import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import WorkspacePage from "./Pages/WorkspacePage";
import ProtectedRoute from "./helper/ProtectedRoute";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route
            path="/workspace"
            element={<ProtectedRoute Component={WorkspacePage} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
