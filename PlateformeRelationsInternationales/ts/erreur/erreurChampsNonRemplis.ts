export class ErreurChampsNonRemplis extends Error {

    public constructor() {
        super("Des champs d'un formulaire doivent être remplis.");
    }

}