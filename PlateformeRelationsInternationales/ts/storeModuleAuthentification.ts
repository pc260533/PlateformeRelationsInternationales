import { Module, VuexModule } from "vuex-module-decorators";
import { Utilisateur } from "./modelePlateforme/utilisateur";

@Module
export default class StoreModuleAuthentification extends VuexModule {
    private utilisateurConnecte: Utilisateur = null;

}