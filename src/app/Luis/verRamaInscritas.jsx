import React, { Component } from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';

class VerRamaInscritas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ramasDeportivas: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const estudianteId = '64d2b9f5c338a26e8485f286'; // Cambia esto para obtener el ID del estudiante

      const response = await axios.get(`/api/estudiantes/${estudianteId}/ramas-deportivas`);

      const ramasDeportivas = response.data.ramasDeportivas;

      this.setState({ ramasDeportivas, loading: false });
    } catch (error) {
      console.error('Error al obtener las ramas deportivas del estudiante:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'nombre', headerName: 'Nombre de Rama', width: 200 },
      {
        field: 'verDetalles',
        headerName: 'Ver Detalles',
        width: 150,
        renderCell: (params) => (
          <Button variant="contained" color="primary" size="small" onClick={() => {}}>
            Ver Detalles
          </Button>
        ),
      },
    ];
  
    const { ramasDeportivas, loading } = this.state;
  
    return (
      <div style={{ margin: '0 auto', maxWidth: 800 }}>
        <Typography variant="h4" gutterBottom>
          Ramas Inscritas
        </Typography>
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : (
          ramasDeportivas && ramasDeportivas.length > 0 ? (
            <DataGrid
              rows={ramasDeportivas.map((rama, index) => ({ id: index + 1, nombre: rama }))}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
            />
          ) : (
            <Typography>No se encontraron ramas deportivas inscritas.</Typography>
          )
        )}
      </div>
    );
  }
}

export default VerRamaInscritas;
