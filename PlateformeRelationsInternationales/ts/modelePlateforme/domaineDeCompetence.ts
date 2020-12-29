import { ISerializable } from "./ISerializable";

export class DomaineDeCompetence implements ISerializable {
    private identifiantDomaineDeCompetence: number;
    private nomDomaineDeCompetence: string;

    public get IdentifiantDomaineDeCompetence(): number {
        return this.identifiantDomaineDeCompetence;
    }

    public set IdentifiantDomaineDeCompetence(identifiantDomaineDeCompetence: number) {
        this.identifiantDomaineDeCompetence = identifiantDomaineDeCompetence;
    }

    public get NomDomaineDeCompetence(): string {
        return this.nomDomaineDeCompetence;
    }

    public set NomDomaineDeCompetence(nomDomaineDeCompetence: string) {
        this.nomDomaineDeCompetence = nomDomaineDeCompetence;
    }

    public constructor() {
        this.identifiantDomaineDeCompetence = 0;
        this.nomDomaineDeCompetence = "";
    }

    public getObjetSerializable(): any {
        var domaineDeCompetence = {
            identifiantDomaineDeCompetence: this.IdentifiantDomaineDeCompetence,
            nomDomaineDeCompetence: this.NomDomaineDeCompetence
        }
        return domaineDeCompetence;
    }

    public getObjetSerializableId(): any {
        var domaineDeCompetence = {
            identifiantDomaineDeCompetence: this.IdentifiantDomaineDeCompetence
        }
        return domaineDeCompetence;
    }

}