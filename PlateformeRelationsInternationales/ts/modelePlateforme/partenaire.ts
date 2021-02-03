import { SousSpecialite } from "./sousspecialite";
import { Localisation } from "./localisation";
import { Mobilite } from "./mobilite";
import { Contact } from "./contact";
import { AideFinanciere } from "./aideFinanciere";
import { ISerializable } from "./ISerializable";
import { FichierPartenaire } from "./fichierPartenaire";
import { Cout } from "./cout";
import { EtatPartenaire } from "./etatpartenaire";
import { Voeu } from "./voeu";
import { DomaineDeCompetence } from "./domaineDeCompetence";
import { ContactEtranger } from "./contactEtranger";
import { Coordinateur } from "./coordinateur";

export class Partenaire implements ISerializable {
    private identifiantPartenaire: number;
    private nomPartenaire: string;
    private lienPartenaire: string;
    private informationLogementPartenaire: string;
    private informationCoutPartenaire: string;
    private localisationPartenaire: Localisation;
    private coutPartenaire: Cout;
    private etatPartenaire: EtatPartenaire;
    private listeDomainesDeCompetencesPartenaire: DomaineDeCompetence[];
    private listeSousSpecialitesPartenaire: SousSpecialite[];
    private listeMobilitesPartenaires: Mobilite[];
    private listeContactsEtrangersPartenaires: ContactEtranger[];
    private listeCoordinateursPartenaires: Coordinateur[];
    private listeAidesFinancieresPartenaires: AideFinanciere[];
    private listeVoeuxPartenaire: Voeu[];
    private listeFichiersPartenaire: FichierPartenaire[];

    public get IdentifiantPartenaire(): number {
        return this.identifiantPartenaire;
    }

    public set IdentifiantPartenaire(identifiantPartenaire: number) {
        this.identifiantPartenaire = identifiantPartenaire;
    }

    public get NomPartenaire(): string {
        return this.nomPartenaire;
    }

    public set NomPartenaire(nomPartenaire: string) {
        this.nomPartenaire = nomPartenaire;
    }

    public get LienPartenaire(): string {
        return this.lienPartenaire;
    }

    public set LienPartenaire(lienPartenaire: string) {
        this.lienPartenaire = lienPartenaire;
    }

    public get InformationLogementPartenaire(): string {
        return this.informationLogementPartenaire;
    }

    public set InformationLogementPartenaire(informationLogementPartenaire: string) {
        this.informationLogementPartenaire = informationLogementPartenaire;
    }

    public get InformationCoutPartenaire(): string {
        return this.informationCoutPartenaire;
    }

    public set InformationCoutPartenaire(informationCoutPartenaire: string) {
        this.informationCoutPartenaire = informationCoutPartenaire;
    }

    public get LocalisationPartenaire(): Localisation {
        return this.localisationPartenaire;
    }

    public set LocalisationPartenaire(localisationPartenaire: Localisation) {
        this.localisationPartenaire = localisationPartenaire;
    }

    public get CoutPartenaire(): Cout {
        return this.coutPartenaire;
    }

    public set CoutPartenaire(coutPartenaire: Cout) {
        this.coutPartenaire = coutPartenaire;
    }

    public get EtatPartenaire(): EtatPartenaire {
        return this.etatPartenaire;
    }

    public set EtatPartenaire(etatPartenaire: EtatPartenaire) {
        this.etatPartenaire = etatPartenaire;
    }

    public get ListeDomainesDeCompetencesPartenaire(): DomaineDeCompetence[] {
        return this.listeDomainesDeCompetencesPartenaire;
    }

    public set ListeDomainesDeCompetencesPartenaire(listeDomainesDeCompetencesPartenaire: DomaineDeCompetence[]) {
        this.listeDomainesDeCompetencesPartenaire = listeDomainesDeCompetencesPartenaire;
    }

    public get ListeSousSpecialitesPartenaire(): SousSpecialite[] {
        return this.listeSousSpecialitesPartenaire;
    }

