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

export default function pressie(md, oo){
    const state = {
        currentSlide : Number(window.location.hash.replace("#",'')) || 0,
        length : md.split('---').length - 1,
        nav: {}
    }
    const opts = oo || {}
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

    return {
        slides: state.slides,
        state: state,
        controls: {
            nextSlide: nextSlide
        }
    }
    
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
        const rx_class = /class\=\"\S+\"/
        return md.split('---').map((ss,i) => {
            const slideTag = ss.match(rx_slide)
            let addclass = ""
            let additionalAttrs = ""
            if(slideTag){
                let st = slideTag[0]
                let clss = st.match(rx_class)
                if (clss) { addclass = clss[0].split("\"")[1] }
                additionalAttrs = st.replace('<slide','').replace('/>','').replace(rx_class,'')
                ss = ss.replace(rx_slide, '')
            }
            if(opts.slideTemplate){
                return opts.slideTemplate(marked.parse(ss), i, `${classes.slide} ${classes.index}${i} ${i == state.currentSlide ? classes.active: ''} ${addclass}`, additionalAttrs)
            } else {
                return `
                <section class="${classes.slide} ${classes.index}${i} ${i == state.currentSlide ? classes.active: ''} ${addclass}" ${additionalAttrs}>
                    <article>${marked.parse(ss)}</article>
                </section>`
            }
        })
    }

    /**
     * Adds an invisible element to the page, 
     * to hold focus when navigating with the keyboard
     * and stop <input> keyboard interactions from triggering event listeners
     */
    function makeNavElement(){
        const nav = opts.nav
        if(!nav){
            const nav = document.createElement('div')
            nav.innerHTML = `
                <a class="next bg-btn" data-pressie="next">
                    <i class="fas fa-arrow-right"></i>
                </a>
                <a class="previous" data-pressie="previous"> previous </a> 
            `
        }
        document.body.appendChild(nav)
        nav.className = "pressie-nav"
        nav.tabIndex = "0"
        nav.addEventListener("click", (e)=>{
            if(e.target.dataset.pressie == "next"){ setSlide(state.currentSlide + 1) }
            if(e.target.dataset.pressie == "previous"){ setSlide(state.currentSlide - 1) }
        })

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
            detail: { previous: state.currentSlide, next: i }
        });

        state.currentSlide = i
        window.location.hash = i
        currentSlide.classList.remove(classes.active)
        newSlide.classList.add(classes.active)
        state.nav.dispatchEvent(event)
    }

    function nextSlide(){
        setSlide(state.currentSlide + 1)
    }

    /**
     * initialises the keyboard event listeners
     */
    function keyboardEvents(){
        // if keyboard events
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