import { NavManager } from "../components/general/NavManager.js";
import { setting } from "../components/general/Setting.js";
class SettingPage {
    navManager
    constructor() {}
    async init() {
        setting.init()
        this.navManager=new NavManager()

        let optionElements=document.querySelector(".options").children
        for(let optionEle of optionElements){
            let key=optionEle.dataset.option
            if(!key)return
            let valueEle=optionEle.querySelector(".value")
            valueEle.innerText=setting[key]
            optionEle.addEventListener("click",()=>{
                setting.setOption(key,setting[key]==="0"?"1":"0")
                valueEle.innerText=setting[key]
            })
        }
    }
}
const app = new SettingPage();
app.init();
