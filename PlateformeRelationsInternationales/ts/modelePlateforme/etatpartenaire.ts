import { ISerializable } from "./ISerializable";

export class EtatPartenaire implements ISerializable {
    private identifiantEtatPartenaire: number;
    private nomEtatPartenaire: string;

    public get IdentifiantEtatPartenaire(): number {
        return this.identifiantEtatPartenaire;
    }

    public set IdentifiantEtatPartenaire(identifiantEtatPartenaire: number) {
        this.identifiantEtatPartenaire = identifiantEtatPartenaire;
    }

    public get NomEtatPartenaire(): string {
        return this.nomEtatPartenaire;
    }

    public set NomEtatPartenaire(nomEtatPartenaire: string) {
        this.nomEtatPartenaire = nomEtatPartenaire;
    }

    public constructor() {
        this.identifiantEtatPartenaire = 0;
        this.nomEtatPartenaire = "";
    }

    public getObjetSerializable(): any {
        var etatPartenaire = {
            identifiantEtatPartenaire: this.IdentifiantEtatPartenaire,
            nomEtatPartenaire: this.NomEtatPartenaire
        }
        return etatPartenaire;
    }

    public getObjetSerializableId(): any {
        var etatPartenaire = {
            identifiantEtatPartenaire: this.IdentifiantEtatPartenaire
        }
        return etatPartenaire;
    }

}