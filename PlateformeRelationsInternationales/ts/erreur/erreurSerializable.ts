export class ErreurSerializable {
    private messageErreur: string;
    private titreErreur: string;
    private statusErreur: string;
    private developpeurMessageErreur: string;
    private stackTraceErreur: string;

    public get MessageErreur(): string {
        return this.messageErreur;
    }

    public set MessageErreur(messageErreur: string) {
        this.messageErreur = messageErreur;
    }

    public get TitreErreur(): string {
        return this.titreErreur;
    }

    public set TitreErreur(titreErreur: string) {
        this.titreErreur = titreErreur;
    }

    public get StatusErreur(): string {
        return this.statusErreur;
    }

    public set StatusErreur(statusErreur: string) {
        this.statusErreur = statusErreur;
    }

    public get DeveloppeurMessageErreur(): string {
        return this.developpeurMessageErreur;
    }

    public set DeveloppeurMessageErreur(developpeurMessageErreur: string) {
        this.developpeurMessageErreur = developpeurMessageErreur;
    }

    public get StackTraceErreur(): string {
        return this.stackTraceErreur;
    }

    public set StackTraceErreur(stackTraceErreur: string) {
        this.stackTraceErreur = stackTraceErreur;
    }

    public constructor() {
        this.messageErreur = "";
        this.titreErreur = "";
        this.statusErreur = "";
        this.developpeurMessageErreur = "";
        this.stackTraceErreur = "";
    }

}