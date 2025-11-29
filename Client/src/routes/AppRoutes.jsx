import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import Creator from "../pages/Creator";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import About from "../pages/About";
import Archives from "../pages/Archives";
import ArchiveDetail from "../pages/ArchiveDetail";
import Facts from "../pages/Facts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* New Pages */}
        <Route path="matrixxboy" element={<Creator />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="about" element={<About />} />
        <Route path="facts" element={<Facts />} />
        <Route path="archives" element={<Archives />} />
        <Route path="archives/:id" element={<ArchiveDetail />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
