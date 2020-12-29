import { Partenaire } from "./partenaire";
import { AideFinanciere } from "./aideFinanciere";
import { Contact } from "./contact";
import { Specialite } from "./specialite";
import { Mobilite } from "./mobilite";
import { SousSpecialite } from "./sousspecialite";
import { Cout } from "./cout";
import { EtatPartenaire } from "./etatpartenaire";
import { Voeu } from "./voeu";
import { DomaineDeCompetence } from "./domaineDeCompetence";
import { ContactEtranger } from "./contactEtranger";
import { Coordinateur } from "./coordinateur";
import { Utilisateur } from "./utilisateur";
import { TemplateMail } from "./templateMail";
import { Mail } from "./mail";

export class Plateforme {
    private listeSpecialitesPlateforme: Specialite[];
    private listeMobilitesPlateforme: Mobilite[];
    private listePartenairesPlateforme: Partenaire[];
    private listeAidesFinancieresPlateforme: AideFinanciere[];
    private listeContactsEtrangersPlateforme: ContactEtranger[];
    private listeCoordinateursPlateforme: Coordinateur[];
    private listeVoeuxPlateforme: Voeu[];
    private listeCoutsPlateforme: Cout[];
    private listeEtatsPartenairesPlateforme: EtatPartenaire[];
    private listeDomainesDeCompetences: DomaineDeCompetence[];
    private listeUtilisateursPlateforme: Utilisateur[];
    private listeTemplatesMails: TemplateMail[];
    private listeMails: Mail[];
    private utilisateurConnecte: Utilisateur;

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

    public get ListeContactsEtrangersPlateforme(): ContactEtranger[] {
        return this.listeContactsEtrangersPlateforme;
    }

