import Vue from "vue";
import router from "./router";
import ApplicationVue from "./applicationVue";
import { Plateforme } from "./modelePlateforme/plateforme";

export class Application {
    private applicationVue: Vue;

    public constructor() {
        this.applicationVue = new Vue({
            router,
            render: h => h(ApplicationVue)
        }).$mount("#app");
    }

}