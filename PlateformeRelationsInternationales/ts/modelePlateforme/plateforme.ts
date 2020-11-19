import { Partenaire } from "./partenaire";
import { AideFinanciere } from "./aideFinanciere";
import { Contact } from "./contact";

export class Plateforme {
    private listePartenairesPlateforme: Partenaire[];
    private listeAidesFinancieresPlateforme: AideFinanciere[];
    private listeContactsPlateforme: Contact[];

    public get ListePartenairesPlateforme(): Partenaire[] {
        return this.listePartenairesPlateforme;
    }

    public get ListeAidesFinancieresPlateforme(): AideFinanciere[] {
        return this.listeAidesFinancieresPlateforme;
    }

    public get ListeContactsPlateforme(): Contact[] {
        return this.listeContactsPlateforme;
    }

    public constructor() {
        this.listePartenairesPlateforme = [];
        this.listeAidesFinancieresPlateforme = [];
        this.listeContactsPlateforme = [];
    }

    public ajouterPartenaire(partenaire: Partenaire): void {
        this.listePartenairesPlateforme.push(partenaire);
    }

    public supprimerPartenaire(partenaire: Partenaire): void {
        var indexPartenaire = this.listePartenairesPlateforme.indexOf(partenaire);
        if (!(indexPartenaire === undefined) && !(indexPartenaire === null)) {
            this.listePartenairesPlateforme.splice(indexPartenaire, 1);
        }
    }

    public ajouterAideFinanciere(aideFinanciere: AideFinanciere): void {
        this.listeAidesFinancieresPlateforme.push(aideFinanciere);
    }

    public supprimerAideFinanciere(aideFinanciere: AideFinanciere): void {
        var indexAideFinanciere = this.listeAidesFinancieresPlateforme.indexOf(aideFinanciere);
        if (!(indexAideFinanciere === undefined) && !(indexAideFinanciere === null)) {
            this.listeAidesFinancieresPlateforme.splice(indexAideFinanciere, 1);
        }
    }

    public ajouterContact(contact: Contact): void {
        this.listeContactsPlateforme.push(contact);
    }

    public supprimerContact(contact: Contact): void {
        var indexContact = this.listeContactsPlateforme.indexOf(contact);
        if (!(indexContact === undefined) && !(indexContact === null)) {
            this.listeContactsPlateforme.splice(indexContact, 1);
        }
    }

}