    public get ListeCoordinateursPlateforme(): Coordinateur[] {
        return this.listeCoordinateursPlateforme;
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

    public get ListeDomainesDeCompetences(): DomaineDeCompetence[] {
        return this.listeDomainesDeCompetences;
    }

    public get ListeUtilisateursPlateforme(): Utilisateur[] {
        return this.listeUtilisateursPlateforme;
    }

    public get ListeTemplatesMails(): TemplateMail[] {
        return this.listeTemplatesMails;
    }

    public get ListeMails(): Mail[] {
        return this.listeMails;
    }

    public get UtilisateurConnecte(): Utilisateur {
        return this.utilisateurConnecte;
    }

    public set UtilisateurConnecte(utilisateurConnecte: Utilisateur) {
        this.utilisateurConnecte = utilisateurConnecte;
    }

    public constructor() {
        this.listeSpecialitesPlateforme = [];
        this.listeMobilitesPlateforme = [];
        this.listePartenairesPlateforme = [];
        this.listeAidesFinancieresPlateforme = [];
        this.listeContactsEtrangersPlateforme = [];
        this.listeCoordinateursPlateforme = [];
        this.listeVoeuxPlateforme = [];
        this.listeCoutsPlateforme = [];
        this.listeEtatsPartenairesPlateforme = [];
        this.listeDomainesDeCompetences = [];
        this.listeUtilisateursPlateforme = [];
        this.listeTemplatesMails = [];
        this.listeMails = [];
        this.utilisateurConnecte = null;
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

    public getPartenaireAvecIdentifiant(identfiantPartenaire: number): Partenaire {
        var res: Partenaire = null;
        this.listePartenairesPlateforme.forEach((partenaire: Partenaire) => {
            if (partenaire.IdentifiantPartenaire == identfiantPartenaire) {
                res = partenaire;
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

    public getContactEtrangerAvecIdentifiant(identifiantContactEtranger: number): ContactEtranger {
        var res: ContactEtranger = null;
        this.listeContactsEtrangersPlateforme.forEach((contactEtranger: ContactEtranger) => {
            if (contactEtranger.IdentifiantContact == identifiantContactEtranger) {
                res = contactEtranger;
            }
        });
        return res;
    }

    public getCoordinateurAvecIdentifiant(identifiantCoordinateur: number): Coordinateur {
        var res: Coordinateur = null;
        this.listeCoordinateursPlateforme.forEach((coordinateur: Coordinateur) => {
            if (coordinateur.IdentifiantContact == identifiantCoordinateur) {
                res = coordinateur;
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

    public getDomaineDeCompetenceAvecIdentifiant(identifiantDomaineDeCompetence: number): DomaineDeCompetence {
        var res: DomaineDeCompetence = null;
        this.listeDomainesDeCompetences.forEach((domaineDeCompetence: DomaineDeCompetence) => {
            if (domaineDeCompetence.IdentifiantDomaineDeCompetence == identifiantDomaineDeCompetence) {
                res = domaineDeCompetence;
            }
        });
        return res;
    }

    public getUtilisateurAvecIdentifiant(identifiantUtilisateur: number): Utilisateur {
        var res: Utilisateur = null;
        this.listeUtilisateursPlateforme.forEach((utilisateur: Utilisateur) => {
            if (utilisateur.IdentifiantUtilisateur == identifiantUtilisateur) {
                res = utilisateur;
            }
        });
        return res;
    }

    public getUtilisateurAvecNom(nomUtilisateur: string): Utilisateur {
        var res: Utilisateur = null;
        this.listeUtilisateursPlateforme.forEach((utilisateur: Utilisateur) => {
            if (utilisateur.NomUtilisateur == nomUtilisateur) {
                res = utilisateur;
            }
        });
        return res;
    }

    public getTemplateMailAvecIdentifiant(identifiantTemplateMail: number): TemplateMail {
        var res: TemplateMail = null;
        this.listeTemplatesMails.forEach((templateMail: TemplateMail) => {
            if (templateMail.IdentifiantTemplateMail == identifiantTemplateMail) {
                res = templateMail;
            }
        });
        return res;
    }

    public getMailAvecIdentifiant(identifiantMail: number): Mail {
        var res: Mail = null;
        this.listeMails.forEach((mail: Mail) => {
            if (mail.IdentifiantMail == identifiantMail) {
                res = mail;
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

    public ajouterContactEtranger(contactEtranger: ContactEtranger): void {
        this.listeContactsEtrangersPlateforme.push(contactEtranger);
    }

    public supprimerContactEtranger(contactEtranger: ContactEtranger): void {
        var indexContactEtranger = this.listeContactsEtrangersPlateforme.indexOf(contactEtranger);
        if (!(indexContactEtranger === undefined) && !(indexContactEtranger === null)) {
            this.listeContactsEtrangersPlateforme.splice(indexContactEtranger, 1);
        }
    }

    public ajouterCoordinateur(coordinateur: Coordinateur): void {
        this.listeCoordinateursPlateforme.push(coordinateur);
    }

    public supprimerCoordinateur(coordinateur: Coordinateur): void {
        var indexCoordinateur = this.listeCoordinateursPlateforme.indexOf(coordinateur);
        if (!(indexCoordinateur === undefined) && !(indexCoordinateur === null)) {
            this.listeCoordinateursPlateforme.splice(indexCoordinateur, 1);
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

    public ajouterDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        this.listeDomainesDeCompetences.push(domaineDeCompetence);
    }

    public supprimerDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void {
        var indexDomaineDeCompetence = this.listeDomainesDeCompetences.indexOf(domaineDeCompetence);
        if (!(indexDomaineDeCompetence === undefined) && !(indexDomaineDeCompetence === null)) {
            this.listeDomainesDeCompetences.splice(indexDomaineDeCompetence, 1);
        }
    }

    public ajouterUtilisateur(utilisateur: Utilisateur): void {
        this.listeUtilisateursPlateforme.push(utilisateur);
    }

    public supprimerUtilisateur(utilisateur: Utilisateur): void {
        var indexUtilisateur = this.listeUtilisateursPlateforme.indexOf(utilisateur);
        if (!(indexUtilisateur === undefined) && !(indexUtilisateur === null)) {
            this.listeUtilisateursPlateforme.splice(indexUtilisateur, 1);
        }
    }

    public ajouterTemplateMail(templateMail: TemplateMail): void {
        this.listeTemplatesMails.push(templateMail);
    }

    public supprimerTemplateMail(templateMail: TemplateMail): void {
        var indexTemplateMail = this.listeTemplatesMails.indexOf(templateMail);
        if (!(indexTemplateMail === undefined) && !(indexTemplateMail === null)) {
            this.listeTemplatesMails.splice(indexTemplateMail, 1);
        }
    }

    public ajouterMail(mail: Mail): void {
        this.listeMails.push(mail);
    }

    public supprimerMail(mail: Mail): void {
        var indexMail = this.listeMails.indexOf(mail);
        if (!(indexMail === undefined) && !(indexMail === null)) {
            this.listeMails.splice(indexMail, 1);
        }
    }

}