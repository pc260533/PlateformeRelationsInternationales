import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("../templates/carouselSpecifique.html")
})
export default class CarouselSpecifique extends Vue {
    @Prop() private idCarousel!: string;
    private listeImagesSlides: string[];

    public constructor() {
        super();
        this.listeImagesSlides = [];
    }

    mounted() {

    }

    public ajouterSlide(cheminImage: string, titreImage: string, sousTitreImage: string, estActif: boolean): void {
        var classActive = "";
        if (estActif) {
            classActive = "active";
        }
        this.listeImagesSlides.push(cheminImage);
        var indicator = '<li data-target="#' + this.idCarousel + '" data-slide-to="' + (this.listeImagesSlides.length - 1) as string + '" class="' + classActive + '"></li>';
        var carouselItem = '<div class="carousel-item ' + classActive + '"><img class="img-fluid d-block mx-auto" src="' + cheminImage + '" alt="..."><div class="carousel-caption d-none d-md-block"><h5>' + titreImage + '</h5><p>' + sousTitreImage + '</p></div></div>';
        $("#carouselIndicators").append(indicator);
        $("#carouselItems").append(carouselItem);
    }

}