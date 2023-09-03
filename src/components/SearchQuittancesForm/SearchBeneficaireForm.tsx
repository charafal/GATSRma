import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import axios from 'axios';
import ApiContext from '../../context/ApiContext';
import RenderText from '../../utils/RenderText';
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { log } from "console";

const StyledTypography = styled(Typography)({
  color: '#1d2442',
  fontSize: '25px',
  fontWeight: 500,
});

const SearchMultiCriteriaForm = () => {
  let navigate = useNavigate();
  const { getBeneficiaires, loading } = React.useContext(ApiContext);

  useEffect(() => {
    axios
      .get('http://localhost:8089/rfbeneficiaires')
      .then(function (response) {
        setRefBeneficiaires(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8089/rfdirections')
      .then(function (response) {
        setDirectionItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8089/centreCouts')
      .then(function (response) {
        setCentreCoutItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [forfaits, setForfaits] = React.useState([]);
  const [refBenificiairesItems, setRefBeneficiaires] = React.useState<any>([]);
  const [directionItems, setDirectionItems] = React.useState([]);
  const [centreCoutsItems, setCentreCoutItems] = React.useState([]);

  const [rfBeneficiaire, setRefBeneficiaire] = React.useState('');
  const [rfDirection, setrfDirection] = React.useState('');
  const [centreCout, setCentreCout] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [matricule, setMatricule] = React.useState('');
  const [numLigne, setligne] = React.useState('');
  const [nomforfait, setForfait] = React.useState('');

  const [mounted, setMounted] = useState(false);

  const handleRefBenieficiaresChange = (event: SelectChangeEvent) => {
    setRefBeneficiaire(event.target.value as string);
    console.log(rfBeneficiaire);
  };

  // const handleDirectionChange = (event: SelectChangeEvent) => {
  //   setDirection(event.target.value as string);
  // };
  const handlerfDirectionChange = (event: SelectChangeEvent) => {
    setrfDirection(event.target.value as string);
  };

  const handleForfaitChange = (event: SelectChangeEvent) => {
    setForfait(event.target.value as string);
    console.log(nomforfait);
  };
  const handleCentreCoutChange = (event: SelectChangeEvent) => {
    setCentreCout(event.target.value as string);
    console.log(centreCout);
  };
  const handleNomChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNom(event.target.value);
  };
  const handlePrenomChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPrenom(event.target.value);
    console.log(prenom);
  };
  const handleMatriculeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMatricule(event.target.value);
    console.log(matricule);
  };
  const handleNumTeleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setligne(event.target.value);
    console.log(numLigne);
  };

  const handleRecherche = async () => {
    try {
      await getBeneficiaires({ nom, prenom, matricule , rfDirection});
    } catch (error) {
      console.error(error);
    }
  };
  const handleAjouter = () => {
    navigate('/BeneficiaireAdd');
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
        <RenderText value="Recherche des beneficiaires" />
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
            <TextField
              size="small"
              id="nQuittance"
              label="Nom"
              value={nom}
              variant="filled"
              onChange={handleNomChange}
            />
            <TextField
              size="small"
              id="nPolice"
              label="Prénom"
              value={prenom}
              variant="filled"
              onChange={handlePrenomChange}
            />
            <TextField
              size="small"
              id="nom-assure"
              label="Matricule"
              variant="filled"
              value={matricule}
              onChange={handleMatriculeChange}
            />
            <TextField
              size="small"
              id="nom-assure"
              label="N° Ligne"
              variant="filled"
              value={numLigne}
              onChange={handleNumTeleChange}
            />
          </Box>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
              textAlign: 'center',
              marginTop: '2%',
            }}
          >
            <FormControl>
              <InputLabel id="compagnie-label">Statut</InputLabel>
              <Select
                size="small"
                labelId="compagnie-select-label"
                id="compagnie-select"
                value={rfBeneficiaire}
                label="Statut"
                onChange={handleRefBenieficiaresChange}
                variant="filled"
              >
                <MenuItem key={Math.random()} value={''}>
                  None
                </MenuItem>
                {refBenificiairesItems.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.statutBeneficiaire}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="branche-label">Direction</InputLabel>
              <Select
                size="small"
                labelId="branche-select-label"
                id="branche-select"
                value={rfDirection}
                label="Direction"
                onChange={handlerfDirectionChange}
                variant="filled"
              >
                <MenuItem key={Math.random()} value={''}>
                  None
                </MenuItem>
                {directionItems.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.nomDirection}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="etat-label">Centre de cout</InputLabel>
              <Select
                size="small"
                labelId="etat-select-label"
                id="etat-select"
                value={centreCout}
                label="Centre cout"
                onChange={handleCentreCoutChange}
                variant="filled"
              >
                <MenuItem key={Math.random()} value="">
                  None
                </MenuItem>
                {/* {Array.isArray(centreCout) && */}
                {centreCoutsItems.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.centreCout}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Basic date picker"
                slotProps={{ textField: { variant: "filled", size: "small"} }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl> */}
          </Box>

          <Box sx={{ width: '95%', marginX: '2%' }}>
            {/* ... (existing code) */}
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
            {/* ... (existing code) */}
          </Box>
        </div>
      </Paper>
    </Box>
  );
};

export default SearchMultiCriteriaForm;
