import { Utilisateur } from "../modelePlateforme/utilisateur";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueUtilisateurs extends IVuePlateforme {

    ajoutUtilisateur(utilisateur: Utilisateur): void;

    suppressionUtilisateur(utilisateur: Utilisateur): void;

    modificationUtilisateur(utilisateur: Utilisateur): void;

}