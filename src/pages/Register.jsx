import * as React from 'react'
import { Card, CardContent, Typography, Stack, TextField, Button, Box } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import { useNavigate } from 'react-router-dom'
import MainLayout from "../layouts/MainLayout";

export default function Register(){
  const navigate = useNavigate()
  const onSubmit = (e)=>{ e.preventDefault(); navigate('/login') }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // resta AppBar aprox
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 620, width: '100%' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={3}>
            {/* Título centrado */}
            <Stack alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography variant="h4" sx={{ color: 'secondary.main' }} align="center"> Recuperar Contraseña
              </Typography>
            </Stack>

            <form onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                <TextField label="Correo Electrónico" fullWidth />

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
                  {/* Usa el color "neutral" que definimos en el theme */}
                  <Button variant="contained" color="neutral" onClick={()=>navigate('/login')}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="secondary">
                    Cambiar Contraseña
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