    public set ListeSousSpecialitesPartenaire(listeSousSpecialitesPartenaire: SousSpecialite[]) {
        this.listeSousSpecialitesPartenaire = listeSousSpecialitesPartenaire;
    }

    public get ListeMobilitesPartenaires(): Mobilite[] {
        return this.listeMobilitesPartenaires;
    }

    public set ListeMobilitesPartenaires(listeMobilitesPartenaires: Mobilite[]) {
        this.listeMobilitesPartenaires = listeMobilitesPartenaires;
    }

    public get ListeAidesFinancieresPartenaires(): AideFinanciere[] {
        return this.listeAidesFinancieresPartenaires;
    }

    public set ListeAidesFinancieresPartenaires(listeAidesFinancieresPartenaires: AideFinanciere[]) {
        this.listeAidesFinancieresPartenaires = listeAidesFinancieresPartenaires;
    }

    public get ListeContactsEtrangersPartenaires(): ContactEtranger[] {
        return this.listeContactsEtrangersPartenaires;
    }

    public set ListeContactsEtrangersPartenaires(listeContactsEtrangersPartenaires: ContactEtranger[]) {
        this.listeContactsEtrangersPartenaires = listeContactsEtrangersPartenaires;
    }

    public get ListeCoordinateursPartenaires(): Coordinateur[] {
        return this.listeCoordinateursPartenaires;
    }

    public set ListeCoordinateursPartenaires(listeCoordinateursPartenaires: Coordinateur[]) {
        this.listeCoordinateursPartenaires = listeCoordinateursPartenaires;
    }

    public get ListeVoeuxPartenaire(): Voeu[] {
        return this.listeVoeuxPartenaire;
    }

    public set ListeVoeuxPartenaire(listeVoeuxPartenaire: Voeu[]) {
        this.listeVoeuxPartenaire = listeVoeuxPartenaire;
    }

    public get ListeFichiersPartenaire(): FichierPartenaire[] {
        return this.listeFichiersPartenaire;
    }

    public set ListeFichiersPartenaire(listeFichiersPartenaire: FichierPartenaire[]) {
        this.listeFichiersPartenaire = listeFichiersPartenaire;
    }

    public getListeDomainesDeCompetencesPartenaireId(): any[] {
        var listeDomainesDeCompetencesPartenaireId: any[] = [];
        this.listeDomainesDeCompetencesPartenaire.forEach((domaineDeCompetence: DomaineDeCompetence) => {
            listeDomainesDeCompetencesPartenaireId.push(domaineDeCompetence.getObjetSerializableId());
        });
        return listeDomainesDeCompetencesPartenaireId;
    }

    public getListeSousSpecialitesPartenaireId(): any[] {
        var listeSousSpecialitesPartenaireId: any[] = [];
        this.listeSousSpecialitesPartenaire.forEach((sousSpecialite: SousSpecialite) => {
            listeSousSpecialitesPartenaireId.push(sousSpecialite.getObjetSerializableId());
        });
        return listeSousSpecialitesPartenaireId;
    }

    public getListeMobilitesPartenaireId(): any[] {
        var listeMobilitesPartenaireId: any[] = [];
        this.listeMobilitesPartenaires.forEach((mobilite: Mobilite) => {
            listeMobilitesPartenaireId.push(mobilite.getObjetSerializableId());
        });
        return listeMobilitesPartenaireId;
    }

    public getListeAidesFinancieresPartenaireId(): any[] {
        var listeAidesFinancieresPartenaireId: any[] = [];
        this.listeAidesFinancieresPartenaires.forEach((aideFinanciere: AideFinanciere) => {
            listeAidesFinancieresPartenaireId.push(aideFinanciere.getObjetSerializableId());
        });
        return listeAidesFinancieresPartenaireId;
    }

    public getListeContactsEtrangersPartenaireId(): any[] {
        var listeContactsEtrangersPartenaireId: any[] = [];
        this.listeContactsEtrangersPartenaires.forEach((contactEtranger: ContactEtranger) => {
            listeContactsEtrangersPartenaireId.push(contactEtranger.getObjetSerializableId());
        });
        return listeContactsEtrangersPartenaireId;
    }

