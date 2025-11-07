// src/pages/Login.jsx
import * as React from 'react';
import {
  Card, CardContent, Typography, Stack, TextField, Button, Box
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // aquí va tu lógica real de login…
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // compensa la AppBar
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 560, width: '100%' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={3}>
            {/* Título centrado con icono */}
            <Stack alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="h4" sx={{ color: 'secondary.main' }} align="center">
                Iniciar Sesión
              </Typography>
            </Stack>

            <form onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                <TextField label="Correo Electrónico" type="email" fullWidth />
                <TextField label="Contraseña" type="password" fullWidth />

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
                  {/* Botón gris -> usa el color neutral definido en el theme */}
                  <Button
                    variant="contained"
                    color="neutral"
                    onClick={() => navigate('/register')}
                  >
                    Olvido Contraseña
                  </Button>

                  {/* Botón azul acción */}
                  <Button type="submit" variant="contained" color="secondary">
                    Iniciar Sesión
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
