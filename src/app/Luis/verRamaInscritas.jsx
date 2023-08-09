import React, { Component } from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import VerHorario from './verHorario.jsx'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';

class VerRamaInscrita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ramasDeportivas: [],
      loading: true,
      showHorarioModal: false,
    };
  }

  async componentDidMount() {
    try {
      const estudianteId = '64d2df23f777311c22e7fb56'; // Cambia esto para obtener el ID del estudiante

      const response = await axios.get(`/api/estudiante/${estudianteId}/ramas`);

      const ramasDeportivas = response.data;
      console.log(ramasDeportivas);
      this.setState({ ramasDeportivas, loading: false });
    } catch (error) {
      console.error('Error al obtener las ramas deportivas del estudiante:', error);
      this.setState({ loading: false });
    }
  }
 
  handleOpenHorarioModal = (nombreRama, entrenadorRama) => {
    this.verHorarioComponent.handleOpenModal(nombreRama, entrenadorRama);
  };

  render() {
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'nombre', headerName: 'Nombre de Rama', flex: 1 },
      {
        field: 'verHorario',
        headerName: 'Ver Horario',
        width: 150,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => this.handleOpenHorarioModal(params.row.nombre, params.row.entrenador)}
          >
            Ver Horario
          </Button>
        ),
      },
    ];

    const { ramasDeportivas, loading } = this.state;

    return (
      <div style={{ margin: '0 auto', maxWidth: 800, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ramas Inscritas
        </Typography>
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : (
          ramasDeportivas && ramasDeportivas.length > 0 ? (
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={ramasDeportivas.map((rama, index) => ({ id: index + 1, nombre: rama.nombre, entrenador: rama.entrenador }))}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
              />
            </div>
          ) : (
            <Typography>No se encontraron ramas deportivas inscritas.</Typography>
          )
        )}

        <VerHorario
          onRef={(ref) => (this.verHorarioComponent = ref)}
        />
      </div>
    );
  }
}

export default VerRamaInscrita;
