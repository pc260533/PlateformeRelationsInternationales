import { ISerializable } from "./ISerializable";
import { IContact } from "./icontact";

export class ContactMail implements ISerializable, IContact {
    private nomContactMail: string;
    private adresseMailContactMail: string;

    public get NomContact(): string {
        return this.nomContactMail;
    }

    public set NomContact(nomContactMail: string) {
        this.nomContactMail = nomContactMail;
    }

    public get AdresseMailContact(): string {
        return this.adresseMailContactMail;
    }

    public set AdresseMailContact(adresseMailContactMail: string) {
        this.adresseMailContactMail = adresseMailContactMail;
    }

    public constructor(nomContactMail: string, adresseMailContactMail: string) {
        this.nomContactMail = nomContactMail;
        this.adresseMailContactMail = adresseMailContactMail;
    }

    public getObjetSerializable(): any {
        var contactMail = {
            nomContactMail: this.NomContact,
            adresseMailContactMail: this.AdresseMailContact,
        }
        return contactMail;
    }

    public getObjetSerializableId(): any {
        var contactMail = {
            nomContactMail: this.NomContact
        }
        return contactMail;
    }

}