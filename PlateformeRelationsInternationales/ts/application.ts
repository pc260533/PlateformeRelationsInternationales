import Vue from "vue";
import router from "./router";
import ApplicationVue from "./applicationVue";
import { Plateforme } from "./modelePlateforme/plateforme";
import { ControleurPlateforme } from "./controleurPlateforme";

export class Application {
    private applicationVue: Vue;

    public constructor() {
        /*router.beforeEach((to, from, next) => {
            document.title = to.meta.title;
            next();
        });*/
        this.applicationVue = new Vue({
            /*data: {
                plateforme: new Plateforme()
            },*/
            router,
            render: h => h(ApplicationVue)
        }).$mount("#app");
    }

}