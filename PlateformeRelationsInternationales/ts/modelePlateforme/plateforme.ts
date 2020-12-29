import { Partenaire } from "./partenaire";
import { AideFinanciere } from "./aideFinanciere";
import { Contact } from "./contact";
import { Specialite } from "./specialite";
import { Mobilite } from "./mobilite";
import { SousSpecialite } from "./sousspecialite";
import { Cout } from "./cout";
import { EtatPartenaire } from "./etatpartenaire";
import { Voeu } from "./voeu";

export class Plateforme {
    private listeSpecialitesPlateforme: Specialite[];
    private listeMobilitesPlateforme: Mobilite[];
    private listePartenairesPlateforme: Partenaire[];
    private listeAidesFinancieresPlateforme: AideFinanciere[];
    private listeContactsPlateforme: Contact[];
    private listeVoeuxPlateforme: Voeu[];
    private listeCoutsPlateforme: Cout[];
    private listeEtatsPartenairesPlateforme: EtatPartenaire[];

    public get ListeSpecialitesPlateforme(): Specialite[] {
        return this.listeSpecialitesPlateforme;
    }

    public get ListeMobilitesPlateforme(): Mobilite[] {
        return this.listeMobilitesPlateforme;
    }

    public get ListePartenairesPlateforme(): Partenaire[] {
        return this.listePartenairesPlateforme;
    }

    public get ListeAidesFinancieresPlateforme(): AideFinanciere[] {
        return this.listeAidesFinancieresPlateforme;
    }

    public get ListeContactsPlateforme(): Contact[] {
        return this.listeContactsPlateforme;
    }

    public get ListeVoeuxPlateforme(): Voeu[] {
        return this.listeVoeuxPlateforme;
    }

    public get ListeCoutsPlateforme(): Cout[] {
        return this.listeCoutsPlateforme;
    }

    public get ListeEtatsPartenairesPlateforme(): EtatPartenaire[] {
        return this.listeEtatsPartenairesPlateforme;
    }

    public constructor() {
        this.listeSpecialitesPlateforme = [];
        this.listeMobilitesPlateforme = [];
        this.listePartenairesPlateforme = [];
        this.listeAidesFinancieresPlateforme = [];
        this.listeContactsPlateforme = [];
        this.listeVoeuxPlateforme = [];
        this.listeCoutsPlateforme = [];
        this.listeEtatsPartenairesPlateforme = [];
    }

    public getSpecialiteAvecIdentifiant(identifiantSpecialite: number): Specialite {
        var res: Specialite = null;
        this.listeSpecialitesPlateforme.forEach((specialite: Specialite) => {
            if (specialite.IdentifiantSpecialite == identifiantSpecialite) {
                res = specialite;
            }
        });
        return res;
    }

    public getSousSpecialiteAvecIdentifiant(identifiantSousSpecialite: number): SousSpecialite {
        var res: SousSpecialite = null;
        this.listeSpecialitesPlateforme.forEach((specialite: Specialite) => {
            specialite.ListeSousSpecialites.forEach((sousSpecialite: SousSpecialite) => {
                if (sousSpecialite.IdentifiantSousSpecialite == identifiantSousSpecialite) {
                    res = sousSpecialite;
                }
            });
        });
        return res;
    }

    public getMobiliteAvecIdentifiant(identifiantMobilite: number): Mobilite {
        var res: Mobilite = null;
        this.listeMobilitesPlateforme.forEach((mobilite: Mobilite) => {
            if (mobilite.IdentifiantMobilite == identifiantMobilite) {
                res = mobilite;
            }
        });
        return res;
    }

    public getAideFinanciereAvecIdentifiant(identifiantAideFinanciere: number): AideFinanciere {
        var res: AideFinanciere = null;
        this.listeAidesFinancieresPlateforme.forEach((aideFinanciere: AideFinanciere) => {
            if (aideFinanciere.IdentifiantAideFinanciere == identifiantAideFinanciere) {
                res = aideFinanciere;
            }
        });
        return res;
    }

