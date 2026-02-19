import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { HomeFeed } from "./pages/HomeFeed";
import { PostDetails } from "./pages/PostDetails";
import { MyWhispers } from "./pages/MyWhispers";
import { Notifications } from "./pages/Notifications";
import { TrendingTea } from "./pages/TrendingTea";
import { Saved } from "./pages/Saved";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { Onboarding } from "./pages/Onboarding";
import { ThemeProvider } from "./context/ThemeContext";
import { Wallet } from "./pages/Wallet";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Fullscreen Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* App Layout Routes (Eventually, wrap this in a ProtectedRoute) */}
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
