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

const LigneSearch = () => {
  const { getLigne, loading } = React.useContext(ApiContext);
  let navigate = useNavigate();

  const [forfaits, setForfaits] = useState([]);
  const [numLigne, setNumLigne] = useState("");
  const [forfait, setForfait] = useState("");
  const [direction, setDirection] = useState("");
  const [date_activation, setDate_activation] = useState("");
  const [date_resilliation, setData_resilliation] = useState("");


  useEffect(() => {
    axios
      .get('http://localhost:8089/forfaits/rechercheForfait')
      .then(function (response) {
        setForfaits(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleNumLigneChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNumLigne(event.target.value);
  };

  const handleForfaitChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setForfait(event.target.value);
  };
  const handleDirectionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDirection(event.target.value);
  };
  const handleData_activationChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDate_activation(event.target.value);
  };
  const handleData_resilliationChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setData_resilliation(event.target.value);
  };

  const handleRecherche = async () => {
    try {
      await getLigne({
       numLigne: numLigne,
       forfait: 1,
       direction: 1,
       date_activation: date_activation,
       date_resilliation: date_resilliation,

      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAjouter = () => {
    // Ajoutez ici la logique pour le bouton "Ajouter"
    // Cette fonction sera exécutée lorsque le bouton "Ajouter" sera cliqué
    navigate('/AjouterLigne ');
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
        <RenderText value="Recherche multicritère par ligne" />
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
                
                id="Num ligne"
                value={numLigne}
                label="NumLigne"
                onChange={handleNumLigneChange}
                variant="filled"
              />
                
              
            </FormControl>
            <TextField
              size="small"
              id="forfaut"
              label="forfait"
              variant="filled"
              value={forfait}
              onChange={handleForfaitChange}
            />
            <TextField
              size="small"
              id="direction"
              label="Direction"
              variant="filled"
              value={direction}
              onChange={handleDirectionChange}
            />
            <TextField
              size="small"
              id="date_activation"
              label="date_activation"
              variant="filled"
              value={date_activation}
              onChange={handleData_activationChange}
            />
            <TextField
              size="small"
              id="date_resilliation"
              label="date_resilliation"
              variant="filled"
              value={date_resilliation}
              onChange={handleData_resilliationChange}
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

export default LigneSearch;
