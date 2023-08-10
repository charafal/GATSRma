import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

const ModifierBeneficiaire = () => {
  const { id } = useParams();
  //const [beneficiaire, setBeneficiaire] = useState(null);
  const [beneficiaire, setBeneficiaire] = useState<Beneficiaire | null>(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [centrecout, setCentrecout] = useState('');
  const [direction, setDirection] = useState('');
  const [directionOtions, setDirectionOptions] = useState('');
  const [centreCoutOptions, setCentreCoutOptions] = useState([]);
  const [centreCoutsItems, setCentreCoutItems] = React.useState([]);
  //const [rfBeneficiaire, setRfBeneficiaire] = useState<string[]>([]);
  const [rfDirection, setRfDirection] = useState<string[]>([]);
  const [centreCout, setCentreCout] = React.useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [matricule, setMatricule] = useState('');

  const [rfBeneficiaire, setRfBeneficiaire] = useState<string>('');
  const [rfBeneficiaireOptions, setRfBeneficiaireOptions] = useState<string[]>([]);



  const [directionItems, setDirectionItems] = React.useState([]);
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
 

useEffect(() => {
  axios
    .get('http://localhost:8089/rfbeneficiaires') // Remplacez l'URL par l'URL correcte
    .then(function (response) {
      setRfBeneficiaire(response.data); // Mettez à jour rfBeneficiaire avec les données du backend
    })
    .catch(function (error) {
      console.log(error);
    });
}, []);


  type Beneficiaire = {
    nom: string;
    prenom: string;
    matricule: string;
    centreCout: string;
    direction: string;
    rfBeneficiaire: string;
    // Add other properties here if needed
  };

  useEffect(() => {
    const fetchBeneficiaire = async () => {
      try {
        const [beneficiaireResponse, centreCoutResponse, directionResponse] =
          await Promise.all([
            axios.get(`http://localhost:8089/beneficiaire/${id}`),
            axios.get('http://localhost:8089/centreCouts'),
            axios.get('http://localhost:8089/rfdirections'),
          ]);
        setBeneficiaire(beneficiaireResponse.data);
        setNom(beneficiaireResponse.data.nom);
        setPrenom(beneficiaireResponse.data.prenom);
        setMatricule(beneficiaireResponse.data.matricule);
        //setCentrecout(beneficiaireResponse.data?.centrecout?.centrecout);

        // setDirection(beneficiaireResponse.data.rfDirection.nomDirection);
         setRfBeneficiaire(beneficiaireResponse.data.rfBeneficiaire.statutBeneficiaire),
        // );
        setRfDirection(beneficiaireResponse.data.rfDirection.id); // Utilisez l'ID de la direction
        setCentrecout(beneficiaireResponse.data.centrecout.id); 
        //setDirection(directionResponse.data.direction.nomDirection);

        // Mettez à jour les options du centre cout
        setCentreCoutOptions(centreCoutResponse.data);
        setDirectionOptions(directionResponse.data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération du bénéficiaire :',
          error,
        );
      }
    };

    // Call the fetchBeneficiaire function
    fetchBeneficiaire();
  }, [id]);

  const handlePrenomChange = (event: ChangeEvent<{ value: unknown }>) => {
    setPrenom(event.target.value as string); // Mettez à jour avec l'identifiant
  };
  
  const handleNomChange = (event: ChangeEvent<{ value: unknown }>) => {
    setNom(event.target.value as string); // Mettez à jour avec l'identifiant
  };
  const handleMatriculeChange = (event: ChangeEvent<{ value: unknown }>) => {
    setMatricule(event.target.value as string); // Mettez à jour avec l'identifiant
  };
  const handleRfBeneficiaireChange = (event: ChangeEvent<{ value: unknown }>) => {
    setRfBeneficiaire(event.target.value as string); // Mettez à jour avec l'identifiant
  };
  
  const handleDirectionChange = (event: ChangeEvent<{ value: unknown }>) => {
    setDirection(event.target.value as string); // Mettez à jour avec l'identifiant
  };

  const handleCentreCoutChange = (event: ChangeEvent<{ value: unknown }>) => {
    setCentrecout(event.target.value as string); // Mettez à jour avec l'identifiant
  };

  {
    successMessage && (
      <Typography variant="body1" color="success">
        {successMessage}
      </Typography>
    );
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const updatedBeneficiaire = {
        ...beneficiaire,
        nom,
        prenom,
        matricule,
        direction: {
          id: rfDirection, // Mettez à jour avec l'objet complet de la direction
        },
        centrecout: {
          id: centrecout, // Mettez à jour avec l'objet complet du centre de cout
        },
       
      };
      await axios.put(
        `http://localhost:8089/beneficiaire/updateBeneficiaire2/${id}`, // Utilisez ${id} pour remplacer l'ID
        updatedBeneficiaire
      );
      
      setSuccessMessage('La modification a été effectuée avec succès!');
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
        width: '60ch',
        margin: 'auto',
        transform: 'translateY(50%)',
      }}
    >
      {true && (
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <Typography
              variant="h3"
              textAlign={'center'}
              fontWeight={'600'}
              fontSize={32}
              mb={1}
            >
              Modifier le bénéficiaire
            </Typography>
            <Stack direction={'row'} gap={2} sx={{ marginBottom: '16px' }}>
              <TextField
                label="Nom"
                variant="outlined"
                value={nom}
                onChange={handleNomChange}
                fullWidth
              />
              <TextField
                label="Prénom"
                variant="outlined"
                value={prenom}
                onChange={handlePrenomChange}
                fullWidth
              />
              {/* Ajoutez d'autres champs de saisie pour les autres informations du bénéficiaire */}
            </Stack>
            <Box>
              {/* <FormControl> */}
              <Stack direction={'row'} gap={2} sx={{ marginBottom: '16px' }}>
                {/* Direction TextField */}
                <TextField
                  select
                  size="small"
                  label="Direction"
                  value={direction}
                  onChange={handleDirectionChange}
                  variant="filled"
                  fullWidth
                >
                  <MenuItem key="none" value="">
                    None
                  </MenuItem>
                  {directionItems.map((item: any, index: number) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nomDirection}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Centre cout TextField */}
                <TextField
                  select
                  size="small"
                  value={centrecout}
                  label="Centre cout"
                  onChange={handleCentreCoutChange}
                  variant="filled"
                  fullWidth
                >
                  <MenuItem key="none" value={0}>
                    None
                  </MenuItem>
                  {centreCoutsItems.map((item: any, index: number) => (
                    <MenuItem key={index} value={item.id}>
                      {item.centreCout}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Box>
            <Box>
            <TextField
                label="Matricule"
                variant="outlined"
                value={matricule}
                onChange={handleMatriculeChange}
                fullWidth
              />
               <TextField
                select
                size="small"
                label="RfBeneficiaire"
                value={rfBeneficiaire}
                onChange={handleRfBeneficiaireChange}
                variant="filled"
                fullWidth
              >
                <MenuItem key="none" value="">
                  None
                </MenuItem>
                {rfBeneficiaireOptions.map((option: string, index: number) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>


            </Box>
            {/* Ajoutez d'autres champs de saisie pour les autres informations du bénéficiaire */}
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Button variant="outlined" component={Link} to="/beneficiaires">
              Annuler
            </Button>
            <Button type="submit" variant="contained" disableElevation>
              Enregistrer
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default ModifierBeneficiaire;