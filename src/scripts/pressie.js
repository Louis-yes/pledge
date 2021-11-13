/*************************************************************

    🎁  Pressie 🎁

    Is yet another md => html slide deck tool
    Its only dependency is marked
    https://marked.js.org/
    
    It takes in md and spits out html, 
    while still allowing you to use html when you want.

    Say, for example, if you want to pass your html into a 
    front end framework for further elaboration. Ive written it
    so I can pass it into petite-vue.

    Its not very big, its easy to see how it works.
    Currently an extreme WIP, likely to change drastically
    Further documentation to come 🚢

    Todo
    [x] Add transitions

    [ ] Move slide resticiton logic into set slide function
    [ ] Let you add attrs to the slides
    [ ] hidden slide functionality? or you know, some class you can check
    [ ] emit slide movement event, remove transition animation logic from here

*************************************************************/
import { marked } from "marked"

export default function pressie(md, opts){
    const state = {
        currentSlide : Number(window.location.hash.replace("#",'')) || 0,
        length : md.split('---').length - 1,
        nav: ""
    }

    const classes = {
        beforeLeave: "before-leave",
        beforeEnter: "before-enter",
        active: "active",
        next: "next",
        slide: "slide",
        index: "index-"
    }

    state.slides = makeSlides()
    // add nav element, to hold focus and dispatch events 
    state.nav = makeNavElement()

    keyboardEvents()

    return state.slides
    
    /**
     * Takes an md file and splits it by "---"
     * Transforms each entry into html
     *  <section class="slide index-{{index}} {{active}} {{theme-class}}">
     *      <article>
     *          {{contents}}
     *      </article>
     *  </section>
     * @returns string array of slides
     */
    function makeSlides (){
        const rx_pressie = /<pressie v-scope>/
        const rx_slide = /<slide .+>/
        
        return md.split('---').map((ss,i) => {
            const slideTag = ss.match(rx_slide)
            let additionalAttrs = ""
            let addclass = ""
            if(slideTag){
                let attrs = slideTag[0].matchAll(/([\w\-]+)\=\"([\w\s]+)\"/g)
                if(attrs){
                    let aaa = Array.from(attrs)
                    aaa.forEach(aa => { if(aa[1] == "class"){ addclass = aa[2] } })
                    additionalAttrs = aaa.map(aa => { return aa[1] != "class" ? `${aa[1]}="${aa[2]}"`: "" }).join(" ")
                }
                ss = ss.replace(rx_slide, '')
            }
            return `
                <section class="${classes.slide} ${classes.index}${i} ${i == state.currentSlide ? classes.active: ''} ${addclass}" ${additionalAttrs}>
                    <article>${marked.parse(ss)}</article>
                </section>`
            })
    }

    /**
     * Adds an invisible element to the page, 
     * to hold focus when navigating with the keyboard
     * and stop <input> keyboard interactions from triggering event listeners
     */
    function makeNavElement(){
        const nav = document.createElement('div')
        nav.innerHTML = `
            <a class="next bg-btn" data-pressie="next">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M22.956,0.344l20.451,20.45c0.457,0.458,0.457,1.2,0,1.657L22.956,42.902c-0.457,0.457-1.199,0.457-1.657,0
                        l-1.934-1.934c-0.457-0.458-0.457-1.2,0-1.657l15.149-15.149H1.172C0.524,24.162,0,23.637,0,22.99v-2.734
                        c0-0.647,0.524-1.172,1.172-1.172h33.343L19.365,3.935c-0.457-0.458-0.457-1.2,0-1.657l1.934-1.934
                        C21.757-0.114,22.499-0.114,22.956,0.344z"/>
                    </svg>
            </a>
            <a class="previous" data-pressie="previous"> previous </a> 
        `
        nav.className = "pressie-nav"
        nav.tabIndex = "0"
        nav.addEventListener("click", (e)=>{
            if(e.target.dataset.pressie == "next"){ setSlide(state.currentSlide + 1) }
            if(e.target.dataset.pressie == "previous"){ setSlide(state.currentSlide - 1) }
        })

        document.body.appendChild(nav)
        return nav
    }

    /**
     * Sets active slide
     * @param {*} i index of slide to set 
     */
    function setSlide(i){
        if(i > state.length || i < 0) return
        // current active slide
        const currentSlide = document.querySelector(`.${classes.slide}.${classes.active}`)
        // slide to set
        const newSlide = document.querySelector(`.${classes.slide}.${classes.index}${i}`)
        // create event to use
        const event = new CustomEvent('pressie-slide-change', {
            bubbles: true,
            detail: { previous: currentSlide, next: newSlide }
        });

        state.currentSlide = i
        window.location.hash = i
        currentSlide.classList.remove(classes.active)
        newSlide.classList.add(classes.active)
        state.nav.dispatchEvent(event)
    }

    /**
     * initialises the keyboard event listeners
     */
    function keyboardEvents(){
        window.addEventListener('keydown', (e)=>{
            if(document.activeElement === document.body || document.activeElement === state.nav) {
                if(e.code == "ArrowLeft"){
                    setSlide(state.currentSlide - 1)
                } else if (e.code == "ArrowRight" || e.code == "Space"){
                    setSlide(state.currentSlide + 1)
                }
            }
        })
    }
}