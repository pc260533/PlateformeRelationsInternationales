import { ISerializable } from "./ISerializable";
import { ContactMail } from "./contactMail";
import { ContactEtranger } from "./contactEtranger";
import { Coordinateur } from "./coordinateur";
import { TemplateMail } from "./templateMail";
import { Partenaire } from "./partenaire";

import * as moment from "moment";

export class Mail implements ISerializable {
    private identifiantMail: number;
    private dateEnvoie: Date;
    private estEnvoye: boolean;
    private listeDestinatairesContactsEtrangers: ContactEtranger[];
    private listeDestinatairesCoordinateurs: Coordinateur[];
    private listeDestinataires: ContactMail[];
    private listeCopiesCarbonesContactsEtrangers: ContactEtranger[];
    private listeCopiesCarbonesCoordinateurs: Coordinateur[];
    private listeCopiesCarbones: ContactMail[];
    private listeCopiesCarbonesInvisiblesContactsEtrangers: ContactEtranger[];
    private listeCopiesCarbonesInvisiblesCoordinateurs: Coordinateur[];
    private listeCopiesCarbonesInvisibles: ContactMail[];
    private sujetMail: string;
    private messageHtmlMail: string;
    private templateMail: TemplateMail;
    private partenaireMail: Partenaire;

    public get IdentifiantMail(): number {
        return this.identifiantMail;
    }

    public set IdentifiantMail(identifiantMail: number) {
        this.identifiantMail = identifiantMail;
    }

    public get DateEnvoie(): Date {
        return this.dateEnvoie;
    }

    public set DateEnvoie(dateEnvoie: Date) {
        this.dateEnvoie = dateEnvoie;
    }

    public get EstEnvoye(): boolean {
        return this.estEnvoye;
    }

    public set EstEnvoye(estEnvoye: boolean) {
        this.estEnvoye = estEnvoye;
    }

    public get ListeDestinatairesContactsEtrangers(): ContactEtranger[] {
        return this.listeDestinatairesContactsEtrangers;
    }

    public get ListeDestinatairesCoordinateurs(): Coordinateur[] {
        return this.listeDestinatairesCoordinateurs;
    }

    public get ListeDestinataires(): ContactMail[] {
        return this.listeDestinataires;
    }

    public get ListeCopiesCarbonesContactsEtrangers(): ContactEtranger[] {
        return this.listeCopiesCarbonesContactsEtrangers;
    }

    public get ListeCopiesCarbonesCoordinateurs(): Coordinateur[] {
        return this.listeCopiesCarbonesCoordinateurs;
    }

    public get ListeCopiesCarbones(): ContactMail[] {
        return this.listeCopiesCarbones;
    }

    public get ListeCopiesCarbonesInvisiblesContactsEtrangers(): ContactEtranger[] {
        return this.listeCopiesCarbonesInvisiblesContactsEtrangers;
    }

    public get ListeCopiesCarbonesInvisiblesCoordinateurs(): Coordinateur[] {
        return this.listeCopiesCarbonesInvisiblesCoordinateurs;
    }

    public get ListeCopiesCarbonesInvisibles(): ContactMail[] {
        return this.listeCopiesCarbonesInvisibles;
    }

    public get SujetMail(): string {
        var sujet: string = this.sujetMail;
        if (this.templateMail) {
            sujet = this.templateMail.SujetTemplateMail;
        }
        return sujet;
    }

    public set SujetMail(sujetMail: string) {
        this.sujetMail = sujetMail;
    }

    public get MessageHtmlMail(): string {
        var messageHtml: string = this.messageHtmlMail;
        if (this.templateMail) {
            messageHtml = this.templateMail.MessageHtmlTemplateMail;
        }
        return messageHtml;    }

    public set MessageHtmlMail(messageHtmlMail: string) {
        this.messageHtmlMail = messageHtmlMail;
    }

    public get TemplateMail(): TemplateMail {
        return this.templateMail;
    }

    public set TemplateMail(templateMail: TemplateMail) {
        this.templateMail = templateMail;
    }

    public get PartenaireMail(): Partenaire {
        return this.partenaireMail;
    }

    public set PartenaireMail(partenaireMail: Partenaire) {
        this.partenaireMail = partenaireMail;
    }

    public getListeDestinatairesContactsEtrangersSerializable(): any[] {
        var listeDestinatairesContactsEtrangersSerializable: any[] = [];
        this.listeDestinatairesContactsEtrangers.forEach((destinataire: ContactEtranger) => {
            listeDestinatairesContactsEtrangersSerializable.push(destinataire.getObjetSerializable());
        });
        return listeDestinatairesContactsEtrangersSerializable;
    }

    public getListeDestinatairesCoordinateursSerializable(): any[] {
        var listeDestinatairesCoordinateursSerializable: any[] = [];
        this.listeDestinatairesCoordinateurs.forEach((destinataire: Coordinateur) => {
            listeDestinatairesCoordinateursSerializable.push(destinataire.getObjetSerializable());
        });
        return listeDestinatairesCoordinateursSerializable;
    }

