import { IVuePlateforme } from "../ivuePlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";

import imageLogo from "../../images/logo.png";
import imageFavicon from "../../images/favicon.png";

export abstract class VuePlateforme implements IVuePlateforme {

    public abstract ajoutPartenaire(partenaire: Partenaire): void;

    public abstract modificationPartenaire(partenaire: Partenaire): void;

    public abstract suppressionPartenaire(partenaire: Partenaire): void;

    public afficherImages(): void {
        $("link").attr("href", imageFavicon);
        $("#imageLogo").attr("src", imageLogo);
    }

    public constructor() {
        this.afficherImages();
    }

}