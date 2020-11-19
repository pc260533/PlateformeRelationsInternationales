export class Localisation {
    private identifiantLocalisation: number;
    private latitudeLocalisation: string;
    private longitudeLocalisation: string;

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

    public constructor() {
        this.identifiantLocalisation = 0;
        this.latitudeLocalisation = "";
        this.longitudeLocalisation = "";
    }
}