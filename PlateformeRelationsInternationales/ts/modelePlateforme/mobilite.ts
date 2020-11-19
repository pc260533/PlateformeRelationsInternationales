export class Mobilite {
    private identifiantMobilite: number;
    private typeMobilite: string;

    public get IdentifiantMobilite(): number {
        return this.identifiantMobilite;
    }

    public set IdentifiantMobilite(identifiantMobilite: number) {
        this.identifiantMobilite = identifiantMobilite;
    }

    public get TypeMobilite(): string {
        return this.typeMobilite;
    }

    public set TypeMobilite(typeMobilite: string) {
        this.typeMobilite = typeMobilite;
    }

    public constructor() {
        this.identifiantMobilite = 0;
        this.typeMobilite = "";
    }

}