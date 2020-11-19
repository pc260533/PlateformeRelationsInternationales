import VueAccueil from "./vuesPlateforme/vueAccueil";
import VuePartenaire from "./vuesPlateforme/vuePartenaires";
import VueAidesFinancieres from "./vuesPlateforme/vueAidesFinancieres";
import VueContacts from "./vuesPlateforme/vueContacts";
import VueAPropos from "./vuesPlateforme/vueAPropos";

import Vue from "vue";
import Router from "vue-router";
import { Plateforme } from "./modelePlateforme/plateforme";
import { ControleurPlateforme } from "./controleurPlateforme";

Vue.use(Router);

const plateforme = new Plateforme();
const controleurPlateforme = new ControleurPlateforme(plateforme);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            alias: "/accueil",
            name: "accueil",
            component: VueAccueil,
            props: {
                plateforme: plateforme,
                controleurPlateforme: controleurPlateforme
            }
        },
        {
            path: "/partenaires",
            name: "partenaires",
            component: VuePartenaire,
            props: {
                plateforme: plateforme,
                controleurPlateforme: controleurPlateforme
            }
        },
        {
            path: "/aidesfinancieres",
            name: "aidesfinancieres",
            component: VueAidesFinancieres,
            props: {
                plateforme: plateforme,
                controleurPlateforme: controleurPlateforme
            }
        },
        {
            path: "/contacts",
            name: "contacts",
            component: VueContacts,
            props: {
                plateforme: plateforme,
                controleurPlateforme: controleurPlateforme
            }
        },
        {
            path: "/apropos",
            name: "apropos",
            component: VueAPropos,
            props: {
                plateforme: plateforme,
                controleurPlateforme: controleurPlateforme
            }
        },
        {
            path: "*",
            name: "tout",
            component: VueAccueil,
            props: {
                plateforme: plateforme,
                controleurPlateforme: controleurPlateforme
            }
        },
        /*{
            path: "/about",
            name: "about",
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ /*"./views/About.vue"),
        },*/
    ],
});