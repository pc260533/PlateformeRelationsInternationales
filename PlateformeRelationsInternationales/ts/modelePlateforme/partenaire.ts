﻿import { SousSpecialite } from "./sousspecialite";
import { Localisation } from "./localisation";
import { Mobilite } from "./mobilite";
import { Contact } from "./contact";
import { AideFinanciere } from "./aideFinanciere";
import { ISerializable } from "./ISerializable";
import { ImagePartenaire } from "./imagePartenaire";

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
    private listeImagesPartenaire: ImagePartenaire[];

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

    public set ListeSousSpecialitesPartenaire(listeSousSpecialitesPartenaire: SousSpecialite[]) {
        this.listeSousSpecialitesPartenaire = listeSousSpecialitesPartenaire;
    }

    public get ListeMobilitesPartenaires(): Mobilite[] {
        return this.listeMobilitesPartenaires;
    }

    public set ListeMobilitesPartenaires(listeMobilitesPartenaires: Mobilite[]) {
        this.listeMobilitesPartenaires = listeMobilitesPartenaires;
    }

    public get ListeContactsPartenaires(): Contact[] {
        return this.listeContactsPartenaires;
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

    public get ListeImagesPartenaire(): ImagePartenaire[] {
        return this.listeImagesPartenaire;
    }

    public set ListeImagesPartenaire(listeImagesPartenaire: ImagePartenaire[]) {
        this.listeImagesPartenaire = listeImagesPartenaire;
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

    public getListeContactsPartenaireId(): any[] {
        var listeContactsPartenaireId: any[] = [];
        this.listeContactsPartenaires.forEach((contact: Contact) => {
            listeContactsPartenaireId.push(contact.getObjetSerializableId());
        });
        return listeContactsPartenaireId;
    }

    public getListeImagesPartenaire(): any[] {
        var listeImagesPartenaire: any[] = [];
        this.listeImagesPartenaire.forEach((imagePartenaire: ImagePartenaire) => {
            listeImagesPartenaire.push(imagePartenaire.getObjetSerializable());
        });
        return listeImagesPartenaire;
    }

    public getImagePartenaireAvecNomImage(nomImagePartenaire: string): ImagePartenaire {
        var res: ImagePartenaire = null;
        this.listeImagesPartenaire.forEach((imagePartenaire: ImagePartenaire) => {
            if (imagePartenaire.CheminImagePartenaireServeur.split("/").pop() == nomImagePartenaire) {
                res = imagePartenaire;
            }
        });
        return res;
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
        this.listeImagesPartenaire = [];
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

    public ajouterImagePartenaire(imagePartenaire: ImagePartenaire): void {
        this.listeImagesPartenaire.push(imagePartenaire);
    }

    public supprimerImagePartenaire(imagePartenaire: ImagePartenaire): void {
        var indexImagePartenaire = this.listeImagesPartenaire.indexOf(imagePartenaire);
        if (!(indexImagePartenaire === undefined) && !(indexImagePartenaire === null)) {
            this.listeImagesPartenaire.splice(indexImagePartenaire, 1);
        }
    }

    public getObjetSerializable(): any {
        var partenaire = {
            identifiantPartenaire: this.IdentifiantPartenaire,
            nomPartenaire: this.NomPartenaire,
            domaineDeCompetencePartenaire: this.DomaineDeCompetencePartenaire,
            localisationPartenaire: this.LocalisationPartenaire.getObjetSerializable(),
            listeSousSpecialitesPartenaire: this.getListeSousSpecialitesPartenaireId(),
            listeMobilitesPartenaire: this.getListeMobilitesPartenaireId(),
            listeAidesFinancieresPartenaire: this.getListeAidesFinancieresPartenaireId(),
            listeContactsPartenaire: this.getListeContactsPartenaireId(),
            informationLogementPartenaire: this.InformationLogementPartenaire,
            informationCoutPartenaire: this.InformationCoutPartenaire,
            listeImagesPartenaire: this.getListeImagesPartenaire()
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