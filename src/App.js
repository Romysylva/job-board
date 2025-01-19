import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/context/ThemeContext";
// import { ThemeProvider } from "styled-components";

import JobDetailsPage from "./components/JobDetailsPage";
import HomePage from "./components/homapage/HomePage";
import CompanyPage from "./components/companyPage/CompanyPage";
import UserProfilePage from "./components/userspage/UserProfilePage";
import AdminDashboard from "./components/admin/AdminDashboard";
import ForgotPasswordPage from "./components/authcomponent/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/authcomponent/pages/ResetPasswordPage";
import RegistrationForm from "./components/authcomponent/auth/RegistrationForm";
import LoginPage from "./components/authcomponent/pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import GlobalError from "./context/global/GlobalError";
import GlobalLoading from "./context/global/GlobalLoading";
import { UserProvider } from "./context/users/useUser";
import Layout from "./page/Layout";
import Footer from "./components/Footer/Footer";
import JobPage from "./jobs/loading/JobPage";
// import JobDetails from "./jobs/JobDetailPage";
import DetailedPage from "./jobs/Page";
// Import your components

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <GlobalLoading />
        <GlobalError />
        <Router>
          {/* <Layout> */}
          <Routes>
            {/* Public Routes (Accessible by anyone) */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />

            {/* Protected Routes (Accessible when logged in) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/company/:id" element={<CompanyPage />} />
            {/* <Route path="/job/:id" element={<JobDetailsPage />} /> */}
            <Route path="/profile" element={<UserProfilePage />} />

            {/* Admin Routes (Only for admin) */}

            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/jobs" element={<JobPage />} />
            <Route path="/jobs/:id" element={<DetailedPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  element={<AdminDashboard />}
                  roleRequired="admin"
                />
              }
            />
          </Routes>
          {/* </Layout> */}
        </Router>
        <Footer />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;

/* <PrivateRoute path="/company/:id" element={<CompanyPage />} />
<PrivateRoute path="/job/:id" element={<JobDetailsPage />} />
<PrivateRoute path="/profile" element={<UserProfilePage />} />
<PrivateRoute path="/admin" element={<AdminDashboard />} /> */

// {
//   /* <PrivateRoute path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} /> */
// }

// theme={/* Your theme config */}
