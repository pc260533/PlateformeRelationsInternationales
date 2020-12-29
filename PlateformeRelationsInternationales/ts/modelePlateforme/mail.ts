import { ISerializable } from "./ISerializable";
import { ContactMail } from "./contactMail";

export class Mail implements ISerializable {
    private listeDestinataires: ContactMail[];
    private listeCopiesCarbones: ContactMail[];
    private listeCopiesCarbonesInvisibles: ContactMail[];
    private sujetMail: string;
    private messageHtml: string;

    public get ListeDestinataires(): ContactMail[] {
        return this.listeDestinataires;
    }

    public get ListeCopiesCarbones(): ContactMail[] {
        return this.listeCopiesCarbones;
    }

    public get ListeCopiesCarbonesInvisibles(): ContactMail[] {
        return this.listeCopiesCarbonesInvisibles;
    }

    public get SujetMail(): string {
        return this.sujetMail;
    }

    public set SujetMail(sujetMail: string) {
        this.sujetMail = sujetMail;
    }

    public get MessageHtml(): string {
        return this.messageHtml;
    }

    public set MessageHtml(messageHtml: string) {
        this.messageHtml = messageHtml;
    }

    public getListeDestinatairesSerializable(): any[] {
        var listeDestinatairesSerializable: any[] = [];
        this.listeDestinataires.forEach((destinataire: ContactMail) => {
            listeDestinatairesSerializable.push(destinataire.getObjetSerializable());
        });
        return listeDestinatairesSerializable;
    }

    public getListeCopieCarbonesSerializable(): any[] {
        var listeCopiesCarbonesSerializable: any[] = [];
        this.listeCopiesCarbones.forEach((copieCarbone: ContactMail) => {
            listeCopiesCarbonesSerializable.push(copieCarbone.getObjetSerializable());
        });
        return listeCopiesCarbonesSerializable;
    }

    public getListeCopieCarbonesInvisiblesSerializable(): any[] {
        var listeCopiesCarbonesInvisiblesSerializable: any[] = [];
        this.listeCopiesCarbonesInvisibles.forEach((copieCarboneInvisible: ContactMail) => {
            listeCopiesCarbonesInvisiblesSerializable.push(copieCarboneInvisible.getObjetSerializable());
        });
        return listeCopiesCarbonesInvisiblesSerializable;
    }

    public constructor() {
        this.listeDestinataires = [];
        this.listeCopiesCarbones = [];
        this.listeCopiesCarbonesInvisibles = [];
        this.sujetMail = "";
        this.messageHtml = "";
    }

    public ajouterDestinataire(destinataire: ContactMail): void {
        this.listeDestinataires.push(destinataire);
    }

    public supprimerDestinataire(destinataire: ContactMail): void {
        var indexDestinataire = this.listeDestinataires.indexOf(destinataire);
        if (!(indexDestinataire === undefined) && !(indexDestinataire === null)) {
            this.listeDestinataires.splice(indexDestinataire, 1);
        }
    }

    public ajouterCopieCarbone(copieCarbone: ContactMail): void {
        this.listeCopiesCarbones.push(copieCarbone);
    }

    public supprimerCopieCarbone(copieCarbone: ContactMail): void {
        var indexCopieCarbone = this.listeCopiesCarbones.indexOf(copieCarbone);
        if (!(indexCopieCarbone === undefined) && !(indexCopieCarbone === null)) {
            this.listeCopiesCarbones.splice(indexCopieCarbone, 1);
        }
    }

    public ajouterCopieCarboneInvisible(copieCarboneInvisible: ContactMail): void {
        this.listeCopiesCarbonesInvisibles.push(copieCarboneInvisible);
    }

    public supprimerCopieCarboneInvisible(copieCarboneInvisible: ContactMail): void {
        var indexCopieCarboneInvisible = this.listeCopiesCarbonesInvisibles.indexOf(copieCarboneInvisible);
        if (!(indexCopieCarboneInvisible === undefined) && !(indexCopieCarboneInvisible === null)) {
            this.listeCopiesCarbonesInvisibles.splice(indexCopieCarboneInvisible, 1);
        }
    }

    public getObjetSerializable(): any {
        var mail = {
            listeDestinataires: this.getListeDestinatairesSerializable(),
            listeCopieCarbones: this.getListeCopieCarbonesSerializable(),
            listeCopiesCarbonesInvisibles: this.getListeCopieCarbonesInvisiblesSerializable(),
            sujetMail: this.SujetMail,
            messageHtml: this.MessageHtml
        }
        return mail;
    }

    public getObjetSerializableId(): any {
        var mail = {
            sujetMail: this.SujetMail
        }
        return mail;
    }

}