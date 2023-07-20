import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { Box , TextField, MenuItem, Select, InputLabel, FormControl  } from '@mui/material';

const ModifierBeneficiaire = () => {
  const { id } = useParams();
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [matricule, setMatricule] = useState('');
  const [centrecout, setCentrecout] = useState('');
  const [centreCoutOptions, setCentreCoutOptions] = useState([]);

  useEffect(() => {
    fetchBeneficiaire();
  }, []);

  const fetchBeneficiaire = async () => {
    try {
      const [beneficiaireResponse, centreCoutResponse] = await Promise.all([
        axios.get(`http://localhost:8089/beneficiaire/${id}`),
        axios.get('http://localhost:8089/centreCouts'),
      ]);
      setBeneficiaire(beneficiaireResponse.data);
      setNom(beneficiaireResponse.data.nom);
      setPrenom(beneficiaireResponse.data.prenom);
      setMatricule(beneficiaireResponse.data.matricule);
      setCentrecout(beneficiaireResponse.data.centrecout.centrecout);
  
      // Mettez à jour les options du centre cout
      setCentreCoutOptions(centreCoutResponse.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du bénéficiaire :', error);
    }
  };
  

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };
  const handleMatriculeChange = (event) => {
    setMatricule(event.target.value);
  };
  const handleCentrecoutChange = (event) => {
    setCentrecout(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedBeneficiaire = { ...beneficiaire, nom, prenom };
      await axios.put(`http://localhost:8089/beneficiaire/updateBeneficiaire2/{id}`, updatedBeneficiaire);
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
    <h1>Modifier le bénéficiaire</h1>
    {beneficiaire && (
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            label="Nom"
            variant="outlined"
            value={nom}
            onChange={handleNomChange}
            sx={{ marginBottom: '16px', marginRight:'16px' }}
          />
          <TextField
            label="Prénom"
            variant="outlined"
            value={prenom}
            onChange={handlePrenomChange}
            sx={{ marginBottom: '16px' }}
          />
          {/* Ajoutez d'autres champs de saisie pour les autres informations du bénéficiaire */}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <TextField
            label="Matricule"
            variant="outlined"
            value={matricule}
            onChange={handleMatriculeChange}
            sx={{ marginBottom: '16px', marginRight:'16px' }}
          />
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: '16px' }}>
              <InputLabel id="centreCout-label">Centre de coût</InputLabel>
              <Select
                labelId="centreCout-label"
                value={centrecout}
                onChange={(e) => setCentrecout(e.target.value)}
                label="Centre de coût"
              >
                {centreCoutOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.centreCout.centreCout}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>

          {/* Ajoutez d'autres champs de saisie pour les autres informations du bénéficiaire */}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button type="submit" variant="contained" sx={{ marginRight: '100px' }}>
            Enregistrer
          </Button>
          <Button
            variant="contained"
            startIcon={<CancelIcon />}
            component={Link}
            to="/beneficiaires"
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

export default ModifierBeneficiaire;
