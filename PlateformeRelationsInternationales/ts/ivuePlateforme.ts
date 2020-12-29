import { ErreurSerializable } from "./erreur/erreurSerializable";
import { InformationSerializable } from "./information/informationSerializable";

export interface IVuePlateforme {

    afficheErreur(erreur: ErreurSerializable): void;

    afficheInformation(information: InformationSerializable): void;

}