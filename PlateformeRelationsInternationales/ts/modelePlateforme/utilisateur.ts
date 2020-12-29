import { ISerializable } from "./ISerializable";

export class Utilisateur implements ISerializable {
    private identifiantUtilisateur: number;
    private nomUtilisateur: string;
    private motDePasseUtilisateur: string;
    private adresseMailUtilisateur: string;
    private estAdministrateur: boolean;

    public get IdentifiantUtilisateur(): number {
        return this.identifiantUtilisateur;
    }

    public set IdentifiantUtilisateur(identifiantUtilisateur: number) {
        this.identifiantUtilisateur = identifiantUtilisateur;
    }

    public get NomUtilisateur(): string {
        return this.nomUtilisateur;
    }

    public set NomUtilisateur(nomUtilisateur: string) {
        this.nomUtilisateur = nomUtilisateur;
    }

    public get MotDePasseUtilisateur(): string {
        return this.motDePasseUtilisateur;
    }

    public set MotDePasseUtilisateur(motDePasseUtilisateur: string) {
        this.motDePasseUtilisateur = motDePasseUtilisateur;
    }

    public get AdresseMailUtilisateur(): string {
        return this.adresseMailUtilisateur;
    }

    public set AdresseMailUtilisateur(adresseMailUtilisateur: string) {
        this.adresseMailUtilisateur = adresseMailUtilisateur;
    }

    public get EstAdministrateur(): boolean {
        return this.estAdministrateur;
    }

    public set EstAdministrateur(estAdministrateur: boolean) {
        this.estAdministrateur = estAdministrateur;
    }

    public get EstAdministrateurString(): string {
        var res: string = "Non";
        if (this.estAdministrateur) {
            res = "Oui";
        }
        return res;
    }

    public set EstAdministrateurString(estAdminsitrateurString: string)  {
        if (estAdminsitrateurString == "Oui") {
            this.estAdministrateur = true;
        }
        else if (estAdminsitrateurString == "Non") {
            this.estAdministrateur = false;
        }
    }

    public constructor() {
        this.identifiantUtilisateur = 0;
        this.nomUtilisateur = "";
        this.motDePasseUtilisateur = "";
        this.adresseMailUtilisateur = "";
        this.estAdministrateur = false;
    }

    public getObjetSerializable(): any {
        var utilisateur = {
            identifiantUtilisateur: this.IdentifiantUtilisateur,
            nomUtilisateur: this.NomUtilisateur,
            motDePasseUtilisateur: this.MotDePasseUtilisateur,
            adresseMailUtilisateur: this.AdresseMailUtilisateur,
            estAdministrateur: this.EstAdministrateur
        }
        return utilisateur;
    }

    public getObjetSerializableId(): any {
        var utilisateur = {
            identifiantUtilisateur: this.IdentifiantUtilisateur
        }
        return utilisateur;
    }

}