import { ISerializable } from "./ISerializable";
import { Partenaire } from "./partenaire";

export class Cout implements ISerializable {
    private identifiantCout: number;
    private nomPaysCout: string;
    private coutMoyenParMois: string;
    private coutLogementParMois: string;
    private coutVieParMois: string;
    private coutInscriptionParMois: string;
    private listePartenairesCout: Partenaire[];

    public get IdentifiantCout(): number {
        return this.identifiantCout;
    }

    public set IdentifiantCout(identifiantCout: number) {
        this.identifiantCout = identifiantCout;
    }

    public get NomPaysCout(): string {
        return this.nomPaysCout;
    }

    public set NomPaysCout(nomPaysCout: string) {
        this.nomPaysCout = nomPaysCout;
    }

    public get CoutMoyenParMois(): string {
        return this.coutMoyenParMois;
    }

    public set CoutMoyenParMois(coutMoyenParMois: string) {
        this.coutMoyenParMois = coutMoyenParMois;
    }

    public get CoutLogementParMois(): string {
        return this.coutLogementParMois;
    }

    public set CoutLogementParMois(coutLogementParMois: string) {
        this.coutLogementParMois = coutLogementParMois;
    }

    public get CoutVieParMois(): string {
        return this.coutVieParMois;
    }

    public set CoutVieParMois(coutVieParMois: string) {
        this.coutVieParMois = coutVieParMois;
    }

    public get CoutInscriptionParMois(): string {
        return this.coutInscriptionParMois;
    }

    public set CoutInscriptionParMois(coutInscriptionParMois: string) {
        this.coutInscriptionParMois = coutInscriptionParMois;
    }

    public get ListePartenairesCout(): Partenaire[] {
        return this.listePartenairesCout;
    }

    public set ListePartenairesCout(listePartenairesCout: Partenaire[]) {
        this.listePartenairesCout = listePartenairesCout;
    }

    public get ListePartenairesCoutString(): string {
        var res = "";
        if (this.listePartenairesCout.length == 0) {
            res = "Pas de partenaires dans ce pays";
        }
        else {
            this.listePartenairesCout.forEach((partenaireCout: Partenaire, indexPartenaireCout: number) => {
                res += partenaireCout.NomPartenaire;
                if (indexPartenaireCout != this.listePartenairesCout.length - 1) {
                    res += "; <br/>";
                }
            });
        }
        return res;
    }

    public constructor() {
        this.identifiantCout = 0;
        this.nomPaysCout = "";
        this.coutMoyenParMois = "";
        this.coutLogementParMois = "";
        this.coutVieParMois = "";
        this.coutInscriptionParMois = "";
        this.listePartenairesCout = [];
    }

    public ajouterPartenaireCout(partenaireCout: Partenaire): void {
        this.listePartenairesCout.push(partenaireCout);
    }

    public supprimerPartenaireCout(partenaireCout: Partenaire): void {
        var indexPartenaireCout = this.listePartenairesCout.indexOf(partenaireCout);
        if (!(indexPartenaireCout === undefined) && !(indexPartenaireCout === null)) {
            this.listePartenairesCout.splice(indexPartenaireCout, 1);
        }
    }

    public getObjetSerializable(): any {
        var cout = {
            identifiantCout: this.IdentifiantCout,
            nomPaysCout: this.NomPaysCout,
            coutMoyenParMois: this.CoutMoyenParMois,
            coutLogementParMois: this.CoutLogementParMois,
            coutVieParMois: this.CoutVieParMois,
            coutInscriptionParMois: this.CoutInscriptionParMois
        }
        return cout;
    }

    public getObjetSerializableId(): any {
        var cout = {
            identifiantCout: this.IdentifiantCout
        }
        return cout;
    }

}