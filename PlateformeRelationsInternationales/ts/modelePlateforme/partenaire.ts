import { Specialite } from "./specialite";
import { Localisation } from "./localisation";
import { Mobilite } from "./mobilite";
import { Contact } from "./contact";
import { AideFinanciere } from "./aideFinanciere";

export class Partenaire {
    private identifiantPartenaire: number;
    private nomPartenaire: string;
    private domaineDeCompetencePartenaire: string;
    private localisationPartenaire: Localisation;
    private listeSpecialitesPartenaire: Specialite[];
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

    public get ListeSpecialitesPartenaire(): Specialite[] {
        return this.listeSpecialitesPartenaire;
    }

    public get ListeMobilitesPartenaires(): Mobilite[] {
        return this.listeMobilitesPartenaires;
    }

    public get ListeContactsPartenaires(): Contact[] {
        return this.listeContactsPartenaires;
    }

    public get ListeAidesFinancieresPartenaires(): AideFinanciere[] {
        return this.listeAidesFinancieresPartenaires;
    }

    public constructor() {
        this.identifiantPartenaire = 0;
        this.nomPartenaire = "";
        this.domaineDeCompetencePartenaire = "";
        this.localisationPartenaire = null;
        this.listeSpecialitesPartenaire = [];
        this.listeMobilitesPartenaires = [];
        this.listeContactsPartenaires = [];
        this.listeAidesFinancieresPartenaires = [];
        this.informationLogementPartenaire = "";
        this.informationCoutPartenaire = "";
    }

    public ajouterSpecialite(specialite: Specialite): void {
        this.listeSpecialitesPartenaire.push(specialite);
    }

    public supprimerSpecialite(specialite: Specialite): void {
        var indexSpecialite = this.listeSpecialitesPartenaire.indexOf(specialite);
        if (!(indexSpecialite === undefined) && !(indexSpecialite === null)) {
            this.listeSpecialitesPartenaire.splice(indexSpecialite, 1);
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

}