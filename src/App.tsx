import "./index.css";
import { MainContent } from "./layout/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beneficiaires from "./pages/Beneficiaires";
import Dashboard from "./pages/Dashboard";
import ContextProvider from "./context/ContextProvider";
import BeneficiaireAdd from "./components/AddBeneficiaire/AddBeneficiaire";
import Forfait from "./pages/Forfait";
import ConsulterBeneficiaire from "./components/ConsulterBeneficiaire/ConsulterBeneficiaire";
import ModifierBeneficiaire from "./components/ModifierBeneficiaire/ModifierBeneficiaire";
import ModifierForfait from "./components/ModifierForfait/ModifierForfait";
import Terminal from "./pages/Terminal";
import AjouterForfait from "./components/AjouterForfait/AjouterForfait";


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
              <Route path="/ConsulterBeneficiaire/:id" element={<ConsulterBeneficiaire />} /> 
              <Route path="/ModifierBeneficiaire/:id" element={<ModifierBeneficiaire />} />
               <Route path="/ModifierForfait/:id" element={<ModifierForfait />} /> 
               <Route path="terminals" element={<Terminal />} />
               <Route path="forfaits" element={<Forfait />} />
               <Route path="ajouterForfait" element={<AjouterForfait />} />
              {/* <Route path="reglement" element={<Reglement />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
