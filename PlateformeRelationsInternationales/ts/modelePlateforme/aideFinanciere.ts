import { ISerializable } from "./ISerializable";

export class AideFinanciere implements ISerializable {
    private identifiantAideFinanciere: number;
    private nomAideFinanciere: string;
    private descriptionAideFinanciere: string;
    private lienAideFinanciere: string;

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

    public get DescriptionAideFinanciere(): string {
        return this.descriptionAideFinanciere;
    }

    public set DescriptionAideFinanciere(descriptionAideFinanciere: string) {
        this.descriptionAideFinanciere = descriptionAideFinanciere;
    }

    public get LienAideFinanciere(): string {
        return this.lienAideFinanciere;
    }

    public set LienAideFinanciere(lienAideFinanciere: string) {
        this.lienAideFinanciere = lienAideFinanciere;
    }

    public constructor() {
        this.identifiantAideFinanciere = 0;
        this.nomAideFinanciere = "";
        this.descriptionAideFinanciere = "";
        this.lienAideFinanciere = "";
    }

    public getObjetSerializable(): any {
        var aideFinanciere = {
            identifiantAideFinanciere: this.IdentifiantAideFinanciere,
            nomAideFinanciere: this.NomAideFinanciere,
            descriptionAideFinanciere: this.DescriptionAideFinanciere,
            lienAideFinanciere: this.LienAideFinanciere
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