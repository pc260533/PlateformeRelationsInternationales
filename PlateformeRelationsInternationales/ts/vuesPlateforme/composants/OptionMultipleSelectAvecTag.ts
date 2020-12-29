export class OptionMultipleSelectAvecTag {
    private identifiantOption: string;
    private texteOption: string;

    public get IdentifiantOption(): string {
        return this.identifiantOption;
    }

    public set IdentifiantOption(identifiantOption: string) {
        this.identifiantOption = identifiantOption;
    }

    public get TexteOption(): string {
        return this.texteOption;
    }

    public set TexteOption(texteOption: string) {
        this.texteOption = texteOption;
    }

    public constructor(identifiantOption: string, texteOption: string) {
        this.identifiantOption = identifiantOption;
        this.texteOption = texteOption;
    }

}