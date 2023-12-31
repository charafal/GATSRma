import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  styled,
  Button,
} from '@mui/material';
import axios from 'axios';
  import ApiContext from '../../context/ApiContext';
  import RenderText from '../../utils/RenderText';
  import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const StyledTypography = styled(Typography)({
  color: '#1d2442',
  fontSize: '25px',
  fontWeight: 500,
});

const ForfaitSearch = () => {
  const { getForfaits, loading } = React.useContext(ApiContext);
  let navigate = useNavigate();

  const [forfaits, setForfaits] = useState([]);
  const [nomForfait, setNomForfait] = useState("");
  const [soldeData, setSoldeData] = useState("");
  const [soldeAppels, setSoldeAppels] = useState("");
  const [montant, setMontant] = useState("");


  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8089/forfaits/rechercheForfait')
  //     .then(function (response) {
  //       setForfaits(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const handleNomForfaitChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNomForfait(event.target.value);
  };

  const handleMontantChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMontant(event.target.value);
  };
  const handleSoldeDataChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSoldeData(event.target.value);
  };
  const handleSoldeAppelsChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSoldeAppels(event.target.value);
  };

  const handleRecherche = async () => {
    try {
      await getForfaits({
        nomForfait: nomForfait,
        soldeData: soldeData,
        
        soldeAppels: soldeAppels,
        montant: montant,
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleAjouter = () => {
    // Ajoutez ici la logique pour le bouton "Ajouter"
    // Cette fonction sera exécutée lorsque le bouton "Ajouter" sera cliqué
    navigate('/AjouterForfait ');
    console.log('Ajouter button clicked');
  };

  return (
    <Box sx={{ width: '95%', marginX: '2%' }}>
      <StyledTypography
        sx={{
          flex: '1 1 100%',
          fontWeight: 'bold',
          marginBottom: '1em',
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
        variant="h6"
        id="tableTitle"
      >
        <RenderText value="Recherche multicritère par forfait" />
      </StyledTypography>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
          padding: '1%',
          border: '1px solid rgba(0, 0, 0, .1)',
        }}
      >
        <div>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
              textAlign: 'center',
            }}
          >
            <FormControl>
              
              <TextField
                size="small"
                
                id="nom forfait"
                value={nomForfait}
                label="Nom Forfait"
                onChange={handleNomForfaitChange}
                variant="filled"
              />
                
              
            </FormControl>
            <TextField
              size="small"
              id="montant"
              label="Montant"
              variant="filled"
              value={montant}
              onChange={handleMontantChange}
            />
            <TextField
              size="small"
              id="soldeData"
              label="Solde data"
              variant="filled"
              value={soldeData}
              onChange={handleSoldeDataChange}
            />
            <TextField
              size="small"
              id="soldeAppels"
              label="Solde appels"
              variant="filled"
              value={soldeAppels}
              onChange={handleSoldeAppelsChange}
            />
          </Box>

          <Box
            sx={{
              marginInline: '2rem',
              marginTop: '1.5rem',
              textAlign: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1D2A5C', marginRight: '0.5rem' }}
              onClick={handleRecherche}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress sx={{ color: 'white' }} size="1.5rem" />
              ) : (
                <>Rechercher</>
              )}
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1D2A5C' }}
              onClick={handleAjouter}
            >
              Ajouter
            </Button>
          </Box>
        </div>
      </Paper>
    </Box>
  );
};

export default ForfaitSearch;