    public getListeDestinatairesSerializable(): any[] {
        var listeDestinatairesSerializable: any[] = [];
        this.listeDestinataires.forEach((destinataire: ContactMail) => {
            listeDestinatairesSerializable.push(destinataire.getObjetSerializable());
        });
        return listeDestinatairesSerializable;
    }

    public getListeCopieCarbonesContactsEtrangersSerializable(): any[] {
        var listeCopiesCarbonesContactsEtrangersSerializable: any[] = [];
        this.listeCopiesCarbonesContactsEtrangers.forEach((copieCarbone: ContactEtranger) => {
            listeCopiesCarbonesContactsEtrangersSerializable.push(copieCarbone.getObjetSerializable());
        });
        return listeCopiesCarbonesContactsEtrangersSerializable;
    }

    public getListeCopieCarbonesCoordinateursSerializable(): any[] {
        var listeCopiesCarbonesCoordinateursSerializable: any[] = [];
        this.listeCopiesCarbonesCoordinateurs.forEach((copieCarbone: Coordinateur) => {
            listeCopiesCarbonesCoordinateursSerializable.push(copieCarbone.getObjetSerializable());
        });
        return listeCopiesCarbonesCoordinateursSerializable;
    }

    public getListeCopieCarbonesSerializable(): any[] {
        var listeCopiesCarbonesSerializable: any[] = [];
        this.listeCopiesCarbones.forEach((copieCarbone: ContactMail) => {
            listeCopiesCarbonesSerializable.push(copieCarbone.getObjetSerializable());
        });
        return listeCopiesCarbonesSerializable;
    }

    public getListeCopieCarbonesInvisiblesContactsEtrangersSerializable(): any[] {
        var listeCopiesCarbonesInvisiblesContactsEtrangersSerializable: any[] = [];
        this.listeCopiesCarbonesInvisiblesContactsEtrangers.forEach((copieCarboneInvisible: ContactEtranger) => {
            listeCopiesCarbonesInvisiblesContactsEtrangersSerializable.push(copieCarboneInvisible.getObjetSerializable());
        });
        return listeCopiesCarbonesInvisiblesContactsEtrangersSerializable;
    }

    public getListeCopieCarbonesInvisiblesCoordinateursSerializable(): any[] {
        var listeCopiesCarbonesInvisiblesCoordinateursSerializable: any[] = [];
        this.listeCopiesCarbonesInvisiblesCoordinateurs.forEach((copieCarboneInvisible: Coordinateur) => {
            listeCopiesCarbonesInvisiblesCoordinateursSerializable.push(copieCarboneInvisible.getObjetSerializable());
        });
        return listeCopiesCarbonesInvisiblesCoordinateursSerializable;
    }

    public getListeCopieCarbonesInvisiblesSerializable(): any[] {
        var listeCopiesCarbonesInvisiblesSerializable: any[] = [];
        this.listeCopiesCarbonesInvisibles.forEach((copieCarboneInvisible: ContactMail) => {
            listeCopiesCarbonesInvisiblesSerializable.push(copieCarboneInvisible.getObjetSerializable());
        });
        return listeCopiesCarbonesInvisiblesSerializable;
    }

    public constructor() {
        this.identifiantMail = 0;
        this.dateEnvoie = null;
        this.estEnvoye = false;
        this.listeDestinatairesContactsEtrangers = [];
        this.listeDestinatairesCoordinateurs = [];
        this.listeDestinataires = [];
        this.listeCopiesCarbonesContactsEtrangers = [];
        this.listeCopiesCarbonesCoordinateurs = [];
        this.listeCopiesCarbones = [];
        this.listeCopiesCarbonesInvisiblesContactsEtrangers = [];
        this.listeCopiesCarbonesInvisiblesCoordinateurs = [];
        this.listeCopiesCarbonesInvisibles = [];
        this.sujetMail = null;
        this.messageHtmlMail = null;
        this.templateMail = null;
        this.partenaireMail = null;
    }

    public ajouterDestinataireContactEtranger(destinataire: ContactEtranger): void {
        this.listeDestinatairesContactsEtrangers.push(destinataire);
    }

    public supprimerDestinataireContactEtranger(destinataire: ContactEtranger): void {
        var indexDestinataireContactEtranger = this.listeDestinatairesContactsEtrangers.indexOf(destinataire);
        if (!(indexDestinataireContactEtranger === undefined) && !(indexDestinataireContactEtranger === null)) {
            this.listeDestinatairesContactsEtrangers.splice(indexDestinataireContactEtranger, 1);
        }
    }

    public ajouterDestinataireCoordinateur(destinataire: Coordinateur): void {
        this.listeDestinatairesCoordinateurs.push(destinataire);
    }

