import { jmApi } from "../../api/JmcomicApi.js"
import { lazyLoader } from "../../dom/LazyLoader.js"
import { ImageLoader } from "../general/ImageLoader.js"
import { InfinityScrollContainer } from "../general/InfinityScrollContainer.js"

export class LatestContainerManager{
    containerDom
    scrollContainer
    chapterContainerDom
    chapterFoldBtn
    chapterImageLoader
    chapterID
    chapterCache={}
    constructor(){
        this.containerDom=document.querySelector(".latest-cr")
        this.chapterContainerDom=document.querySelector(".chapter")
        this.chapterImageContainer=this.chapterContainerDom.querySelector(".image-cr")
        this.chapterFoldBtn=this.chapterContainerDom.querySelector(".fold-btn")
        this.scrollContainer=new InfinityScrollContainer({
            container:this.containerDom,
            threshold:100,
            coolingTime:500,
            loadContent:(page)=>this.loadContent(page)
        })
        this.chapterFoldBtn.addEventListener("click",()=>{
            this.chapterContainerDom.style.transform="translateY(100%)"
        })
    }
    init(){
        this.scrollContainer.init()
        
    }
    async loadContent(page){
        let list=await jmApi.getLatestContent(page)
        let crDom=this.#getComicsCr(list)
        this.containerDom.appendChild(crDom)
        const covers=crDom.querySelectorAll(".cover")
        for(let cover of covers){
            lazyLoader.addCover(cover)
        }
        crDom.addEventListener("click",(e)=>{
            if(e.target.tagName == "IMG"){
                let id=e.target.parentNode.dataset.id
                
                this.chapterContainerDom.style.transform="translateY(0)"
                if(id == this.chapterID)return
                this.chapterID=id
                this.chapterImageContainer.innerHTML=""
                this.chapterFoldBtn.textContent="加载中..."
                if(this.chapterCache[id]){
                    let chapter=this.chapterCache[id]
                    this.chapterFoldBtn.textContent=`图集（${chapter.images.length}）`
                    this.chapterImageLoader=new ImageLoader(this.chapterImageContainer,chapter)
                    return
                }
                jmApi.getComicChapter(id).then((chapter)=>{
                    this.chapterCache[id]=chapter
                    this.chapterFoldBtn.textContent=`图集（${chapter.images.length}）`
                    this.chapterImageLoader=new ImageLoader(this.chapterImageContainer,chapter)

                })
            }
        })
    }
    #getComicsCr(list){
        const cr=document.createElement("div")
        cr.className="comics-cr"
        cr.innerHTML=this.#getComicsHTML(list)
        return cr
    }
    #getComicsHTML(list){
        return list.map((c)=>`
            <div class="comic-item">
                <div class="cover" data-id=${c.id}>
                    <img alt="封面"/>
                </div>
                <h1 class="c-title">${c.name}</h1>
                <h2 class="c-sr-title">${c.author}</h2>
            </div>
        `).join("")
    }
}