export interface IBeneficiare {
  id: Number;
  nom: String;
  prenom: String;
  terminal: String;
  imei: String;
  matricule: String;
  dateDepart: string;
  direction: String;
  centreCout: String;
  statut: String;
  dateLivraison: String;
  ligne: number;
  actions: any;
}

export interface IForfait {
  //rfForfait: any;
  id: number;
  nomForfait: String;
  option_forfait: String;
  soldeData: String;
  montant: string;
  //statutForfait : String;
  soldeAppels: String;
  action: any;
  rfForfait: {
    id: number;
    statutForfait: String;
  };
}
export interface ITerminal {
  id: number;
  imei: string;
  nomTerminal: string;
  rfTerminal: string;
  dateReception: String;
  dateCession: String;
  action: any;
};
export interface ILigne{
  id: number;
  numLigne: String;
  refLigne: string;
  //direction:String;
  forfait: String ;
  terminal: string;
  date_activation: String;
  date_resilliation: String;
  action: any;
}
export interface IFacture{
  id: number;
  forfait: string;
  nom: string;
  prenom: string;
  numLigne: string;
  matricule: string;
  montant: string;
  action : any;
}