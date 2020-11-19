import { ErreurSerializable } from "./erreurSerializable";

export class ErreurPageInexistante extends ErreurSerializable {

    public constructor() {
        super();
        this.MessageErreur = "L'url demandé est inexistant.";
        this.TitreErreur = "Page non trouvée";
        this.StatusErreur = "404";
        this.DeveloppeurMessageErreur = "L'url demandé est inexistant.";
        this.StackTraceErreur = "";
    }

}