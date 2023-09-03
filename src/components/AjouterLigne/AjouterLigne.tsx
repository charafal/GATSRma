import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import ApiContext from '../../context/ApiContext';

const AddLigneForm = () => {
  const { addLigne, loading } = useContext(ApiContext);

  const [formData, setFormData] = useState({
    numLigne: '',
    statut_ligne: '',
    direction: '',
    date_activation: '',
    date_resiliation: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    console.log(`name: ${name}, value: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'direction' ? parseInt(value) : value,
    }));
  };
  

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const data = await addLigne({
        numLigne: formData.numLigne,
        forfait: 1,
         direction: 1,
        date_activation: formData.date_activation,
        date_resilliation: formData.date_resiliation,
      });
      alert('Ligne ajoutée avec succès');
      // Réinitialisation du formulaire
      setFormData({
        numLigne: '',
        statut_ligne: '',
        direction: '',
        date_activation: '',
        date_resiliation: '',
      });
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'ajout de la ligne');
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '2rem', backgroundColor: '#f5f5f5' }}    >
    <Paper sx={{ width: '100%', padding: '2rem', boxShadow: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{marginBottom: '1rem'}}>
        <TextField
          label="Numéro de ligne"
          variant="outlined"
          fullWidth
          name="numLigne"
          value={formData.numLigne}
          onChange={handleChange}
          InputLabelProps={{ style: { marginBottom: '3rem' } }}
          
        />
        </Box>
        <Box sx={{marginBottom: '1rem'}}><TextField
          label="Statut de ligne"
          variant="outlined"
          fullWidth
          name="statut_ligne"
          value={formData.statut_ligne}
          onChange={handleChange}
          InputLabelProps={{ style: { marginBottom: '3rem' } }}
        /></Box>
        
       {/* <TextField
            label="Direction"
            variant="outlined"
            fullWidth
            name="direction"
            
            value={formData.direction}
            onChange={handleChange}
            /> */}
        <Box sx={{marginBottom: '1rem'}}>
        <TextField
          label="Date d'activation"
          variant="outlined"
          fullWidth
          name="date_activation"
          value={formData.date_activation}
          onChange={handleChange}
          InputLabelProps={{ style: { marginBottom: '1rem' } }}
        />
        </Box>
        <Box sx={{marginBottom: '1rem'}}> <TextField
          label="Date de résiliation"
          variant="outlined"
          fullWidth
          name="date_resiliation"
          value={formData.date_resiliation}
          onChange={handleChange}
          InputLabelProps={{ style: { marginBottom: '1rem' } }}
        /></Box>
       
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
          sx={{ marginTop: '10px' }}
        >
          Ajouter Ligne
        </Button>
      </form>
    </Paper>
    </Box>
  );
};

export default AddLigneForm;
