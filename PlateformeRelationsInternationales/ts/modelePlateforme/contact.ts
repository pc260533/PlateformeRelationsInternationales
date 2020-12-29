import { ISerializable } from "./ISerializable";
import { IContact } from "./icontact";

export abstract class Contact implements ISerializable, IContact {
    private identifiantContact: number;
    private nomContact: string;
    private prenomContact: string;
    private adresseMailContact: string;
    private fonctionContact: string;

    public get IdentifiantContact(): number {
        return this.identifiantContact;
    }

    public set IdentifiantContact(identifiantContact: number) {
        this.identifiantContact = identifiantContact;
    }

    public get NomContact(): string {
        return this.nomContact;
    }

    public set NomContact(nomContact: string) {
        this.nomContact = nomContact;
    }

    public get PrenomContact(): string {
        return this.prenomContact;
    }

    public set PrenomContact(prenomContact: string) {
        this.prenomContact = prenomContact;
    }

    public get AdresseMailContact(): string {
        return this.adresseMailContact;
    }

    public set AdresseMailContact(adresseMailContact: string) {
        this.adresseMailContact = adresseMailContact;
    }

    public get FonctionContact(): string {
        return this.fonctionContact;
    }

    public set FonctionContact(fonctionContact: string) {
        this.fonctionContact = fonctionContact;
    }

    public constructor() {
        this.identifiantContact = 0;
        this.nomContact = "";
        this.prenomContact = "";
        this.adresseMailContact = "";
        this.fonctionContact = "";
    }

    public getObjetSerializable(): any {
        var contact = {
            identifiantContact: this.IdentifiantContact,
            nomContact: this.NomContact,
            prenomContact: this.PrenomContact,
            adresseMailContact: this.AdresseMailContact,
            fonctionContact: this.FonctionContact,
        }
        return contact;
    }

    public getObjetSerializableId(): any {
        var contact = {
            identifiantContact: this.IdentifiantContact
        }
        return contact;
    }

}