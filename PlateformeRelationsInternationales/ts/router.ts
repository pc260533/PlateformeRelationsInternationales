import { Plateforme } from "./modelePlateforme/plateforme";
import { ControleurPlateforme } from "./controleurPlateforme";
import { ControleurAidesFinancieres } from "./controleursPlateforme/controleurAidesFinancieres";
import { ControleurContactsEtrangers } from "./controleursPlateforme/controleurContactsEtrangers";
import { ControleurCoordinateurs } from "./controleursPlateforme/controleurCoordinateurs";
import { ControleurDomainesDeCompetences } from "./controleursPlateforme/controleurDomainesDeCompetences";
import { ControleurEtatsPartenaires } from "./controleursPlateforme/controleurEtatsPartenaires";
import { ControleurMails } from "./controleursPlateforme/controleurMails";
import { ControleurMobilites } from "./controleursPlateforme/controleurMobilites";
import { ControleurPartenaires } from "./controleursPlateforme/controleurPartenaires";
import { ControleurSpecialites } from "./controleursPlateforme/controleurSpecialites";
import { ControleurVoeux } from "./controleursPlateforme/controleurVoeux";
import { ControleurTemplatesMails } from "./controleursPlateforme/controleurTemplatesMails";
import { ControleurUtilisateurs } from "./controleursPlateforme/controleurUtilisateurs";
import { ControleurAuthentification } from "./controleursPlateforme/controleurAuthentification";

import { ErreurPageInexistante } from "./erreur/erreurPageInexistante";
import { ErreurSerializable } from "./erreur/erreurSerializable";

