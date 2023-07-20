// export interface IQuittance {
//     cdDecentral: number;
//     nPolice: String
//     nQuittance: String;
//     etatQuittance: String;
//     dateEtat: String;
//     primeNet: number;
//     raisonSociale: String;
//     refReglement: string;
//     dateReglement: String;
//     taxEveCat: number;
// }

export interface IBeneficiare {
    id: Number;
    nom: String;
    prenom: String;
    nligne: String;
    terminal: String;
    imei: String;
    matricule: String;
    direction: String;
    centreCout: String;
    statut: String;
    dateLivraison: String;
    actions : any;
}
export interface IForfait {
    id : number;
    nomForfait : String;
    option_forfait: String;
    soldeData : String;
    montant: String;
    statutForfait : string;
    soldeAppels : String;
    action: any;
   
  }
  export interface ITerminal {
    id : number;
    imei : string;
    etatTerminal: String;
    dateReception : String;
    dateCession: String;
    action: any;
   
  }
  
  