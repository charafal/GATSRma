import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Stepper,
  Step,
  StepButton,
} from '@mui/material';

import ApiContext from '../../context/ApiContext';

const steps = ['Création du terminal', 'Affecter une ligne', 'Affecter un forfait'];

function AddTerminal() {
  const [dateReception, setDateReception] = useState('');
  const [dateCession, setDateCession] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  const [imei, setIMEI] = useState('');
  const [garantie, setGarantie] = useState('');
  

  const { addTerminal } = useContext(ApiContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleCreerTerminal =() =>{
    alert("creer")
  }

  const renderForm = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form>
            <TextField
              label="Date de réception"
              variant="outlined"
              fullWidth
              value={dateReception}
              onChange={(e) => setDateReception(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Date de cession"
              variant="outlined"
              fullWidth
              value={dateCession}
              onChange={(e) => setDateCession(e.target.value)}
              sx={{ mb: 2 }}
            />
             <TextField
              label="Imei"
              variant="outlined"
              fullWidth
              value={dateCession}
              onChange={(e) => setDateCession(e.target.value)}
              sx={{ mb: 2 }}
            />
             <TextField
              label="Type Terminal"
              variant="outlined"
              fullWidth
              value={dateCession}
              onChange={(e) => setDateCession(e.target.value)}
              sx={{ mb: 2 }}
            />
             <TextField
              label="Etat du terminal"
              variant="outlined"
              fullWidth
              value={dateCession}
              onChange={(e) => setDateCession(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1 }}>
              <Button
                onClick={handleCreerTerminal}
                variant="contained"
                disableElevation
              >
                Creer
              </Button>
            </Box>
            
          </form>
        );
      default:
        return null;
    }
  };

  const handleAddTerminal = async () => {
    // ... (rest of the function)
    try {
      const terminalData = {
        dateReception,
        dateCession,
        imei,
        etatTerminal: '', // Add etatTerminal here
        garantie,
    
      };
  
      const terminalsAdded = await addTerminal(terminalData);
  
      if (terminalsAdded.length > 0) {
        console.log('Terminal(s) ajouté(s) avec succès !');
        alert('Terminal(s) ajouté(s) avec succès !');
      } else {
        console.log("Erreur lors de l'ajout du/des terminal(aux)");
        alert("Erreur lors de l'ajout du/des terminal(aux)");
      }
  
      // Clear form fields after adding terminal
      setDateReception('');
      setDateCession('');
      setIMEI('');
      setGarantie('');
    } catch (error) {
      console.error("Erreur lors de l'appel de l'API d'ajout du terminal :", error);
      alert("Erreur lors de l'appel de l'API d'ajout du terminal");
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <Paper sx={{ width: '100%', padding: '2rem', boxShadow: 3 }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Box>
          <Box sx={{ pt: 2 }}>{renderForm(activeStep)}</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Retour
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTerminal}
              >
                Ajouter le terminal
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Suivant
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddTerminal;


