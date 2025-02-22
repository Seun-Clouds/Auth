import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect, useState } from "react"; // ✅ FIXED IMPORT

// Protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};

// Redirect authenticated users away from auth pages
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true); // ✅ NOW WORKS

  useEffect(() => {
    checkAuth();
    setTimeout(() => setIsLoading(false), 2000); // Simulate loading for 2 seconds
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <div
        className="hidden md:flex flex-1 md:w-1/2 h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Right Side - Authentication Forms */}
      <div
        className={`flex-1 md:w-1/2 flex flex-col items-left justify-center px-8 md:px-16 py-10 transition-all duration-500 ${
          isLoading ? "bg-[#3498db]" : "bg-[#D7D6FF]"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mt-[-40px] mb-20">
          <img src="/MoniPhundlogo.svg" alt="Logo" className="h-[110px] w-[114px]" />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
