import React, { Component } from 'react';
import { Typography, Modal } from '@mui/material';
import Button from '@mui/material/Button';

class VerHorario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      nombreRama: '',
      entrenadorRama: '',
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  handleOpenModal = (nombreRama, entrenadorRama) => {
    this.setState({ showModal: true, nombreRama, entrenadorRama });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal, nombreRama, entrenadorRama } = this.state;

    return (
      <div>
        <Modal open={showModal} onClose={this.handleCloseModal}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
            {/* Contenido del modal */}
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
              {nombreRama}
            </Typography>
            <Typography>Entrenador: {entrenadorRama}</Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

export default VerHorario;
