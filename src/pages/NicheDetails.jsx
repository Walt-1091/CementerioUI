import * as React from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { mockNiches } from "../data.js";

export default function NicheDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const niche = mockNiches.find((n) => n.id === id) || mockNiches[0];

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [fileError, setFileError] = React.useState("");
  const [annualidades, setAnnualidades] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [openViewer, setOpenViewer] = React.useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setFileError("Solo se permiten archivos PDF, JPG o PNG");
      return;
    }

    if (file.size > maxSize) {
      setFileError("El archivo no puede superar los 5MB");
      return;
    }

    const year = new Date().getFullYear();

    const newEntry = {
      year,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      date: new Date().toLocaleDateString(),
    };

    // 🔥 mantener solo últimas 5 anualidades
    setAnnualidades((prev) =>
      [newEntry, ...prev].slice(0, 5)
    );

    setFileError("");
    setOpenSnackbar(true);
  };

  return (
    <Card sx={{ maxWidth: 900, width: "100%" }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={7}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Detalle del Nicho</Typography>

            <Button
              startIcon={<ArrowBackIcon />}
              component={RouterLink}
              to="/"
              variant="outlined"
            >
              Volver al Inicio
            </Button>
          </Stack>

          <Card>
            <CardContent>
              <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                  <TextField label="Número de Nicho" defaultValue={niche.number} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nombres de los Difuntos"
                    defaultValue={
                      Array.isArray(niche.deceased)
                        ? niche.deceased.join(", ")
                        : niche.deceased
                    }
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Año de Última Anualidad Pagada"
                    defaultValue={
                      niche.lastPaymentYear ||
                      new Date(niche.lastPayment).getFullYear()
                    }
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField label="Cédula del Propietario" defaultValue={niche.ownerId} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField label="Nombre del Propietario" defaultValue={niche.owner} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField label="Teléfono" defaultValue={niche.phone} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField label="Dirección" defaultValue={niche.address} fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField label="Correo Electrónico" defaultValue={niche.email} fullWidth />
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Descripción" defaultValue={niche.notes} multiline minRows={3} fullWidth />
                </Grid>

                {/* 🔥 HISTORIAL ANUALIDADES */}
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Cargar Anualidad
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                    />
                  </Button>

                  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    Historial de Anualidades
                  </Typography>

                  {fileError && (
                    <Typography color="error">{fileError}</Typography>
                  )}

                  {annualidades.length > 0 && (
                    <TableContainer component={Paper} sx={{ mt: 1 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Año</b></TableCell>
                            <TableCell><b>Fecha Carga</b></TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {annualidades.map((a, index) => (
                            <TableRow
                              key={index}
                              hover
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                setSelectedFile(a);
                                setOpenViewer(true);
                              }}
                            >
                              <TableCell>{a.year}</TableCell>
                              <TableCell>{a.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="error" onClick={() => setOpenDelete(true)}>
                      Eliminar
                    </Button>

                    <Button variant="contained" color="success" onClick={() => navigate("/")}>
                      Actualizar
                    </Button>
                  </Stack>
                </Grid>

              </Grid>
            </CardContent>
          </Card>

          <ConfirmDialog
            open={openDelete}
            title="Eliminar Nicho"
            message="¿Está seguro de que desea eliminar este nicho?"
            onCancel={() => setOpenDelete(false)}
            onConfirm={() => {
              setOpenDelete(false);
              navigate("/");
            }}
          />

          <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
            <Alert severity="success">Anualidad cargada correctamente</Alert>
          </Snackbar>

          {/* VISOR */}
          <Dialog open={openViewer} onClose={() => setOpenViewer(false)} maxWidth="md" fullWidth>
            <DialogTitle>Visualizar Anualidad</DialogTitle>
            <DialogContent>
              {selectedFile?.type === "application/pdf" ? (
                <iframe src={selectedFile?.url} width="100%" height="500px" title="PDF Viewer" />
              ) : (
                <img src={selectedFile?.url} alt="Anualidad" style={{ width: "100%" }} />
              )}
            </DialogContent>
          </Dialog>

        </Stack>
      </CardContent>
    </Card>
  );
}