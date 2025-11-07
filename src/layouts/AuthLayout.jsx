import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

export default function AuthLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container sx={{ py: 6 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
