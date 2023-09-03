  import React, { useState, useContext, useEffect } from 'react';
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
  import axios from 'axios';

  const AddLigneForm = () => {
    const { addLigne, loading } = useContext(ApiContext);

    const [formData, setFormData] = useState({
      numLigne: '',
      rfLigne: '',
      direction: '',
      forfait: '',
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
          rfLigne: formData.rfLigne,
          direction: formData.direction,
          forfait: formData.forfait,
          date_activation: formData.date_activation,
          date_resilliation: formData.date_resiliation,
        });
        alert('Ligne ajoutée avec succès');
        // Réinitialisation du formulaire
        setFormData({
          numLigne: '',
          rfLigne: '',
          direction: '',
          forfait: '',
          date_activation: '',
          date_resiliation: '',
        });
      } catch (error) {
        console.error(error);
        alert('Erreur lors de l\'ajout de la ligne');
      }
    };
    const [telephones, setTelephones]= useState('');
    useEffect(() => {
      // Récupérer la liste des téléphones disponibles depuis l'API
      axios
        .get('http://localhost:8089/terminals/terminal')
        .then((response) => setTelephones(response.data))
        .catch((error) =>
          console.error('Erreur lors de la récupération des téléphones :', error),
        );
    }, []);
    const[rfLigne, setRfLigne]= useState('');
    useEffect(() => {
      // Récupérer la liste des téléphones disponibles depuis l'API
      axios
        .get('http://localhost:8089/rfLignes/RfLigne')
        .then((response) => setRfLigne(response.data))
        .catch((error) =>
          console.error('Erreur lors de la récupération des téléphones :', error),
        );
    }, []);

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
            select
            name="statut_ligne"
            value={formData.rfLigne}
            
            onChange={(e) =>
              setFormData({ ...formData, rfLigne: e.target.value })
            }
          /></Box>
          <Box sx={{marginBottom: '1rem'}}>
          <TextField
              label="Direction"
              variant="outlined"
              fullWidth
              name="direction"
              select
              value={formData.direction}
              onChange={handleChange}
              /> 
          </Box>
          
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
