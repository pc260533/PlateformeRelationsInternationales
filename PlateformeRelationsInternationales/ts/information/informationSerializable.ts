export class InformationSerializable {
    private titreInformation: string;
    private messageInformation: string;
    private detailsInformation: string;

    public get TitreInformation(): string {
        return this.titreInformation;
    }

    public set TitreInformation(titreInformation: string) {
        this.titreInformation = titreInformation;
    }

    public get MessageInformation(): string {
        return this.messageInformation;
    }

    public set MessageInformation(messageInformation: string) {
        this.messageInformation = messageInformation;
    }

    public get DetailsInformation(): string {
        return this.detailsInformation;
    }

    public set DetailsInformation(detailsInformation: string) {
        this.detailsInformation = detailsInformation;
    }

    public constructor();
    public constructor(titreInformation: string, messageInformation: string, detailsInformation: string);
    public constructor(titreInformation?: string, messageInformation?: string, detailsInformation?: string) {
        this.titreInformation = titreInformation || "";
        this.messageInformation = messageInformation || "";
        this.detailsInformation = detailsInformation || "";
    }

}