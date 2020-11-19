import { ISerializable } from "./ISerializable";

export class ImagePartenaire implements ISerializable {
    private identifiantImagePartenaire: number;
    private fileImagePartenaireLocal: File;
    private cheminImagePartenaireServeur: string;

    public get IdentifiantImagePartenaire(): number {
        return this.identifiantImagePartenaire;
    }

    public set IdentifiantImagePartenaire(identifiantImagePartenaire: number) {
        this.identifiantImagePartenaire = identifiantImagePartenaire;
    }

    public get FileImagePartenaireLocal(): File {
        return this.fileImagePartenaireLocal;
    }

    public set FileImagePartenaireLocal(fileImagePartenaireLocal: File) {
        this.fileImagePartenaireLocal = fileImagePartenaireLocal;
    }

    public get CheminImagePartenaireServeur(): string {
        return this.cheminImagePartenaireServeur;
    }

    public set CheminImagePartenaireServeur(cheminImagePartenaireServeur: string) {
        this.cheminImagePartenaireServeur = cheminImagePartenaireServeur;
    }

    public constructor() {
        this.identifiantImagePartenaire = 0;
        this.fileImagePartenaireLocal = null;
        this.cheminImagePartenaireServeur = "";
    }

    public getObjetSerializable(): any {
        var imagePartenaire = {
            identifiantImagePartenaire: this.IdentifiantImagePartenaire,
            cheminImagePartenaireServeur: this.CheminImagePartenaireServeur
        }
        return imagePartenaire;
    }

    public getObjetSerializableId(): any {
        var imagePartenaire = {
            identifiantImagePartenaire: this.IdentifiantImagePartenaire
        }
        return imagePartenaire;
    }

}