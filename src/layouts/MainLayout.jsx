import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { useAuth } from "../Context/AuthContext";

export default function MainLayout() {
  const [user] = React.useState("ADI Lourdes");
  const { logout } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header user={user} onLogout={logout} />
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
