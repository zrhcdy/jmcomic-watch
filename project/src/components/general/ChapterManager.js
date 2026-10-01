import { jmApi } from "../../api/JmcomicApi.js";
import { ImageLoader } from "./ImageLoader.js";

export class ChapterManager {
    chapterContainerDom;
    chapterImageContainer;
    chapterFoldBtn;
    chapterImageLoader;
    chapterID;
    chapterCache = {};

    constructor() {
        this.chapterContainerDom = document.querySelector(".chapter");
        this.chapterImageContainer =
            this.chapterContainerDom.querySelector(".image-cr");
        this.chapterFoldBtn =
            this.chapterContainerDom.querySelector(".fold-btn");

        
        this.chapterFoldBtn.addEventListener("click", () => {
            this.chapterContainerDom.style.transform = "translateY(100%)";
            document.body.style.overflow = "auto";
        });
    }
    setImages(chapter) {
        this.chapterFoldBtn.textContent = `图集（${chapter.images.length}）`;
        this.chapterImageLoader = new ImageLoader(
            this.chapterImageContainer,
            chapter,
        );
    }
    openChapter(id) {
        document.body.style.overflow = "hidden";

        this.chapterContainerDom.style.transform = "translateY(0)";
        if (id == this.chapterID) return;
        this.chapterID = id;
        this.chapterImageContainer.innerHTML = "";
        this.chapterFoldBtn.textContent = "加载中...";
        if (this.chapterCache[id]) {
            let chapter = this.chapterCache[id];
            this.setImages(chapter);
            return;
        }
        jmApi.getComicChapter(id).then((chapter) => {
            this.chapterCache[id] = chapter;
            if (id != this.chapterID) return;
            this.setImages(chapter);
        });
    }
}
