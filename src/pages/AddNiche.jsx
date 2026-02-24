// src/pages/AddNiche.jsx
import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function AddNiche() {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    numero: '',
    anualidad: '',
    cedula: '',
    propietario: '',
    telefono: '',
    direccion: '',
    email: '',
    descripcion: '',
  });

  const [file, setFile] = React.useState(null);
  const [fileError, setFileError] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const onChange = (k) => (e) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      setFileError('Solo se permiten archivos PDF, JPG o PNG');
      setFile(null);
      return;
    }

    if (selectedFile.size > maxSize) {
      setFileError('El archivo no puede superar los 5MB');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setFileError('');
    setOpenSnackbar(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setFileError('Debe cargar la boleta de alquiler antes de guardar');
      return;
    }

    const fd = new FormData();
    Object.keys(form).forEach((key) => {
      fd.append(key, form[key]);
    });

    fd.append('boletaAlquiler', file);

    console.log('Formulario listo para enviar');
    console.log('Archivo:', file.name);

    // Aquí iría tu llamada real al backend
    // await fetch('/api/nichos', { method: 'POST', body: fd });

    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 900, width: '100%' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Encabezado */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={7}
          >
            <Typography variant="h4">
              Agregar Nicho
            </Typography>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Volver al Inicio
            </Button>
          </Stack>

          <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField label="Número de Nicho" value={form.numero} onChange={onChange('numero')} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Año de Última Anualidad Pagada"
                  type="number"
                  inputProps={{ min: 1900, max: new Date().getFullYear() }}
                  value={form.anualidad}
                  onChange={onChange('anualidad')}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Cédula del Propietario" value={form.cedula} onChange={onChange('cedula')} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Nombre del Propietario" value={form.propietario} onChange={onChange('propietario')} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Teléfono" value={form.telefono} onChange={onChange('telefono')} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Dirección" value={form.direccion} onChange={onChange('direccion')} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Correo Electrónico" type="email" value={form.email} onChange={onChange('email')} fullWidth />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Descripción" multiline rows={3} value={form.descripcion} onChange={onChange('descripcion')} fullWidth />
              </Grid>

              {/* BOLETA */}
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Boleta de Alquiler *
                </Typography>

                <Button variant="contained" component="label">
                  {file ? 'Reemplazar Boleta' : 'Cargar Boleta'}
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />
                </Button>

                {file && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Archivo cargado: {file.name}
                  </Typography>
                )}

                {fileError && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {fileError}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate('/dashboard')}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#22C55E' }}
                disabled={!file}
              >
                Guardar
              </Button>
            </Stack>
          </form>

          {/* Snackbar éxito */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
              Boleta cargada satisfactoriamente
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
}
