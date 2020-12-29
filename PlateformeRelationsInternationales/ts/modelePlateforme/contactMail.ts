import { ISerializable } from "./ISerializable";

export class ContactMail implements ISerializable {
    private nomContactMail: string;
    private adresseMailContactMail: string;

    public get NomContactMail(): string {
        return this.nomContactMail;
    }

    public set NomContactMail(nomContactMail: string) {
        this.nomContactMail = nomContactMail;
    }

    public get AdresseMailContactMail(): string {
        return this.adresseMailContactMail;
    }

    public set AdresseMailContactMail(adresseMailContactMail: string) {
        this.adresseMailContactMail = adresseMailContactMail;
    }

    public constructor(nomContactMail: string, adresseMailContactMail: string) {
        this.nomContactMail = nomContactMail;
        this.adresseMailContactMail = adresseMailContactMail;
    }

    public getObjetSerializable(): any {
        var contactMail = {
            nomContactMail: this.NomContactMail,
            adresseMailContactMail: this.AdresseMailContactMail,
        }
        return contactMail;
    }

    public getObjetSerializableId(): any {
        var contactMail = {
            nomContactMail: this.NomContactMail
        }
        return contactMail;
    }

}