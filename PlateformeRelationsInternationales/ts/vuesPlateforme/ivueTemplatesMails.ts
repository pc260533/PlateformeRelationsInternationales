import { TemplateMail } from "../modelePlateforme/templateMail";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueTemplatesMails extends IVuePlateforme {

    ajoutTemplateMail(templateMail: TemplateMail): void;

    suppressionTemplateMail(templateMail: TemplateMail): void;

    modificationTemplateMail(templateMail: TemplateMail): void;

}