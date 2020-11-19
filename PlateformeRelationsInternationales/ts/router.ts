import VueAccueil from "./vuesPlateforme/vueAccueil";
import VuePartenaire from "./vuesPlateforme/vuePartenaires";
import VueAidesFinancieres from "./vuesPlateforme/vueAidesFinancieres";
import VueContacts from "./vuesPlateforme/vueContacts";
import VueAPropos from "./vuesPlateforme/vueAPropos";

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            alias: "/accueil",
            name: "accueil",
            component: VueAccueil,
            props: true
        },
        {
            path: "/partenaires",
            name: "partenaires",
            component: VuePartenaire,
            props: true
        },
        {
            path: "/aidesfinancieres",
            name: "aidesfinancieres",
            component: VueAidesFinancieres,
            props: true
        },
        {
            path: "/contacts",
            name: "contacts",
            component: VueContacts,
            props: true
        },
        {
            path: "/apropos",
            name: "apropos",
            component: VueAPropos,
            props: true
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