    public getContactAvecIdentifiant(identifiantContact: number): Contact {
        var res: Contact = null;
        this.listeContactsPlateforme.forEach((contact: Contact) => {
            if (contact.IdentifiantContact == identifiantContact) {
                res = contact;
            }
        });
        return res;
    }

    public getVoeuAvecIdentifiant(identifiantVoeu: number): Voeu {
        var res: Voeu = null;
        this.listeVoeuxPlateforme.forEach((voeu: Voeu) => {
            if (voeu.IdentifiantVoeu == identifiantVoeu) {
                res = voeu;
            }
        });
        return res;
    }

    public getSpecialiteAvecSousSpecialite(sousSpecialite: SousSpecialite): Specialite {
        var res: Specialite = null;
        this.listeSpecialitesPlateforme.forEach((specialite: Specialite) => {
            if (specialite.ListeSousSpecialites.includes(sousSpecialite)) {
                res = specialite;
            }
        });
        return res;
    }

    public getCoutAvecIdentifiant(identifiantCout: number): Cout {
        var res: Cout = null;
        this.listeCoutsPlateforme.forEach((cout: Cout) => {
            if (cout.IdentifiantCout == identifiantCout) {
                res = cout;
            }
        });
        return res;
    }

    public getCoutAvecNomPays(nomPaysCout: string): Cout {
        var res: Cout = null;
        this.listeCoutsPlateforme.forEach((cout: Cout) => {
            if (cout.NomPaysCout == nomPaysCout) {
                res = cout;
            }
        });
        return res;
    }

    public getEtatPartenaireAvecIdentifiant(identifiantEtatPartenaire: number): EtatPartenaire {
        var res: EtatPartenaire = null;
        this.listeEtatsPartenairesPlateforme.forEach((etatPartenaire: EtatPartenaire) => {
            if (etatPartenaire.IdentifiantEtatPartenaire == identifiantEtatPartenaire) {
                res = etatPartenaire;
            }
        });
        return res;
    }

    public ajouterSpecialite(specialite: Specialite): void {
        this.listeSpecialitesPlateforme.push(specialite);
    }

    public supprimerSpecialite(specialite: Specialite): void {
        var indexSpecialite = this.listeSpecialitesPlateforme.indexOf(specialite);
        if (!(indexSpecialite === undefined) && !(indexSpecialite === null)) {
            this.listeSpecialitesPlateforme.splice(indexSpecialite, 1);
        }
    }

    public ajouterMobilite(mobilite: Mobilite): void {
        this.listeMobilitesPlateforme.push(mobilite);
    }

    public supprimerMobilite(mobilite: Mobilite): void {
        var indexMobilite = this.listeMobilitesPlateforme.indexOf(mobilite);
        if (!(indexMobilite === undefined) && !(indexMobilite === null)) {
            this.listeMobilitesPlateforme.splice(indexMobilite, 1);
        }
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

    public ajouterVoeu(voeu: Voeu): void {
        this.listeVoeuxPlateforme.push(voeu);
    }

    public supprimerVoeu(voeu: Voeu): void {
        var indexVoeu = this.listeVoeuxPlateforme.indexOf(voeu);
        if (!(indexVoeu === undefined) && !(indexVoeu === null)) {
            this.listeVoeuxPlateforme.splice(indexVoeu, 1);
        }
    }

    public ajouterCout(cout: Cout): void {
        this.listeCoutsPlateforme.push(cout);
    }

    public supprimerCout(cout: Cout): void {
        var indexCout = this.listeCoutsPlateforme.indexOf(cout);
        if (!(indexCout === undefined) && !(indexCout === null)) {
            this.listeCoutsPlateforme.splice(indexCout, 1);
        }
    }

    public ajouterEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        this.listeEtatsPartenairesPlateforme.push(etatPartenaire);
    }

    public supprimerEtatPartenaire(etatPartenaire: EtatPartenaire): void {
        var indexEtatPartenaire = this.listeEtatsPartenairesPlateforme.indexOf(etatPartenaire);
        if (!(indexEtatPartenaire === undefined) && !(indexEtatPartenaire === null)) {
            this.listeEtatsPartenairesPlateforme.splice(indexEtatPartenaire, 1);
        }
    }

}