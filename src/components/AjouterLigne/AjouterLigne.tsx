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
import Ligne from '../../pages/Ligne';

const steps = [
  'Création du ligne',
  
];

function HorizontalNonLinearStepper() {
  const [numLigne, setNumLigne] = useState('');
  const [dateActivation, setdateActivation] = useState('');
  const [dateResilliation, setdateResilliation] = useState('');
  const [dateRenouvelement, setdateRenouvelement] = useState('');
  // const[terminal, setterminal]= useState('');
  const [statutForfait, setStatutForfait] = useState('active');
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});
  
  const [rfForaitS ,setrfForaitS] = useState(1)
  const [terminals , setTerminals]= useState(1);
  const [forfait, setForfait] = useState<Forfait[]>([]);
  const [ terminal, setTerminal]= useState<Terminal[]>([]);
  const [rfLigne, setRfLigne] = useState<RfLigne[]>([]);
  const [rfLignes, setRfLignes] = useState(1);
  useEffect(() => {
    const fetchRfLigne = async () => {
      try {
        const response = await axios.get('http://localhost:8089/rfLignes/RfLigne');
        setRfLigne(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des RfLignes :', error);
      }
    };

    fetchRfLigne();
  }, []);

  useEffect(() => {
    const fetchForfait = async () => {
      try {
        const response = await axios.get('http://localhost:8089/forfaits');
        setForfait(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Forfait :', error);
      }
    };

    fetchForfait();
  }, []);
  useEffect(() => {
    const fetchFTerminal = async () => {
      try {
        const response = await axios.get('http://localhost:8089/terminals/terminal');
        setTerminal(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des terminal :', error);
      }
    };

    fetchFTerminal();
  }, []);

  const totalSteps = () => {
    return steps.length;
  };
  interface Ligne {
    nomForfait: string;
    id: number;
    numLigne: string;
    
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
        numLigne: '',
        dateActivation: '',
        dateRenouvelement: '',
        dateResilliation: '',
        terminal: '',
        forfait: '',
        rfLigne: ''
    // Autres champs du formulaire
  });
  interface RfLigne {
    id: number;
    statutLigne: string;
    forfait: string;
  }
  interface Forfait {
    [x: string]: any;
    id: number;
    nomForfait: string;
  }
  interface Terminal {
    [x: string]: any;
    id: number;
    nomTerminal: string;
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
              label="Nmero de ligne"
              variant="outlined"
              fullWidth
              value={formData.numLigne}
              onChange={(e) => setFormData({ ...formData, numLigne: e.target.value })}
            />
            <TextField
              label="date Activation"
              variant="outlined"
              fullWidth
              value={formData.dateActivation}
              onChange={(e) => setFormData({ ...formData, dateActivation: e.target.value })}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
          <TextField
              label="date Renouvelement"
              variant="outlined"
              fullWidth
              value={formData.dateRenouvelement}
              onChange={(e) => setFormData({ ...formData, dateRenouvelement: e.target.value })}
            />
            <TextField
              label="date Resilliation"
              variant="outlined"
              fullWidth
              value={formData.dateResilliation}
              onChange={(e) => setFormData({ ...formData, dateResilliation: e.target.value })}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
          <TextField
               select
              label=" forfait"
              variant="outlined"
              fullWidth
              value={formData.forfait}
              onChange={(e) => setFormData({ ...formData, forfait: e.target.value })}
            >
              {forfait.map((forfait) => (
                <MenuItem
                key={forfait.id}
                value={forfait.id}
                onClick={()=>{
                  setrfForaitS(forfait.id)
                }}>
                  {forfait.nomForfait}
                </MenuItem>
            ))}
              </TextField>
              <TextField
               select
              label=" terminal"
              variant="outlined"
              fullWidth
              value={formData.terminal}
              onChange={(e) => setFormData({ ...formData, terminal: e.target.value })}
            >
              {terminal.map((terminal) => (
                <MenuItem
                key={terminal.id}
                value={terminal.id}
                onClick={()=>{
                  setTerminals(terminal.id)
                }}>
                  {terminal.nomTerminal}
                </MenuItem>
            ))}
              </TextField>
            </Box>
            <Box>
            <TextField
               select
              label=" Statut ligne"
              variant="outlined"
              fullWidth
              value={formData.rfLigne}
              onChange={(e) => setFormData({ ...formData, rfLigne: e.target.value })}
            >
              {rfLigne.map((rfLigne) => (
                <MenuItem
                key={rfLigne.id}
                value={rfLigne.id}
                onClick={()=>{
                  setRfLignes(rfLigne.id)
                }}>
                  {rfLigne.statutLigne}
                </MenuItem>
            ))}
              </TextField>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1 }}>
              <Button
                onClick={handleCreerLigne}
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
  const { addLigne, loading } = useContext(ApiContext);
  const handleCreerLigne = async () => {
    
    try {
      // const data = await addForfait({      nomForfait: formData.nomForfait,
      //   option_forfait: formData.option_forfait,
      //   soldeData: formData.soldeData,
      //   soldeAppels: formData.soldeAppels,
      //   montant: formData.montant,
      //   });
      const payload ={
        numLigne : formData.numLigne ,
        dateActivation: formData.dateActivation,
        dateRenouvelement: formData.dateRenouvelement,
        dateResilliation: formData.dateResilliation,
        
        terminal : {
          id : terminals
        },
        forfait: {
          id: rfForaitS
        },
        rfLigne: {
          id: rfLigne
    
        }
      }
      await axios.post(`http://localhost:8089/lignes`,
        payload
      )
    } catch (error) {
      console.error(error);
    }
    alert('ligne ajouter');
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
