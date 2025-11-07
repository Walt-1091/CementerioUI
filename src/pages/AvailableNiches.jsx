// src/pages/AvailableNiches.jsx
import * as React from 'react';
import {
  Box, Stack, Typography, Card, CardContent, Grid, Button, MenuItem, TextField,
  Table, TableHead, TableBody, TableRow, TableCell, Chip, ToggleButtonGroup, ToggleButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

// —— datos de ejemplo (usa tu fuente real)
const available = [
  {
    id: 'A-002',
    sector: 'A',
    tipo: 'Individual',
    precio: '₡50.000',
    ubicacion: 'Piso 1, Fila 2',
    descripcion: 'Nicho individual con buena iluminación',
  },
];

// ---------- DIALOGO: Detalles ----------
function NicheDetailsDialog({ open, onClose, data, onConfirm }) {
  if (!data) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
        Detalles del Nicho {data.id}
      </DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Stack spacing={1.5}>
          <Typography><strong>Sector:</strong> {data.sector}</Typography>
          <Typography>
            <strong>Tipo:</strong>{' '}
            <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: .5 }} />
            {data.tipo}
          </Typography>
          <Typography><strong>Precio:</strong> {data.precio}</Typography>
          <Typography><strong>Ubicación:</strong> {data.ubicacion}</Typography>
          <Typography><strong>Descripción:</strong> {data.descripcion}</Typography>
          <Typography align="center" sx={{ mt:8}}>
            ¿Desea reservar este nicho?
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="secondary" onClick={() => onConfirm?.(data)}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---------- DIALOGO: Reserva exitosa ----------
function ReserveResultDialog({ open, onClose, nicheId, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
        Nicho Reservado
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          El nicho <strong>{nicheId}</strong> ha sido reservado exitosamente. Proceda con
          el proceso de venta.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="secondary" onClick={onConfirm}>
          Confirmar
          
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AvailableNiches() {
  const navigate = useNavigate();

  // filtros (placeholder)
  const [sector, setSector] = React.useState('');
  const [tipo, setTipo] = React.useState('');
  const [view, setView] = React.useState('list');

  // diálogos
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const [reserveOpen, setReserveOpen] = React.useState(false);
  const [reservedId, setReservedId] = React.useState('');

  const filtered = available.filter(n =>
    (sector ? n.sector === sector : true) &&
    (tipo ? n.tipo === tipo : true)
  );

  const handleView = (_e, v) => { if (v) setView(v); };

  // Ver detalles
  const onVer = (row) => { setSelected(row); setDetailsOpen(true); };
  const onCloseDetails = () => setDetailsOpen(false);

  // Confirmar desde el diálogo de detalles -> mostrar diálogo de reserva exitosa
  const onConfirmDetails = (row) => {
    setDetailsOpen(false);
    // Aquí podrías llamar a tu API de reserva y, si responde OK, mostrar el success
    setReservedId(row.id);
    setReserveOpen(true);
  };

  // Click en botón "Reservar" de la tabla -> mostrar directamente el success (o abre detalles, como prefieras)
  const onReservar = (row) => {
    // Si quieres pasar por confirmación previa, en vez de esto puedes llamar onVer(row)
    setReservedId(row.id);
    setReserveOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Título + volver */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Nichos Disponibles para Venta
        </Typography>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')}>
          Volver al Inicio
        </Button>
      </Stack>

      {/* Filtros + Toggle de vista */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField select fullWidth label="Sector" value={sector} onChange={(e) => setSector(e.target.value)}>
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField select fullWidth label="Tipo de Nicho" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Individual">Individual</MenuItem>
                <MenuItem value="Familiar">Familiar</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="contained" sx={{ height: 56, bgcolor: 'primary.dark' }}>
                Filtrar
              </Button>
            </Grid>
            <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <ToggleButtonGroup size="small" color="primary" exclusive value={view} onChange={handleView}>
                <ToggleButton value="grid">Vista Grid</ToggleButton>
                <ToggleButton value="list">Vista Lista</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabla */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Nichos Disponibles ({filtered.length})
          </Typography>
          <Divider />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Sector</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Ubicación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
              
            </TableHead>
            <TableBody>
              {filtered.map((n) => (
                <TableRow key={n.id} hover>
                  <TableCell>{n.id}</TableCell>
                  <TableCell>{n.sector}</TableCell>
                  <TableCell>
                    <Chip icon={<PersonIcon />} label={n.tipo} variant="outlined" />
                  </TableCell>
                  <TableCell>{n.precio}</TableCell>
                  <TableCell>{n.ubicacion}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1.5}>
                      <Button variant="contained" startIcon={<VisibilityIcon />} onClick={() => onVer(n)}>
                        Ver
                      </Button>
                      <Button variant="outlined" onClick={() => onReservar(n)}>
                        Reservar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogos */}
      <NicheDetailsDialog
        open={detailsOpen}
        onClose={onCloseDetails}
        data={selected}
        onConfirm={onConfirmDetails}
      />

      <ReserveResultDialog
        open={reserveOpen}
        nicheId={reservedId}
        onClose={() => setReserveOpen(false)}
        onConfirm={() => {
          setReserveOpen(false);
          // navegar o continuar flujo de venta
          // navigate(`/sales/new?niche=${reservedId}`);
        }}
      />
    </Box>
  );
}
