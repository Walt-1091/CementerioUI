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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import FileDropzone from "../components/FileDropzone.jsx";
import { mockNiches } from "../data.js";

export default function NicheDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const niche = mockNiches.find((n) => n.id === id) || mockNiches[0];
  const [open, setOpen] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 900, width: "100%" }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={7}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
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
                  <TextField
                    label="Número de Nicho"
                    defaultValue={niche.number}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nombre del Difunto"
                    defaultValue={niche.deceased}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Última Anualidad Pagada"
                    defaultValue={new Date(niche.lastPayment)
                      .toISOString()
                      .slice(0, 10)}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Cédula del Propietario"
                    defaultValue={niche.ownerId}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nombre del Propietario"
                    defaultValue={niche.owner}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Teléfono"
                    defaultValue={niche.phone}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Dirección"
                    defaultValue={niche.address}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Correo Electrónico"
                    defaultValue={niche.email}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Descripción"
                    defaultValue={niche.notes}
                    multiline
                    minRows={3}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Comprobante de Pago
                  </Typography>
                  <FileDropzone />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{justifyContent: "space-between" }}
                >
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => setOpen(true)}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => navigate("/")}
                    >
                      Actualizar
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <ConfirmDialog
            open={open}
            title="Eliminar Nicho"
            message="¿Está seguro de que desea eliminar este nicho? Esta acción no se puede deshacer."
            onCancel={() => setOpen(false)}
            onConfirm={() => {
              setOpen(false);
              navigate("/");
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
