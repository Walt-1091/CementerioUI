import {
  Card, CardContent, Typography, Stack, TextField, Button, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Services/UserService';
import { useAuth } from '../Context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser({ username: e.target[0].value, password: e.target[2].value });
      await signIn(result);
    } catch (err) {
      console.error("Login error", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 560, width: '100%' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={3}>
            <Stack alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="h4" sx={{ color: 'secondary.main' }} align="center">
                Iniciar Sesión
              </Typography>
            </Stack>

            <form onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                <TextField label="Correo Electrónico" fullWidth />
                <TextField label="Contraseña" type="password" fullWidth />

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    color="neutral"
                    onClick={() => navigate('/register')}
                  >
                    Olvido Contraseña
                  </Button>

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
