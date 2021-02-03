import { ISerializable } from "./ISerializable";

export class FichierPartenaire implements ISerializable {
    private identifiantFichierPartenaire: number;
    private fileFichierPartenaireLocal: File;
    private cheminFichierPartenaireServeur: string;

    public get IdentifiantFichierPartenaire(): number {
        return this.identifiantFichierPartenaire;
    }

    public set IdentifiantFichierPartenaire(identifiantFichierPartenaire: number) {
        this.identifiantFichierPartenaire = identifiantFichierPartenaire;
    }

    public get FileFichierPartenaireLocal(): File {
        return this.fileFichierPartenaireLocal;
    }

    public set FileFichierPartenaireLocal(fileFichierPartenaireLocal: File) {
        this.fileFichierPartenaireLocal = fileFichierPartenaireLocal;
    }

    public get CheminFichierPartenaireServeur(): string {
        return this.cheminFichierPartenaireServeur;
    }

    public set CheminFichierPartenaireServeur(cheminFichierPartenaireServeur: string) {
        this.cheminFichierPartenaireServeur = cheminFichierPartenaireServeur;
    }

    public constructor() {
        this.identifiantFichierPartenaire = 0;
        this.fileFichierPartenaireLocal = null;
        this.cheminFichierPartenaireServeur = "";
    }

    public getObjetSerializable(): any {
        var fichierPartenaire = {
            identifiantFichierPartenaire: this.IdentifiantFichierPartenaire,
            cheminFichierPartenaireServeur: this.CheminFichierPartenaireServeur
        }
        return fichierPartenaire;
    }

    public getObjetSerializableId(): any {
        var fichierPartenaire = {
            identifiantFichierPartenaire: this.IdentifiantFichierPartenaire
        }
        return fichierPartenaire;
    }

}