import VueAccueil from "./vuesPlateforme/vueAccueil";
import VuePartenaire from "./vuesPlateforme/vuePartenaires";
import VueAidesFinancieres from "./vuesPlateforme/vueAidesFinancieres";
import VueCoordinateurs from "./vuesPlateforme/vueCoordinateurs";
import VueCouts from "./vuesPlateforme/vueCouts";
import VueMails from "./vuesPlateforme/vueMails";
import VueAdministration from "./vuesPlateforme/vueAdministration";
import VueAPropos from "./vuesPlateforme/vueAPropos";
import VueErreur from "./vuesPlateforme/vueErreur";
import VueAuthentification from "./vuesPlateforme/vueAuthentifiation";
import VueDeconnexion from "./vuesPlateforme/vueDeconnexion";
import VueDetailsUtilisateur from "./vuesPlateforme/vueDetailsUtilisateur";

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const plateforme = new Plateforme();
const controleurPlateforme = new ControleurPlateforme(plateforme);
const controleurAidesFinancieres = new ControleurAidesFinancieres(plateforme);
const controleurContactsEtrangers = new ControleurContactsEtrangers(plateforme);
const controleurCoordinateurs = new ControleurCoordinateurs(plateforme);
const controleurDomainesDeCompetences = new ControleurDomainesDeCompetences(plateforme);
const controleurEtatsPartenaires = new ControleurEtatsPartenaires(plateforme);
const controleurMails = new ControleurMails(plateforme);
const controleurMobilites = new ControleurMobilites(plateforme);
const controleurPartenaires = new ControleurPartenaires(plateforme);
const controleurSpecialites = new ControleurSpecialites(plateforme);
const controleurVoeux = new ControleurVoeux(plateforme);
const controleurTemplatesMails = new ControleurTemplatesMails(plateforme);
const controleurUtilisateurs = new ControleurUtilisateurs(plateforme);
const controleurAuthentification = new ControleurAuthentification(plateforme);

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
            },
            meta: {
                title: "Plateforme Relations Internationales - Accueil"
            }
        },
        {
            path: "/partenaires",
            name: "partenaires",
            component: VuePartenaire,
            props: {
                plateforme: plateforme,
                controleurAidesFinancieres: controleurAidesFinancieres,
                controleurContactsEtrangers: controleurContactsEtrangers,
                controleurCoordinateurs: controleurCoordinateurs,
                controleurDomainesDeCompetences: controleurDomainesDeCompetences,
                controleurEtatsPartenaires: controleurEtatsPartenaires,
                controleurMails: controleurMails,
                controleurMobilites: controleurMobilites,
                controleurPartenaires: controleurPartenaires,
                controleurSpecialites: controleurSpecialites,
                controleurVoeux: controleurVoeux
            },
            meta: {
                title: "Plateforme Relations Internationales - Partenaires"
            }
        },
        {
            path: "/aidesfinancieres",
            name: "aidesfinancieres",
            component: VueAidesFinancieres,
            props: {
                plateforme: plateforme,
                controleurAidesFinancieres: controleurAidesFinancieres
            },
            meta: {
                title: "Plateforme Relations Internationales - Aides Financieres"
            }
        },
        {
            path: "/coordinateurs",
            name: "coordinateurs",
            component: VueCoordinateurs,
            props: {
                plateforme: plateforme,
                controleurCoordinateurs: controleurCoordinateurs
            },
            meta: {
                title: "Plateforme Relations Internationales - Coordinateurs"
            }
        },
        {
            path: "/couts",
            name: "couts",
            component: VueCouts,
            props: {
                plateforme: plateforme,
                controleurAidesFinancieres: controleurAidesFinancieres,
                controleurContactsEtrangers: controleurContactsEtrangers,
                controleurCoordinateurs: controleurCoordinateurs,
                controleurDomainesDeCompetences: controleurDomainesDeCompetences,
                controleurEtatsPartenaires: controleurEtatsPartenaires,
                controleurMails: controleurMails,
                controleurMobilites: controleurMobilites,
                controleurPartenaires: controleurPartenaires,
                controleurSpecialites: controleurSpecialites,
                controleurVoeux: controleurVoeux
            },
            meta: {
                title: "Plateforme Relations Internationales - Couts"
            }
        },
        {
            path: "/mails",
            name: "mails",
            component: VueMails,
            props: {
                plateforme: plateforme,
                controleurAidesFinancieres: controleurAidesFinancieres,
                controleurContactsEtrangers: controleurContactsEtrangers,
                controleurCoordinateurs: controleurCoordinateurs,
                controleurDomainesDeCompetences: controleurDomainesDeCompetences,
                controleurEtatsPartenaires: controleurEtatsPartenaires,
                controleurMails: controleurMails,
                controleurMobilites: controleurMobilites,
                controleurPartenaires: controleurPartenaires,
                controleurSpecialites: controleurSpecialites,
                controleurVoeux: controleurVoeux,
                controleurTemplatesMails: controleurTemplatesMails
            },
            meta: {
                title: "Plateforme Relations Internationales - Mails"
            }
        },
        {
            path: "/administration",
            name: "administration",
            component: VueAdministration,
            props: {
                plateforme: plateforme,
                controleurContactsEtrangers: controleurContactsEtrangers,
                controleurDomainesDeCompetences: controleurDomainesDeCompetences,
                controleurEtatsPartenaires: controleurEtatsPartenaires,
                controleurMobilites: controleurMobilites,
                controleurSpecialites: controleurSpecialites,
                controleurVoeux: controleurVoeux,
                controleurUtilisateurs: controleurUtilisateurs
            },
            meta: {
                title: "Plateforme Relations Internationales - Couts"
            }
        },
        {
            path: "/apropos",
            name: "apropos",
            component: VueAPropos,
            props: {
                plateforme: plateforme,
                controleurPlateforme: controleurPlateforme
            },
            meta: {
                title: "Plateforme Relations Internationales - A Propos"
            }
        },
        {
            path: "/authentification",
            name: "authentification",
            component: VueAuthentification,
            props: {
                plateforme: plateforme,
                controleurAuthentification: controleurAuthentification
            },
            meta: {
                title: "Plateforme Relations Internationales - Se Connecter"
            }
        },
        {
            path: "/deconnexion",
            name: "deconnexion",
            component: VueDeconnexion,
            props: {
                plateforme: plateforme,
                controleurAuthentification: controleurAuthentification
            },
            meta: {
                title: "Plateforme Relations Internationales - Se Déconnecter"
            }
        },
        {
            path: "/detailsUtilisateur",
            name: "detailsUtilisateur",
            component: VueDetailsUtilisateur,
            props: {
                plateforme: plateforme,
                controleurUtilisateurs: controleurUtilisateurs
            },
            meta: {
                title: "Plateforme Relations Internationales - Détails Utilisateur"
            }
        },
        {
            path: "/erreur",
            name: "erreur",
            component: VueErreur,
            props: {
                plateforme: plateforme,
                controleurPlateforme: controleurPlateforme,
                erreurSerializable: new ErreurSerializable()
            },
            meta: {
                title: "Plateforme Relations Internationales - Erreur"
            }
        },
        {
            path: "*",
            name: "tout",
            component: VueErreur,
            props: {
                plateforme: plateforme,
                controleurPlateforme: controleurPlateforme,
                erreurSerializable: new ErreurPageInexistante()
            },
            meta: {
                title: "Plateforme Relations Internationales - Accueil"
            }
        }
    ],
});