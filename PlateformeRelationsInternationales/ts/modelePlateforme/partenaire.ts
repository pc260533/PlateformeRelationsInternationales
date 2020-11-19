import { SousSpecialite } from "./sousspecialite";
import { Localisation } from "./localisation";
import { Mobilite } from "./mobilite";
import { Contact } from "./contact";
import { AideFinanciere } from "./aideFinanciere";
import { ISerializable } from "./ISerializable";

export class Partenaire implements ISerializable {
    private identifiantPartenaire: number;
    private nomPartenaire: string;
    private domaineDeCompetencePartenaire: string;
    private localisationPartenaire: Localisation;
    private listeSousSpecialitesPartenaire: SousSpecialite[];
    private listeMobilitesPartenaires: Mobilite[];
    private listeContactsPartenaires: Contact[];
    private listeAidesFinancieresPartenaires: AideFinanciere[];
    private informationLogementPartenaire: string;
    private informationCoutPartenaire: string;

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

    public get DomaineDeCompetencePartenaire(): string {
        return this.domaineDeCompetencePartenaire;
    }

    public set DomaineDeCompetencePartenaire(domaineDeCompetencePartenaire: string) {
        this.domaineDeCompetencePartenaire = domaineDeCompetencePartenaire;
    }

    public get LocalisationPartenaire(): Localisation {
        return this.localisationPartenaire;
    }

    public set LocalisationPartenaire(localisationPartenaire: Localisation) {
        this.localisationPartenaire = localisationPartenaire;
    }

    public get ListeSousSpecialitesPartenaire(): SousSpecialite[] {
        return this.listeSousSpecialitesPartenaire;
    }

    public get ListeMobilitesPartenaires(): Mobilite[] {
        return this.listeMobilitesPartenaires;
    }

    public get ListeContactsPartenaires(): Contact[] {
        return this.ListeContactsPartenaires;
    }

    public set ListeContactsPartenaires(listeContactsPartenaires: Contact[]) {
        this.listeContactsPartenaires = listeContactsPartenaires;
    }

    public get ListeAidesFinancieresPartenaires(): AideFinanciere[] {
        return this.listeAidesFinancieresPartenaires;
    }

    public set ListeAidesFinancieresPartenaires(listeAidesFinancieresPartenaires: AideFinanciere[]) {
        this.listeAidesFinancieresPartenaires = listeAidesFinancieresPartenaires;
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

    public constructor() {
        this.identifiantPartenaire = 0;
        this.nomPartenaire = "";
        this.domaineDeCompetencePartenaire = "";
        this.localisationPartenaire = null;
        this.listeSousSpecialitesPartenaire = [];
        this.listeMobilitesPartenaires = [];
        this.listeContactsPartenaires = [];
        this.listeAidesFinancieresPartenaires = [];
        this.informationLogementPartenaire = "";
        this.informationCoutPartenaire = "";
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

    public ajouterContact(contact: Contact): void {
        this.listeContactsPartenaires.push(contact);
    }

    public supprimerContact(contact: Contact): void {
        var indexContact = this.listeContactsPartenaires.indexOf(contact);
        if (!(indexContact === undefined) && !(indexContact === null)) {
            this.listeContactsPartenaires.splice(indexContact, 1);
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

    public getObjetSerializable(): any {
        var partenaire = {
            identifiantPartenaire: this.IdentifiantPartenaire,
            nomPartenaire: this.NomPartenaire,
            domaineDeCompetencePartenaire: this.DomaineDeCompetencePartenaire,
            localisationPartenaire: this.LocalisationPartenaire.getObjetSerializable(),
            informationLogementPartenaire: this.InformationLogementPartenaire,
            informationCoutPartenaire: this.InformationCoutPartenaire
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