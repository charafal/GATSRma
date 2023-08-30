import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ApiContext from '../../context/ApiContext';
import RenderText from '../../utils/RenderText';

const StyledTypography = styled(Typography)({
  color: '#1d2442',
  fontSize: '25px',
  fontWeight: 500,
});

const SearchMultiCriteriaTerminalForm = () => {
  let navigate = useNavigate();
  const { getTerminals, loading } = React.useContext(ApiContext);
  const [imei, setImei] = useState('');
  const [etatTerminal, setEtatTerminal] = useState('');
  //const [montant, setMontant] = useState("");

  // const [loading, setLoading] = useState(false);
  const [terminals, setTerminals] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8089/etatTerminals')
      .then(function (response) {
        setTerminals(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleImeiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImei(event.target.value);
  };

  const handleEtatTerminalChange = (event: SelectChangeEvent) => {
    setEtatTerminal(event.target.value);
  };

  const handleRecherche = async () => {
    try {
      await getTerminals({
        imei: imei,
        etatTerminal: etatTerminal,
        dateReception: '',
        dateCession: '',
        action: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAjouter = () => {
    navigate('/AjouterTerminal');
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
        Recherche multicritère de terminal
      </StyledTypography>
      <Paper
        sx={{
          width: '100%',
          mb: 2,
          padding: '1%',
          border: '1px solid rgba(0, 0, 0, .1)',
        }}
      >
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            textAlign: 'center',
          }}
        >
          <TextField
            size="small"
            id="imei"
            label="IMEI"
            value={imei}
            variant="filled"
            onChange={handleImeiChange}
          />
          <FormControl>
            <InputLabel id="etat-terminal-label">État du terminal</InputLabel>
            <Select
              size="small"
              labelId="etat-terminal-select-label"
              id="etat-terminal-select"
              value={etatTerminal}
              label="État du terminal"
              onChange={handleEtatTerminalChange}
              variant="filled"
            >
              <MenuItem key={Math.random()} value="">
                None
              </MenuItem>
              {terminals.map((item: any, index: number) => (
                <MenuItem key={index} value={item.id}>
                  {item.etatTerminal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      </Paper>
    </Box>
  );
};

export default SearchMultiCriteriaTerminalForm;
