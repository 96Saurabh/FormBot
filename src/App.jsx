import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import WorkspacePage from "./Pages/WorkspacePage";
import ProtectedRoute from "./helper/ProtectedRoute";
import NotFoundPage from "./Pages/NotFoundPage";
import Share from "./Components/Share/Share";
import SettingPage from "./Pages/SettingPage";
import FormPage from "./Pages/FormPage";
import FromBotPage from "./Pages/FormBotPage";
import Response from "./Components/Response/Response";
import Theme from "./Components/Workspace/Theme/Theme";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/share" element={<Share />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/form/:formId" element={<FromBotPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route
            path="/workspace"
            element={<ProtectedRoute Component={WorkspacePage} />}
          />
          <Route
            path="/FormPage"
            element={<ProtectedRoute Component={FormPage} />}
          />
           <Route
            path="/workspace/response"
            element={<ProtectedRoute Component={Response} />}
          />
          <Route
            path="/workspace/theme"
            element={<ProtectedRoute Component={Theme} />}
          />
          <Route
            path="/setting"
            element={<ProtectedRoute Component={SettingPage} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
