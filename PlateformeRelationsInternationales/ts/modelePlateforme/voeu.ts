import { ISerializable } from "./ISerializable";

export class Voeu implements ISerializable {
    private identifiantVoeu: number;
    private adresseMailVoeu: string;

    public get IdentifiantVoeu(): number {
        return this.identifiantVoeu;
    }

    public set IdentifiantVoeu(identifiantVoeu: number) {
        this.identifiantVoeu = identifiantVoeu;
    }

    public get AdresseMailVoeu(): string {
        return this.adresseMailVoeu;
    }

    public set AdresseMailVoeu(adresseMailVoeu: string) {
        this.adresseMailVoeu = adresseMailVoeu;
    }

    public constructor() {
        this.identifiantVoeu = 0;
        this.adresseMailVoeu = "";
    }

    public getObjetSerializable(): any {
        var voeu = {
            identifiantVoeu: this.IdentifiantVoeu,
            adresseMailVoeu: this.AdresseMailVoeu
        }
        return voeu;
    }

    public getObjetSerializableId(): any {
        var voeu = {
            identifiantVoeu: this.IdentifiantVoeu
        }
        return voeu;
    }

}