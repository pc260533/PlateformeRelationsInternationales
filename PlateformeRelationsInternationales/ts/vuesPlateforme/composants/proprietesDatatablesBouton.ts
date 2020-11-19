export class ProprietesDatatablesBouton {
    private texteBouton: string;
    private callbackClickButton: () => void;

    public get TexteBouton(): string {
        return this.texteBouton;
    }

    public set TexteBouton(texteBouton: string) {
        this.texteBouton = texteBouton;
    }

    public get CallbackClickButton(): () => void {
        return this.callbackClickButton;
    }

    public set CallbackClickButton(callbackClickButton: () => void) {
        this.callbackClickButton = callbackClickButton;
    }

    public constructor(titreColonne: string, callbackClickButton: () => void) {
        this.texteBouton = titreColonne;
        this.callbackClickButton = callbackClickButton;
    }
}