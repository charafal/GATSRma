import React, { useState, useEffect, Fragment, useContext } from 'react';
import axios from 'axios';
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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import ApiContext from '../../context/ApiContext';
import Forfait from '../../pages/Forfait';

const steps = [
  'Création du forfait',
  
];

function HorizontalNonLinearStepper() {
  const [nomForfait, setNomForfait] = useState('');
  const [option_forfait, setoption_forfait] = useState('');
  const [soldeData, setSoldeData] = useState('');
  const [soldeAppels, setSoldeAppels] = useState('');
  const [montant, setMontant] = useState('');
  const [statutForfait, setStatutForfait] = useState('active');
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});
  const [forfait, setForfait] = useState<Forfait[]>([]);
  const [rfForaitS ,setrfForaitS] = useState(1)

  const [rfForfait, setRFForfait] = useState<RFForfait[]>([]);
  useEffect(() => {
    const fetchRfForfait = async () => {
      try {
        const response = await axios.get('http://localhost:8089/rfForfaits/forfait');
        setRFForfait(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des RfForfaits :', error);
      }
    };

    fetchRfForfait();
  }, []);
  

  const totalSteps = () => {
    return steps.length;
  };
  interface Forfait {
    id: number;
    nomForfait: string;
    option_forfait : string;
    // Add other properties if they exist in your data
  }

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
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: React.SetStateAction<number>) => () => {
    setActiveStep(step);
  };
  const [formData, setFormData] = useState({
        nomForfait: '',
        option_forfait: '',
        soldeData: '',
        soldeAppels: '',
        montant: '',
        rfForfait: '',
    // Autres champs du formulaire
  });
  interface RFForfait {
    id: number;
    statutForfait: string;
  }

  const handleComplete = async () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    if (allStepsCompleted()) {
      // Vous pouvez ajouter le code pour terminer l'étape finale ici
      // Par exemple, vous pouvez afficher un message de succès ou rediriger l'utilisateur
      alert('Toutes les étapes sont terminées !');
    } else {
      handleNext();
    }
  };


  const renderForm = (step: number) => {
    switch (step) {
      case 0:
        return (
         <form>
          <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
          <TextField
              label="Nom du forfait"
              variant="outlined"
              fullWidth
              value={formData.nomForfait}
              onChange={(e) => setFormData({ ...formData, nomForfait: e.target.value })}
            />
            <TextField
              label="Option forfait"
              variant="outlined"
              fullWidth
              value={formData.option_forfait}
              onChange={(e) => setFormData({ ...formData, option_forfait: e.target.value })}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
          <TextField
              label="Solde Data"
              variant="outlined"
              fullWidth
              value={formData.soldeData}
              onChange={(e) => setFormData({ ...formData, soldeData: e.target.value })}
            />
            <TextField
              label="Solde appel"
              variant="outlined"
              fullWidth
              value={formData.soldeAppels}
              onChange={(e) => setFormData({ ...formData, soldeAppels: e.target.value })}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
          <TextField
               select
              label="Statut forfait"
              variant="outlined"
              fullWidth
              value={formData.rfForfait}
              onChange={(e) => setFormData({ ...formData, rfForfait: e.target.value })}
            >
              {rfForfait.map((rfForait) => (
                      <MenuItem key={rfForait.id} value={rfForait.id} onClick={()=>{
                        setrfForaitS(rfForait.id)
                      }}>
                        {rfForait.statutForfait}
                      </MenuItem>
                  ))}
              </TextField>
              <TextField
                label="Montant"
                variant="outlined"
                fullWidth
                value={formData.montant}
                onChange={(e) =>
                  setFormData({ ...formData, montant: e.target.value })
                }
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1 }}>
              <Button
                onClick={handleCreerForfait}
                variant="contained"
                disableElevation
              >
                Creer
              </Button>
            </Box>
          </form>
        );
     
     
      
    }
  };

  function handleReset(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    // Fix the type for MouseEvent
    setActiveStep(0);
    setCompleted({});
  }
  const { addForfait, loading } = useContext(ApiContext);
  const handleCreerForfait = async () => {
    console.log('handleCreerForfait: ' + formData.rfForfait);
    try {
      // const data = await addForfait({      nomForfait: formData.nomForfait,
      //   option_forfait: formData.option_forfait,
      //   soldeData: formData.soldeData,
      //   soldeAppels: formData.soldeAppels,
      //   montant: formData.montant,
      //   });
      const payload ={
        nomForfait : formData.nomForfait ,
        montant: formData.montant,
        soldeAppels: formData.soldeAppels,
        soldeData: formData.soldeData,
        option_forfait: formData.option_forfait,
        rfForfait : {
          id : rfForaitS
        }
      }
      await axios.post(`http://localhost:8089/forfaits`,
        payload
      )
    } catch (error) {
      console.error(error);
    }
    alert('beneficiaire ajouter');
  };

  // Autres états et fonctions

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
export default HorizontalNonLinearStepper;
