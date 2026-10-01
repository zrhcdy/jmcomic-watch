import { jmApi } from "../api/JmcomicApi.js";
import { ChapterManager } from "../components/general/ChapterManager.js";
import { NavManager } from "../components/general/NavManager.js";
import { setting } from "../components/general/Setting.js";
import { LatestContainerManager } from "../components/latest/LatestContainerManager.js";

class LatestPage {
    navManager
    latestContainerManager
    chapterManager
    constructor() {}
    async init() {
        setting.init()
        await jmApi.init();
        this.latestContainerManager=new LatestContainerManager()
        this.navManager=new NavManager()
        this.chapterManager=new ChapterManager()

        this.latestContainerManager.onClickComicItem=(e)=>{
            this.chapterManager.openChapter(e.target.parentNode.dataset.id)
        }
    }
}
const app = new LatestPage();
app.init();
