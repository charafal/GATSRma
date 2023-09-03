import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';

const ModifierForfait = () => {
  const { id } = useParams();
  const [forfait, setForfait] = useState(null);
  const [nomForfait, setNomForfait] = useState('');
  const [option_forfait, setOption_forfait] = useState('');
  const [soldeData, setSoldeData] = useState('');
  const [soldeAppels, setSoldeAppels] = useState('');
  const [montant, setMontant] = useState('');

  useEffect(() => {
    fetchForfait();
  }, []);

  const fetchForfait = async () => {
    try {
      const response = await axios.get(`http://localhost:8089/forfaits/${id}`);
      setForfait(response.data);
      setNomForfait(response.data.nomForfait);
      setOption_forfait(response.data.option_forfait);
      setSoldeData(response.data.soldeData);
      setSoldeAppels(response.data.soldeAppels);
      setMontant(response.data.montant);
    } catch (error) {
      console.error('Erreur lors de la récupération du bénéficiaire :', error);
    }
  };

  const handleNomForfaitChange = (event) => {
    setNomForfait(event.target.value);
  };

  const handleOption_forfaitChange = (event) => {
    setOption_forfait(event.target.value);
  };
  const handleSoldeDataChange = (event) => {
    setSoldeData(event.target.value);
  };
  const handleSoldeAppelsChange = (event) => {
    setSoldeAppels(event.target.value);
  };
  const handleMontantChange = (event) => {
    setMontant(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedForfait = {
        ...forfait,
        nomForfait,
        option_forfait,
        soldeAppels,
        soldeData,
        montant,
      };
      await axios.put(`http://localhost:8089/forfaits/{id}`, updatedForfait);
      // Gérer la réussite de la modification, par exemple, rediriger l'utilisateur vers une autre page
    } catch (error) {
      console.error('Erreur lors de la modification du bénéficiaire :', error);
    }
  };

  //   const handleCancel = () => {
  //     history.goBack(); // Redirige l'utilisateur vers la page précédente
  //   };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div>
        <h1
          style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}
        >
          Modifier le forfait
        </h1>
        {forfait && (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex' }}>
              <TextField
                label="Nom Forfait"
                variant="outlined"
                value={nomForfait}
                onChange={handleNomForfaitChange}
                sx={{ marginBottom: '16px', marginRight: '16px' }}
              />
              <TextField
                label="Option Forfait"
                variant="outlined"
                value={option_forfait}
                onChange={handleOption_forfaitChange}
                sx={{ marginBottom: '16px' }}
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <TextField
                label="Solde Data"
                variant="outlined"
                value={soldeData}
                onChange={handleSoldeDataChange}
                sx={{ marginBottom: '16px', marginRight: '16px' }}
              />
              <TextField
                label="Solde Appels"
                variant="outlined"
                value={soldeAppels}
                onChange={handleSoldeAppelsChange}
                sx={{ marginBottom: '16px' }}
              />
              <TextField
                label="Montant"
                variant="outlined"
                value={montant}
                onChange={handleMontantChange}
                sx={{ marginBottom: '16px', marginRight: '16px' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginRight: '100px',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                }}
              >
                Enregistrer
              </Button>
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                component={Link}
                to="/forfaits"
                sx={{ backgroundColor: '#f44336', color: '#fff' }}
              >
                Annuler
              </Button>
            </Box>
          </form>
        )}
      </div>
    </Box>
  );
};

export default ModifierForfait;
