// src/pages/Dashboard.jsx
import * as React from 'react';
import {
  Box, Stack, Typography, Card, CardContent, Grid, Button, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Total Nichos', value: 2 },
  { label: 'Nichos Disponibles', value: 98 },
  { label: 'Próximos a Vencer', value: 0 },
  { label: 'Vencidos', value: 2 },
];

const rows = [
  {
    difunto: 'Juan Pérez García',
    propietario: 'María Pérez López',
    ultima: '14/5/2024',
    estado: 'warning',
  },
  {
    difunto: 'Ana María Rodríguez',
    propietario: 'Carlos Rodríguez Moreno',
    ultima: '19/12/2023',
    estado: 'warning',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 6 }}>
      {/* Tarjetas de métricas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Card>
              <CardContent sx={{ py: 3 }}>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}
                >
                  {s.value}
                </Typography>
                <Typography align="center" sx={{ color: 'text.secondary' }}>
                  {s.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botones de acción */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" startIcon={<SearchIcon />}
        onClick={() => navigate('/niches/search')}>
          Consultar
        </Button>

        <Button variant="outlined" startIcon={<AddIcon />} sx={{ borderWidth: 2 }}
         onClick={() => navigate('/niches/add')}>
          Agregar
        </Button>

        <Button
          variant="outlined"
          startIcon={<EventAvailableIcon />}
          sx={{
            borderWidth: 2,
            borderColor: '#22C55E',
            color: '#22C55E',
            '&:hover': { borderColor: '#16A34A', backgroundColor: 'rgba(34,197,94,0.06)' },
          }}
           onClick={() => navigate('/niches/available')}
        >
          Nichos Disponibles
        </Button>
      </Stack>

      {/* Tabla de registros */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Typography sx={{ px: 3, pt: 2.5, pb: 2, fontWeight: 700 }}>
            Registros de Nichos
          </Typography>
          <Divider />
          <TableContainer sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Nombre del Difunto</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Nombre del Propietario</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Última Anualidad Pagada</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((r, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{r.difunto}</TableCell>
                    <TableCell>{r.propietario}</TableCell>
                    <TableCell>{r.ultima}</TableCell>
                    <TableCell>
                      {r.estado === 'warning' ? (
                        <WarningAmberRoundedIcon
                          sx={{ color: 'warning.main', verticalAlign: 'middle' }}
                        />
                      ) : (
                        <Chip size="small" label="OK" color="success" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="big"
                        variant="contained"
                        color="secondary"
                        sx={{ borderRadius: 999 }}
                         onClick={() => navigate('/Niche/Details')}>
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
