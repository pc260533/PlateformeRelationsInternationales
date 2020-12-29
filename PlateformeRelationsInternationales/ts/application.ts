import Vue from "vue";
import router from "./router";
import store from "./store";
import ApplicationVue from "./applicationVue";

export class Application {
    private applicationVue: Vue;

    public constructor() {
        router.beforeEach((to, from, next) => {
            if (to.name == "administration") {
                if (store.state.storeModuleAuthentification.utilisateurConnecte) {
                    if (store.state.storeModuleAuthentification.utilisateurConnecte.estAdministrateur) {
                        next();
                    }
                    else {
                        next("accueil");
                    }
                }
                else {
                    next("authentification");
                }
            }
            else if ((to.name == "deconnexion") || (to.name == "detailsUtilisateur") || (to.name == "mails")) {
                if (store.state.storeModuleAuthentification.utilisateurConnecte) {
                    next();
                }
                else {
                    next("authentification");
                }
            }
            else {
                next();
            }
        });

        this.applicationVue = new Vue({
            router,
            store,
            render: h => h(ApplicationVue)
        }).$mount("#app");
    }

}