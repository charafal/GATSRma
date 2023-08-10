import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import Typography from '@mui/material/Typography';
import { TextField, Button, Box, Paper } from '@mui/material';
import axios from 'axios';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';

import ApiContext from '../../context/ApiContext';
import { Terminal } from '@mui/icons-material';

const steps = [
  'Création du bénéficiaire',
  'Affecter un terminal',
  'Affecter un forfait',
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [lignes, setLignes] = useState([]);
  const [selectedLigne, setSelectedLigne] = useState('');

  const totalSteps = () => {
    return steps.length;
  };
  useEffect(() => {
    // Récupérer la liste des lignes disponibles depuis l'API
    axios
      .get('http://localhost:8089/lignes/ligne')
      .then((response) => setLignes(response.data))
      .catch((error) =>
        console.error('Erreur lors de la récupération des lignes :', error),
      );
  }, []);

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    setFormData({ ...formData, [steps[activeStep]]: formData });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setFormData({ ...formData, [steps[activeStep - 1]]: formData });
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const [telephones, setTelephones] = useState([]);
  const [selectedTelephone, setSelectedTelephone] = useState('');

  const [selectedClasseBeneficiaire, setSelectedClasseBeneficiaire] =
    useState('');

  const handleClasseBeneficiaireChange = (event) => {
    setSelectedClasseBeneficiaire(event.target.value);
  };
  const classesBeneficiaires = [
    { id: 1, label: 'Classe A' },
    { id: 2, label: 'Classe B' },
    { id: 3, label: 'Classe C' },
  ];

  useEffect(() => {
    // Récupérer la liste des téléphones disponibles depuis l'API
    axios
      .get('http://localhost:8089/terminals/terminal')
      .then((response) => setTelephones(response.data))
      .catch((error) =>
        console.error('Erreur lors de la récupération des téléphones :', error),
      );
  }, []);

  const handleTelephoneChange = (event) => {
    setSelectedTelephone(event.target.value);
  };

  const handleComplete = async () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    if (allStepsCompleted()) {
      try {
        // Récupérez les données du formulaire
        const formData = {
          nom: 'nom', // Valeur du champ nom
          prenom: 'prenom', // Valeur du champ prénom
          matricule: 'matricule', // Valeur du champ matricule
          centreCout: 'centrecout',
          rfBeneficiaire: 'statutBeneficiaire',
          rfDirections: 'rfDirection',
          ligne: 'ligne',
          // Autres champs du formulaire
        };

        // Envoyez les données au backend en utilisant une requête POST
        const response = await axios.post(
          'http:localhost/8089/beneficiaire',
          formData,
        );
        const newBeneficiaryId = response.data.id;
        console.log(newBeneficiaryId.id);

        // Vérifiez la réponse du backend et effectuez des actions en conséquence
        if (response.status === 200) {
          // L'ajout du bénéficiaire a réussi
          console.log('Bénéficiaire ajouté avec succès !');
          // Effectuez ici d'autres actions ou affichez un message de succès à l'utilisateur
        } else {
          // Il y a eu une erreur lors de l'ajout du bénéficiaire
          console.log("Erreur lors de l'ajout du bénéficiaire");
          // Effectuez ici d'autres actions ou affichez un message d'erreur à l'utilisateur
        }

        // Mettez à jour l'état de la ligne affectée
        const ligne_id = formData.ligne_id; // Remplacez "ligneId" par le champ approprié qui contient l'ID de la ligne affectée
        const updatedLigne = await axios.put(
          `http://localhost:8089/lignes/updateLigne`,
          { etat: 'affecté' }, // Remplacez "etat" par le champ approprié qui représente l'état de la ligne
        );
        setLigneAffectee(updatedLigne.data);

        // Réinitialisez le formulaire et les étapes
        handleReset();
      } catch (error) {
        // Gérez les erreurs de la requête
        console.error(
          "Erreur lors de l'appel de l'API d'ajout du bénéficiaire :",
          error,
        );
        // Effectuez ici d'autres actions ou affichez un message d'erreur à l'utilisateur
      }
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    const fetchCentreCout = async () => {
      try {
        const response = await axios.get('http://localhost:8089/centreCouts');
        setCentreCout(response.data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des centres de coût :',
          error,
        );
      }
    };

    fetchCentreCout();
  }, []);
  useEffect(() => {
    const fetchRfBeneficiaires = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8089/rfbeneficiaires',
        );
        setRfBeneficiaire(response.data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des RfBeneficiaires :',
          error,
        );
      }
    };

    fetchRfBeneficiaires();
  }, []);

  useEffect(() => {
    const fetchRfDirections = async () => {
      try {
        const response = await axios.get('http://localhost:8089/rfdirections');
        setRfDirections(response.data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des RfDirections :',
          error,
        );
      }
    };

    fetchRfDirections();
  }, []);

  useEffect(() => {
    const fetchLigne = async () => {
      try {
        const response = await axios.get('http://localhost:8089/lignes/ligne');
        setLigne(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des lignes :', error);
      }
    };

    fetchLigne();
  }, []);

  useEffect(() => {
    const fetchForfait = async () => {
      try {
        const response = await axios.get('http://localhost:8089/forfaits');
        setForfait(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des forfaits :', error);
      }
    };

    fetchForfait();
  }, []);
  const [centreCout, setCentreCout] = useState([]);
  const [rfDirections, setRfDirections] = useState([]);
  const [rfBeneficiaire, setRfBeneficiaire] = useState([]);
  const [ligne, setLigne] = useState([]);
  const [forfait, setForfait] = useState([]);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const [ligneAffectee, setLigneAffectee] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    rfBeneficiaire: '',
    rfDirection: '',
    centreCout: '',
    ligne: '',
    // Autres champs du formulaire
  });

  const handleLigneChange = (event) => {
    setSelectedLigne(event.target.value);
  };

  const renderForm = (step) => {
    switch (step) {
      case 0:
        return (
          <form>
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField
                label="Nom"
                variant="outlined"
                fullWidth
                value={formData.nom}
                onChange={(e) =>
                  setFormData({ ...formData, nom: e.target.value })
                }
              />
              <TextField
                label="Prénom"
                variant="outlined"
                fullWidth
                value={formData.prenom}
                onChange={(e) =>
                  setFormData({ ...formData, prenom: e.target.value })
                }
              />
            </Box>
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField
                label="Matricule"
                variant="outlined"
                fullWidth
                value={formData.matricule}
                onChange={(e) =>
                  setFormData({ ...formData, matricule: e.target.value })
                }
              />
              <TextField
                label="Centre de coût"
                variant="outlined"
                fullWidth
                select
                value={formData.centreCout}
                onChange={(e) =>
                  setFormData({ ...formData, centreCout: e.target.value })
                }
              >
                {centreCout.map((centreCout) => (
                  <MenuItem key={centreCout.id} value={centreCout.id}>
                    {centreCout.centreCout}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField
                label="Direction"
                variant="outlined"
                fullWidth
                select
                value={formData.rfDirection}
                onChange={(e) =>
                  setFormData({ ...formData, rfDirection: e.target.value })
                }
              >
                {rfDirections.map((rfDirection) => (
                  <MenuItem key={rfDirection.id} value={rfDirection.id}>
                    {rfDirection.nomDirection}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Status de Bénéficiaire"
                variant="outlined"
                fullWidth
                select
                value={formData.rfBeneficiaire}
                onChange={(e) =>
                  setFormData({ ...formData, rfBeneficiaire: e.target.value })
                }
              >
                {rfBeneficiaire.map((rfBeneficiaire) => (
                  <MenuItem key={rfBeneficiaire.id} value={rfBeneficiaire.id}>
                    {rfBeneficiaire.statutBeneficiaire}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="select-ligne-label">Ligne</InputLabel>
              <Select
                labelId="select-ligne-label"
                id="select-ligne"
                value={selectedLigne}
                onChange={handleLigneChange}
                label="Ligne"
              >
                {ligne.map((ligne) => (
                  <MenuItem key={ligne.id} value={ligne.id}>
                    {ligne.numLigne}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
                </Box>
                <Box>
                  <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="select-classe-beneficiaire-label">Classe de bénéficiaire</InputLabel>
                  <Select
                    labelId="select-classe-beneficiaire-label"
                    id="select-classe-beneficiaire"
                    value={selectedClasseBeneficiaire}
                    onChange={handleClasseBeneficiaireChange}
                    label="Classe de bénéficiaire"
                  >
                    {classesBeneficiaires.map((classeBeneficiaire) => (
                      <MenuItem key={classeBeneficiaire.id} value={classeBeneficiaire.label}>
                        {classeBeneficiaire.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Box>
          
            <Box sx={{display: 'flex', justifyContent: 'flex-end', py: 1}}>
            <Button onClick={handleCreerBeneficiaire} variant='contained' disableElevation>Creer</Button>
            
            </Box>
          </form>
        );
      case 1:
        return (
          <form>
            <TextField
              label="Les téléphones disponibles"
              variant="outlined"
              fullWidth
              select
              sx={{ width: '50%' }}
              value={selectedTelephone}
              onChange={handleTelephoneChange}
            >
              {telephones.map((telephone) => (
                <MenuItem key={telephone.id} value={telephone.id}>
                  {telephone.imei}
                </MenuItem>
              ))}
            </TextField>
          </form>
        );
      case 2:
        return (
          <form>
            {/* Votre formulaire pour la troisième étape */}
            <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
              <TextField
                label="Le forfait"
                variant="outlined"
                fullWidth
                select
                sx={{ width: '50%' }}
                justifyContent="center"
                value={formData.nomforfait}
                onChange={(e) =>
                  setFormData({ ...formData, nomforfait: e.target.value })
                }
              >
                {forfait.map((forfait) => (
                  <MenuItem key={forfait.id} value={forfait.id}>
                    {forfait.nomForfait}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </form>
        );

      default:
        return null;
    }
  };

  const { addBeneficiaire, loading } = useContext(ApiContext);
  const handleCreerBeneficiaire = async () => {
    console.log('handleCreerBeneficiaire: ' + formData.rfBeneficiaire);
    try {
      const data = await addBeneficiaire({ ...formData });
    } catch (error) {
      console.error(error);
    }
    alert('beneficiaire ajouter');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: '1%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box>
          <Box sx={{ pt: 2 }}>{renderForm(activeStep)}</Box>
          {allStepsCompleted() ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  pt: 2,
                  marginTop: '20px',
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                {activeStep + 1 === steps.length ? (
                  <Button onClick={handleComplete}>Finish</Button>
                ) : (
                  <Button onClick={handleNext}>Next</Button>
                )}
              </Box>
            </Fragment>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
