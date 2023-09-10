import React, { useState } from 'react';
import { FormControl, TextField , Button, styled, Paper, Box, Typography} from '@mui/material';
import RenderText from '../../utils/RenderText';
import ApiContext from '../../context/ApiContext';

import { useNavigate } from 'react-router-dom';
interface SearchByMonthProps {
  onSearch: (mois: string, annee: string) => void;
}

const SearchFacture: React.FC<SearchByMonthProps> = ({ onSearch }) => {
  const [mois, setMois] = useState('');
  const [annee, setAnnee] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [forfait, setForfait] = useState('');
  const [matricule, setMatricule] = useState('');
  const [numLigne, setNumLigne] = useState('');
  const [montant, setMontant] = useState('');
  const[ beneficiaire, setBeneficiaire]=useState('');
  const { getFactures, loading } = React.useContext(ApiContext);
  const StyledTypography = styled(Typography)({
    color: '#1d2442',
    fontSize: '25px',
    fontWeight: 500,
  });

  const handleMoisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMois(event.target.value);
  };

  const handleAnneeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnee(event.target.value);
  };
  const handleBeneficiaireChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeneficiaire(event.target.value);
  };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     // Appeler la fonction de recherche passée en prop avec le mois et l'année
//     onSearch(mois, annee);
//   };
const handleRecherche = async () => {
    try {
      await getFactures({
       mois: mois,
       annee: annee
    });
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ width: '95%', marginX: '2%' }}>
    
         <Paper
        sx={{
          width: '100%',
          mb: 2,
          padding: '1%',
          border: '1px solid rgba(0, 0, 0, .1)',
        }}>
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
        <RenderText value="Recherche de facture par mois" />
      </StyledTypography>
      <Box sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
              textAlign: 'center',
            }}>
      <FormControl>
              
              <TextField
                size="small"
                
                id="mois"
                value={mois}
                label="Mois"
                onChange={handleMoisChange}
                variant="filled"
              />
                
              
            </FormControl>
            <FormControl>
              
              <TextField
                size="small"
                
                id="annee"
                value={annee}
                label="Annee"
                onChange={handleAnneeChange}
                variant="filled"
              />
                
              
            </FormControl>
            </Box>
            <Box sx={{
              marginInline: '2rem',
              marginTop: '1.5rem',
              textAlign: 'center',
            }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1D2A5C', marginRight: '0.5rem' }}
              onClick={handleRecherche}
              
            >
             Rechercher
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1D2A5C', marginRight: '0.5rem' }}
              
              
            >
             Generer Facture
            </Button>

            </Box>
           
      </Paper>

    
    </Box>
  );
};

export default SearchFacture;
