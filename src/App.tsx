import './index.css';
import { MainContent } from './layout/MainContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Beneficiaires from './pages/Beneficiaires';
import Dashboard from './pages/Dashboard';
import ContextProvider from './context/ContextProvider';
import BeneficiaireAdd from './components/AddBeneficiaire/AddBeneficiaire';
import Forfait from './pages/Forfait';
import ConsulterBeneficiaire from './components/ConsulterBeneficiaire/ConsulterBeneficiaire';
import ModifierBeneficiaire from './components/ModifierBeneficiaire/ModifierBeneficiaire';
import ModifierForfait from './components/ModifierForfait/ModifierForfait';
import Terminal from './pages/Terminal';
import AjouterForfait from './components/AjouterForfait/AjouterForfait';
import AjouterTerminal from './components/AjouterTerminal/AjouterTerminal';
import Ligne from './pages/Ligne';
import Service from './pages/Service';
import Facture from './pages/Facture';
import AjouterLigne from './components/AjouterLigne/AjouterLigne';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<MainContent />}>
              <Route index element={<Dashboard />} />
              <Route path="beneficiaires" element={<Beneficiaires />} />
              <Route path="BeneficiaireAdd" element={<BeneficiaireAdd />} />
              <Route path="forfaits" element={<Forfait />} />
              <Route
                path="/ConsulterBeneficiaire/:id"
                element={<ConsulterBeneficiaire />}
              />
              <Route
                path="/ModifierBeneficiaire/:id"
                element={<ModifierBeneficiaire />}
              />
              <Route
                path="/ModifierForfait/:id"
                element={<ModifierForfait />}
              />
              <Route path="terminals" element={<Terminal />} />
              <Route path="forfaits" element={<Forfait />} />
              <Route path="ajouterForfait" element={<AjouterForfait />} />
              <Route path="ajouterTerminal" element={<AjouterTerminal />} />
              <Route path="lignes" element={<Ligne />} /> {/* Remplacez [] par vos données de lignes */}
              <Route path="ajouterLigne" element={<AjouterLigne />} />
              <Route path="services" element={<Service />} />
              <Route path="factures" element={<Facture   />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