    public getListeCoordinateursPartenaireId(): any[] {
        var listeCoordinateursPartenaireId: any[] = [];
        this.listeCoordinateursPartenaires.forEach((coordinateur: Coordinateur) => {
            listeCoordinateursPartenaireId.push(coordinateur.getObjetSerializableId());
        });
        return listeCoordinateursPartenaireId;
    }

    public getListeVoeuxPartenaireId(): any[] {
        var listeVoeuxPartenaireId: any[] = [];
        this.listeVoeuxPartenaire.forEach((voeu: Voeu) => {
            listeVoeuxPartenaireId.push(voeu.getObjetSerializableId());
        });
        return listeVoeuxPartenaireId;
    }

    public getListeFichiersPartenaire(): any[] {
        var listeFichiersPartenaire: any[] = [];
        this.listeFichiersPartenaire.forEach((fichierPartenaire: FichierPartenaire) => {
            listeFichiersPartenaire.push(fichierPartenaire.getObjetSerializable());
        });
        return listeFichiersPartenaire;
    }

    public getFichierPartenaireAvecNomFichier(nomFichierPartenaire: string): FichierPartenaire {
        var res: FichierPartenaire = null;
        this.listeFichiersPartenaire.forEach((fichierPartenaire: FichierPartenaire) => {
            if (fichierPartenaire.CheminFichierPartenaireServeur.split("/").pop() == nomFichierPartenaire) {
                res = fichierPartenaire;
            }
        });
        return res;
    }

    public constructor() {
        this.identifiantPartenaire = 0;
        this.nomPartenaire = "";
        this.lienPartenaire = "";
        this.informationLogementPartenaire = "";
        this.informationCoutPartenaire = "";
        this.localisationPartenaire = null;
        this.coutPartenaire = null;
        this.etatPartenaire = null;
        this.listeDomainesDeCompetencesPartenaire = [];
        this.listeSousSpecialitesPartenaire = [];
        this.listeMobilitesPartenaires = [];
        this.listeContactsEtrangersPartenaires = [];
        this.listeCoordinateursPartenaires = [];
        this.listeAidesFinancieresPartenaires = [];
        this.listeVoeuxPartenaire = [];
        this.listeFichiersPartenaire = [];
    }

