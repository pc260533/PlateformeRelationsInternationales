import { ISerializable } from "./ISerializable";

export class TemplateMail implements ISerializable {
    private identifiantTemplateMail: number;
    private nomTemplateMail: string;
    private messageHtmlTemplateMail: string;

    public get IdentifiantTemplateMail(): number {
        return this.identifiantTemplateMail;
    }

    public set IdentifiantTemplateMail(identifiantTemplateMail: number) {
        this.identifiantTemplateMail = identifiantTemplateMail;
    }

    public get NomTemplateMail(): string {
        return this.nomTemplateMail;
    }

    public set NomTemplateMail(nomTemplateMail: string) {
        this.nomTemplateMail = nomTemplateMail;
    }

    public get MessageHtmlTemplateMail(): string {
        return this.messageHtmlTemplateMail;
    }

    public set MessageHtmlTemplateMail(messageHtmlTemplateMail: string) {
        this.messageHtmlTemplateMail = messageHtmlTemplateMail;
    }

    public constructor() {
        this.identifiantTemplateMail = 0;
        this.nomTemplateMail = "";
        this.messageHtmlTemplateMail = "";
    }

    public getObjetSerializable(): any {
        var templateHtml = {
            identifiantTemplateMail: this.IdentifiantTemplateMail,
            nomTemplateMail: this.NomTemplateMail,
            messageHtmlTemplateMail: this.MessageHtmlTemplateMail
        }
        return templateHtml;
    }

    public getObjetSerializableId(): any {
        var templateHtml = {
            identifiantTemplateMail: this.IdentifiantTemplateMail
        }
        return templateHtml;
    }

}