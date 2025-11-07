import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";

export default function MainLayout() {
  // aquí podrías leer el usuario de contexto/localStorage
  const [user] = React.useState("ADILourdes");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header user={user} onLogout={() => { /* limpiar sesión */ }} />
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
