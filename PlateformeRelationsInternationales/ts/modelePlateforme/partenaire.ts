import { Specialite } from "./specialite";
import { Localisation } from "./localisation";
import { Mobilite } from "./mobilite";

export class Partenaire {
    private identifiantPartenaire: number;
    private nomPartenaire: string;
    private domaineDeCompetence: string;
    private localisationPartenaire: Localisation;
    private listeSpecialitesPartenaire: Specialite[];
    private listeMobilitesPartenaires: Mobilite[];
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

    public get DomaineDeCompetence(): string {
        return this.domaineDeCompetence;
    }

    public set DomaineDeCompetence(domaineDeCompetence: string) {
        this.domaineDeCompetence = domaineDeCompetence;
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

    public constructor() {
        this.identifiantPartenaire = 0;
        this.nomPartenaire = "";
        this.domaineDeCompetence = "";
        this.localisationPartenaire = null;
        this.listeSpecialitesPartenaire = [];
        this.listeMobilitesPartenaires = [];
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

}