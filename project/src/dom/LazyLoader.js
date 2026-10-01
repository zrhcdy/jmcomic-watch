class LazyLoader {
    observer;
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => {
                for (let entry of entries) {
                    if (entry.isIntersecting) {
                        this.observer.unobserve(entry.target);
                        const cover = entry.target;
                        const coverImg = cover.children[0];
                        coverImg.src = cover.dataset.src;
                    }
                }
            },
            { rootMargin: "50px" },
        );
    }
    addCover(coverEle){
        this.observer.observe(coverEle)
        const coverImg = coverEle.children[0];
        let retryCount = 0;
        coverImg.onerror = () => {
            if(retryCount > 5){
                coverImg.onerror = null;
                return
            }
            retryCount++;
            coverImg.src = null;
            coverImg.src = coverEle.dataset.src;
        }
        coverImg.onload = () => {
            coverImg.onerror = null;
            coverImg.onload = null;
        }
    }
    clear(){
        this.observer.disconnect()
    }
}
export const lazyLoader=new LazyLoader()