    public supprimerDestinataireCoordinateur(destinataire: Coordinateur): void {
        var indexDestinataireCoordinateur = this.listeDestinatairesCoordinateurs.indexOf(destinataire);
        if (!(indexDestinataireCoordinateur === undefined) && !(indexDestinataireCoordinateur === null)) {
            this.listeDestinatairesCoordinateurs.splice(indexDestinataireCoordinateur, 1);
        }
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

    public ajouterCopieCarboneContactEtranger(copieCarbone: ContactEtranger): void {
        this.listeCopiesCarbonesContactsEtrangers.push(copieCarbone);
    }

    public supprimerCopieCarboneContactEtranger(copieCarbone: ContactEtranger): void {
        var indexCopieCarboneContactEtranger = this.listeCopiesCarbonesContactsEtrangers.indexOf(copieCarbone);
        if (!(indexCopieCarboneContactEtranger === undefined) && !(indexCopieCarboneContactEtranger === null)) {
            this.listeCopiesCarbonesContactsEtrangers.splice(indexCopieCarboneContactEtranger, 1);
        }
    }

    public ajouterCopieCarboneCoordinateur(copieCarbone: Coordinateur): void {
        this.listeCopiesCarbonesCoordinateurs.push(copieCarbone);
    }

    public supprimerCopieCarboneCoordinateur(copieCarbone: Coordinateur): void {
        var indexCopieCarboneCoordinateur = this.listeCopiesCarbonesCoordinateurs.indexOf(copieCarbone);
        if (!(indexCopieCarboneCoordinateur === undefined) && !(indexCopieCarboneCoordinateur === null)) {
            this.listeCopiesCarbonesCoordinateurs.splice(indexCopieCarboneCoordinateur, 1);
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

    public ajouterCopieCarboneInvisibleContactEtranger(copieCarboneInvisible: ContactEtranger): void {
        this.listeCopiesCarbonesInvisiblesContactsEtrangers.push(copieCarboneInvisible);
    }

    public supprimerCopieCarboneInvisibleContactEtranger(copieCarboneInvisible: ContactEtranger): void {
        var indexCopieCarboneInvisibleContactEtranger = this.listeCopiesCarbonesInvisiblesContactsEtrangers.indexOf(copieCarboneInvisible);
        if (!(indexCopieCarboneInvisibleContactEtranger === undefined) && !(indexCopieCarboneInvisibleContactEtranger === null)) {
            this.listeCopiesCarbonesInvisiblesContactsEtrangers.splice(indexCopieCarboneInvisibleContactEtranger, 1);
        }
    }

    public ajouterCopieCarboneInvisibleCoordinateur(copieCarboneInvisible: Coordinateur): void {
        this.listeCopiesCarbonesInvisiblesCoordinateurs.push(copieCarboneInvisible);
    }

    public supprimerCopieCarboneInvisibleCoordinateur(copieCarboneInvisible: Coordinateur): void {
        var indexCopieCarboneInvisible = this.listeCopiesCarbonesInvisiblesCoordinateurs.indexOf(copieCarboneInvisible);
        if (!(indexCopieCarboneInvisible === undefined) && !(indexCopieCarboneInvisible === null)) {
            this.listeCopiesCarbonesInvisiblesCoordinateurs.splice(indexCopieCarboneInvisible, 1);
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
            identifiantMail: this.IdentifiantMail,
            dateEnvoie: moment(this.DateEnvoie).format("YYYY-MM-DD"),
            estEnvoye: this.EstEnvoye,
            listeDestinatairesContactsEtrangers: this.getListeDestinatairesContactsEtrangersSerializable(),
            listeDestinatairesCoordinateurs: this.getListeDestinatairesCoordinateursSerializable(),
            listeDestinatairesContactsMails: this.getListeDestinatairesSerializable(),
            listeCopieCarbonesContactsEtrangers: this.getListeCopieCarbonesContactsEtrangersSerializable(),
            listeCopieCarbonesCoordinateurs: this.getListeCopieCarbonesCoordinateursSerializable(),
            listeCopieCarbonesContactsMails: this.getListeCopieCarbonesSerializable(),
            listeCopieCarbonesInvisiblesContactsEtrangers: this.getListeCopieCarbonesInvisiblesContactsEtrangersSerializable(),
            listeCopieCarbonesInvisiblesCoordinateurs: this.getListeCopieCarbonesInvisiblesCoordinateursSerializable(),
            listeCopiesCarbonesInvisiblesContactsMails: this.getListeCopieCarbonesInvisiblesSerializable(),
            sujetMail: this.SujetMail,
            messageHtmlMail: this.MessageHtmlMail,
            partenaireMail: this.PartenaireMail.getObjetSerializableId()
        }
        if (this.TemplateMail) {
            $.extend(mail, { templateMail: this.TemplateMail.getObjetSerializableId() });
        }
        /*else {
            $.extend(mail, {
                sujetMail: this.SujetMail,
                messageHtmlMail: this.MessageHtmlMail
            });
        }*/
        return mail;
    }

    public getObjetSerializableId(): any {
        var mail = {
            identifiantMail: this.IdentifiantMail
        }
        return mail;
    }

}