import { ISerializable } from "./ISerializable";

export class AideFinanciere implements ISerializable {
    private identifiantAideFinanciere: number;
    private nomAideFinanciere: string;

    public get IdentifiantAideFinanciere(): number {
        return this.identifiantAideFinanciere;
    }

    public set IdentifiantAideFinanciere(identifiantAideFinanciere: number) {
        this.identifiantAideFinanciere = identifiantAideFinanciere;
    }

    public get NomAideFinanciere(): string {
        return this.nomAideFinanciere;
    }

    public set NomAideFinanciere(nomAideFinanciere: string) {
        this.nomAideFinanciere = nomAideFinanciere;
    }

    public constructor() {
        this.identifiantAideFinanciere = 0;
        this.nomAideFinanciere = "";
    }

    public getObjetSerializable(): any {
        var aideFinanciere = {
            identifiantAideFinanciere: this.IdentifiantAideFinanciere,
            nomAideFinanciere: this.NomAideFinanciere
        }
        return aideFinanciere;
    }

    public getObjetSerializableId(): any {
        var aideFinanciere = {
            identifiantAideFinanciere: this.IdentifiantAideFinanciere
        }
        return aideFinanciere;
    }

}