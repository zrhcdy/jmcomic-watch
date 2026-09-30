import { jmApi } from "../../api/JmcomicApi.js";
import { ImageCutter } from "./ImageCutter.js";

export class ImageLoader {
    containerDom;
    chapter;
    cutter;
    constructor(containerDom, chapter) {
        this.containerDom = containerDom;
        this.chapter = chapter;
        this.cutter = new ImageCutter();

        this.resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                let imgCr = entry.target.parentNode;
                let img = entry.target;
                if(!imgCr){
                    this.resizeObserver.unobserve(img);
                    return
                }
                if (img.height > 40) {
                    this.resizeObserver.unobserve(img);
                    imgCr.style.height = null;
                }
            }
        });
        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                for (let entry of entries) {
                    if (entry.isIntersecting) {
                        let image = entry.target;
                        if (!image.dataset.beginload) {
                            image.dataset.beginload = "true";
                            image.children[1].src = jmApi.getChapterImageURL(
                                this.chapter.id,
                                image.dataset.path,
                            );
                        }
                    }
                }
            },
            { rootMargin: "50px" },
        );

        this.chapter.images.forEach((path) => {
            this.containerDom.appendChild(this.createImageDom(path));
        })
    }
    imageOnLoad(img, path) {
        let container = img.parentNode;
        container.removeChild(container.children[0]);
        container.style.height = null;
        if (this.chapter.id >= 220980 && !path.endsWith(".gif")) {
            container.removeChild(container.children[0]);
            container.appendChild(
                this.cutter.cutImage(img, this.chapter.id, path),
            );
        } else {
            img.style.filter = "none";
        }
    }
    createImageDom(path) {
        let iDom = document.createElement("div");
        iDom.className = "image";
        iDom.style.height = "500px";
        iDom.dataset.path = path;
        let span = document.createElement("span");
        span.textContent = path;
        let img = document.createElement("img");
        img.alt = path;

        img.onload = () => this.imageOnLoad(img, path);
        this.intersectionObserver.observe(iDom);
        this.resizeObserver.observe(img);
        iDom.appendChild(span);
        iDom.appendChild(img);

        return iDom;
    }
}
