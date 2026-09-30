import { jmApi } from "../api/JmcomicApi.js";
import { NavManager } from "../components/general/NavManager.js";
import { setting } from "../components/general/Setting.js";
import { LatestContainerManager } from "../components/latest/LatestContainerManager.js";

class LatestPage {
    navManager
    latestContainerManager
    switchServerBtnManager
    constructor() {}
    async init() {
        setting.init()
        await jmApi.init();
        this.latestContainerManager=new LatestContainerManager()
        this.latestContainerManager.init()

        this.navManager=new NavManager()
        this.navManager.init()

        
    }
}
const app = new LatestPage();
app.init();