    public ajouterDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        this.listeDomainesDeCompetencesPartenaire.push(domaineDeCompetence);
    }

    public supprimerDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        var indexDomaineDeCompetence = this.listeDomainesDeCompetencesPartenaire.indexOf(domaineDeCompetence);
        if (!(indexDomaineDeCompetence === undefined) && !(indexDomaineDeCompetence === null)) {
            this.listeDomainesDeCompetencesPartenaire.splice(indexDomaineDeCompetence, 1);
        }
    }

    public ajouterSousSpecialite(sousSpecialite: SousSpecialite): void {
        this.listeSousSpecialitesPartenaire.push(sousSpecialite);
    }

    public supprimerSousSpecialite(sousSpecialite: SousSpecialite): void {
        var indexSousSpecialite = this.listeSousSpecialitesPartenaire.indexOf(sousSpecialite);
        if (!(indexSousSpecialite === undefined) && !(indexSousSpecialite === null)) {
            this.listeSousSpecialitesPartenaire.splice(indexSousSpecialite, 1);
        }
    }

    public ajouterMobilite(mobilite: Mobilite): void {
        this.listeMobilitesPartenaires.push(mobilite);
    }

    public supprimerMobilite(mobilite: Mobilite): void {
        var indexMobilite = this.listeMobilitesPartenaires.indexOf(mobilite);
        if (!(indexMobilite === undefined) && !(indexMobilite === null)) {
            this.listeMobilitesPartenaires.splice(indexMobilite, 1);
        }
    }

    public ajouterAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.listeAidesFinancieresPartenaires.push(aideFinanciere);
    }

    public supprimerAideFinanciere(aideFinanciere: AideFinanciere): void {
        var indexAideFinanciere = this.listeAidesFinancieresPartenaires.indexOf(aideFinanciere);
        if (!(indexAideFinanciere === undefined) && !(indexAideFinanciere === null)) {
            this.listeAidesFinancieresPartenaires.splice(indexAideFinanciere, 1);
        }
    }

    public ajouterContactEtranger(contactEtranger: ContactEtranger): void {
        this.listeContactsEtrangersPartenaires.push(contactEtranger);
    }

    public supprimerContactEtranger(contactEtranger: ContactEtranger): void {
        var indexContactEtranger = this.listeContactsEtrangersPartenaires.indexOf(contactEtranger);
        if (!(indexContactEtranger === undefined) && !(indexContactEtranger === null)) {
            this.listeContactsEtrangersPartenaires.splice(indexContactEtranger, 1);
        }
    }

    public ajouterCoordinateur(coordinateur: Coordinateur): void {
        this.listeCoordinateursPartenaires.push(coordinateur);
    }

    public supprimerCoordinateur(coordinateur: Coordinateur): void {
        var indexCoordinateur = this.listeCoordinateursPartenaires.indexOf(coordinateur);
        if (!(indexCoordinateur === undefined) && !(indexCoordinateur === null)) {
            this.listeCoordinateursPartenaires.splice(indexCoordinateur, 1);
        }
    }

    public ajouterVoeu(voeu: Voeu): void {
        this.listeVoeuxPartenaire.push(voeu);
    }

    public supprimerVoeu(voeu: Voeu): void {
        var indexVoeu = this.listeVoeuxPartenaire.indexOf(voeu);
        if (!(indexVoeu === undefined) && !(indexVoeu === null)) {
            this.listeVoeuxPartenaire.splice(indexVoeu, 1);
        }
    }

    public ajouterFichierPartenaire(fichierPartenaire: FichierPartenaire): void {
        this.listeFichiersPartenaire.push(fichierPartenaire);
    }

    public supprimerFichierPartenaire(fichierPartenaire: FichierPartenaire): void {
        var indexFichierPartenaire = this.listeFichiersPartenaire.indexOf(fichierPartenaire);
        if (!(indexFichierPartenaire === undefined) && !(indexFichierPartenaire === null)) {
            this.listeFichiersPartenaire.splice(indexFichierPartenaire, 1);
        }
    }

    public getObjetSerializable(): any {
        var partenaire = {
            identifiantPartenaire: this.IdentifiantPartenaire,
            nomPartenaire: this.NomPartenaire,
            lienPartenaire: this.LienPartenaire,
            informationLogementPartenaire: this.InformationLogementPartenaire,
            informationCoutPartenaire: this.InformationCoutPartenaire,
            localisationPartenaire: this.LocalisationPartenaire.getObjetSerializable(),
            coutPartenaire: this.CoutPartenaire.getObjetSerializableId(),
            etatPartenaire: this.EtatPartenaire.getObjetSerializableId(),
            listeDomainesDeCompetencesPartenaire: this.getListeDomainesDeCompetencesPartenaireId(),
            listeSousSpecialitesPartenaire: this.getListeSousSpecialitesPartenaireId(),
            listeMobilitesPartenaire: this.getListeMobilitesPartenaireId(),
            listeAidesFinancieresPartenaire: this.getListeAidesFinancieresPartenaireId(),
            listeContactsEtrangersPartenaire: this.getListeContactsEtrangersPartenaireId(),
            listeCoordinateursPartenaire: this.getListeCoordinateursPartenaireId(),
            listeVoeuxPartenaire: this.getListeVoeuxPartenaireId(),
            listeFichiersPartenaire: this.getListeFichiersPartenaire()
        }
        return partenaire;
    }

    public getObjetSerializableId(): any {
        var partenaire = {
            identifiantPartenaire: this.IdentifiantPartenaire
        }
        return partenaire;
    }

}