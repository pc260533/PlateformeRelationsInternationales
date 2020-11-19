import { ISerializable } from "./ISerializable";

export class Localisation implements ISerializable {
    private identifiantLocalisation: number;
    private latitudeLocalisation: string;
    private longitudeLocalisation: string;
    private nomLocalisation: string;
    private nomPaysLocalisation: string;
    private codePaysLocalisation: string;

    public get IdentifiantLocalisation(): number {
        return this.identifiantLocalisation;
    }

    public set IdentifiantLocalisation(identifiantLocalisation: number) {
        this.identifiantLocalisation = identifiantLocalisation;
    }

    public get LatitudeLocalisation(): string {
        return this.latitudeLocalisation;
    }

    public set LatitudeLocalisation(latitudeLocalisation: string) {
        this.latitudeLocalisation = latitudeLocalisation;
    }

    public get LongitudeLocalisation(): string {
        return this.longitudeLocalisation;
    }

    public set LongitudeLocalisation(longitudeLocalisation: string) {
        this.longitudeLocalisation = longitudeLocalisation;
    }

    public get NomLocalisation(): string {
        return this.nomLocalisation;
    }

    public set NomLocalisation(nomLocalisation: string) {
        this.nomLocalisation = nomLocalisation;
    }

    public get NomPaysLocalisation(): string {
        return this.nomPaysLocalisation;
    }

    public set NomPaysLocalisation(nomPaysLocalisation: string) {
        this.nomPaysLocalisation = nomPaysLocalisation;
    }

    public get CodePaysLocalisation(): string {
        return this.codePaysLocalisation;
    }

    public set CodePaysLocalisation(codePaysLocalisation: string) {
        this.codePaysLocalisation = codePaysLocalisation;
    }

    public constructor() {
        this.identifiantLocalisation = 0;
        this.latitudeLocalisation = "";
        this.longitudeLocalisation = "";
        this.nomLocalisation = "";
        this.nomPaysLocalisation = "";
        this.codePaysLocalisation = "";
    }

    public getObjetSerializable(): any {
        var localisation = {
            identifiantLocalisation: this.IdentifiantLocalisation,
            latitudeLocalisation: this.LatitudeLocalisation,
            longitudeLocalisation: this.LongitudeLocalisation,
            nomLocalisation: this.NomLocalisation,
            nomPaysLocalisation: this.NomPaysLocalisation,
            codePaysLocalisation: this.CodePaysLocalisation
        }
        return localisation;
    }

    public getObjetSerializableId(): any {
        var localisation = {
            identifiantAideFinanciere: this.IdentifiantLocalisation
        }
        return localisation;
    }

}