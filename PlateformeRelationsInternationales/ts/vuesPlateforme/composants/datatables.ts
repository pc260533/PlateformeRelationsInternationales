import { ProprietesDatatables } from "./proprietesDatatables";
import { ProprietesDatatablesBouton } from "./proprietesDatatablesBouton";

import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";
import "datatables.net-select-bs4";
import "datatables.net-select-bs4/css/select.bootstrap4.css";
import "datatables.net-responsive-bs4";
import "datatables.net-responsive-bs4/css/responsive.bootstrap4.css";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("../templates/datatables.html")
})
export default class Datatables<TypeLigne extends object> extends Vue {
    @Prop() private idDatatables!: string;
    @Prop() private proprietesDatatables!: ProprietesDatatables;
    private datatables: DataTables.Api;

    mounted() {
        this.datatables = $(this.$el).DataTable({
            scrollY: "500px",
            scrollCollapse: true,
            paging: false,
            responsive: true,
            select: true,
            "columns": this.proprietesDatatables.ListeColonnes,
            dom: this.proprietesDatatables.OrdreDesElementsDeControle,
            buttons: [],
            data: [],
            language: {
                decimal: ",",
                processing: "Traitement en cours...",
                search: "Rechercher&nbsp;:",
                lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
                info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
                infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                infoPostFix: "",
                loadingRecords: "Chargement en cours...",
                zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
                emptyTable: "Aucune donnée disponible dans le tableau",
                paginate: {
                    first: "Premier",
                    previous: "Pr&eacute;c&eacute;dent",
                    next: "Suivant",
                    last: "Dernier"
                },
                aria: {
                    sortAscending: ": activer pour trier la colonne par ordre croissant",
                    sortDescending: ": activer pour trier la colonne par ordre décroissant"
                }
            }
        });
        this.proprietesDatatables.ListeBoutons.forEach((proprieteDatatablesBouton: ProprietesDatatablesBouton, index: number) => {
            this.datatables.button().add(index, {
                text: proprieteDatatablesBouton.TexteBouton,
                action: function (e, dt, button, config) {
                    proprieteDatatablesBouton.CallbackClickButton();
                },
            });
        });
    }

    public getListeLignesSelectionnees(): TypeLigne[] {
        var listeLignesSelectionnees = this.datatables.rows({ selected: true }).data();
        return listeLignesSelectionnees.toArray();
    }

    public ajouterLigneDansDatatables(ligne: TypeLigne): void {
        this.datatables.row.add(ligne).draw();
    }

    public supprimerLigne(ligne: TypeLigne) {
        var indexLigneASupprimer = null;
        this.datatables.rows().data().each((typeLigne: TypeLigne, index: number) => {
            if (typeLigne == ligne) {
                indexLigneASupprimer = index;
            }
        });
        if (indexLigneASupprimer != null) {
            this.datatables.row(indexLigneASupprimer).remove();
            this.datatables.draw(false);
        }
    }

    public supprimerLigneSelectionneeDansDatatables(): void {
        this.datatables.row(".selected").remove();
        this.datatables.draw(false);
    }

    public modifierLigneSelectionneeDansDatatables(ligne: TypeLigne): void {
        this.datatables.row(".selected").data(ligne).draw();
    }

    public redessinerDatatables(): void {
        this.datatables.rows().data().each((ligne: TypeLigne, index: number) => {
            this.datatables.row(index).data(ligne).draw();
        });
    }

    public ajusterLesColonnes(): void {
        this.datatables.columns.adjust();
    }

    public viderDatatables(): void {
        this.datatables.clear().draw();
    }

}