import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { HomeFeed } from "./pages/HomeFeed";
import { PostDetails } from "./pages/PostDetails";
import { MyWhispers } from "./pages/MyWhispers";
import { Notifications } from "./pages/Notifications";
import { TrendingTea } from "./pages/TrendingTea";
import { Saved } from "./pages/Saved";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { Onboarding } from "./pages/Onboarding";
import { Wallet } from "./pages/Wallet";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        {" "}
        {/* Wraps everything inside ThemeProvider */}
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes (No layout wrapper) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<Onboarding />} />
            </Route>

            {/* Protected Routes (With Sidebar/RightPanel Layout) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomeFeed />} />
                <Route path="/confession/:id" element={<PostDetails />} />
                <Route path="/my-whispers" element={<MyWhispers />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/trending" element={<TrendingTea />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/wallet" element={<Wallet />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
