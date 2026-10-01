import { jmApi } from "../api/JmcomicApi.js";
import { ChapterManager } from "../components/general/ChapterManager.js";
import { NavManager } from "../components/general/NavManager.js";
import { setting } from "../components/general/Setting.js";
import { SearchContainerManager } from "../components/search/SearchContainerManager.js";

class SearchPage {
    navManager
    searchContainerManager
    searchQuery
    switchServerBtnManager
    chapterManager
    constructor() {}
    async init() {
        const sq = new URLSearchParams(location.search).get("sq");
        if (typeof sq !== "string" || sq.trim()==="")
            throw new Error("sq is not true");

        this.searchQuery = sq;
        setting.init()
        await jmApi.init();
        this.searchContainerManager=new SearchContainerManager(this.searchQuery)

        this.navManager=new NavManager()
        this.chapterManager=new ChapterManager()

        this.searchContainerManager.onClickComicItem=(e)=>{
            this.chapterManager.openChapter(e.target.parentNode.dataset.id)
        }
    }
}
const app = new SearchPage();
app.init();
