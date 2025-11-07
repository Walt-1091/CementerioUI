import * as React from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";

export default function Header({ user = "ADILourdes", onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout?.();            // limpia sesión si la tienes
    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <AccountBalanceIcon sx={{ fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Sistema de Gestión de Nichos
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>
            Bienvenido, <strong>{user}</strong>
          </Typography>
          <Button variant="contained" color="neutral" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
