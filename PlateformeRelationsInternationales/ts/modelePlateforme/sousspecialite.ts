import { ISerializable } from "./ISerializable";

export class SousSpecialite implements ISerializable {
    private identifiantSousSpecialite: number;
    private nomSousSpecialite: string;

    public get IdentifiantSousSpecialite(): number {
        return this.identifiantSousSpecialite;
    }

    public set IdentifiantSousSpecialite(identifiantSousSpecialite: number) {
        this.identifiantSousSpecialite = identifiantSousSpecialite;
    }

    public get NomSousSpecialite(): string {
        return this.nomSousSpecialite;
    }

    public set NomSousSpecialite(nomSousSpecialite: string) {
        this.nomSousSpecialite = nomSousSpecialite;
    }

    public constructor() {
        this.identifiantSousSpecialite = 0;
        this.nomSousSpecialite = "";
    }

    public getObjetSerializable(): any {
        var sousSpecialite = {
            identifiantSousSpecialite: this.IdentifiantSousSpecialite,
            nomSousSpecialite: this.NomSousSpecialite
        }
        return sousSpecialite;
    }

    public getObjetSerializableId(): any {
        var sousSpecialite = {
            identifiantSousSpecialite: this.IdentifiantSousSpecialite
        }
        return sousSpecialite;
    }

}