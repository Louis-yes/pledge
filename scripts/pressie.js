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


function pressie(md, opts){
    const state = {
        currentSlide : Number(window.location.hash.replace("#",'')) || 0,
        length : window.deck().split('---').length - 1,
    }

    const options = {
        globalTransition : "--transition-fade"
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
        return md.split('---').map((ss,i) => {
            const themeRegex = new RegExp("(theme\=)(.+)",'g')
            let themeTest = themeRegex.exec(ss)
            let theme = themeTest ? 'theme-'+themeTest[2] : ''
            return `
                <section class="${classes.slide} ${options.globalTransition} ${classes.index}${i} ${i == state.currentSlide ? classes.active: ''} ${theme}">
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
        nav.style.opacity = 0
        nav.tabIndex = "0"
        document.body.appendChild(nav)
        return nav
    }

    /**
     * Sets active slide
     * @param {*} i index of slide to set 
     */
    function setSlide(i){
        // current active slide
        const currentSlide = document.querySelector(`.${classes.slide}.${classes.active}`)
        // slide to set
        const newSlide = document.querySelector(`.${classes.slide}.${classes.index}${i}`)
        // create event to use
        const event = new CustomEvent('pressie-slide-change', { previous: currentSlide, next: currentSlide });

        window.location.hash = i
        currentSlide.classList.remove(classes.active)
        newSlide.classList.add(classes.active)
        state.nav.dispatch(event)
    }

    /**
     * initialises the keyboard event listeners
     */
    function keyboardEvents(){
        window.addEventListener('keydown', (e)=>{
            if(document.activeElement === document.body || document.activeElement === state.nav) {
                if(e.code == "ArrowLeft"){
                    if (state.currentSlide == 0)  return 
                    state.currentSlide --
                    setSlide(state.currentSlide)
                } else if (e.code == "ArrowRight" || e.code == "Space"){
                    if (state.currentSlide == state.length)  return 
                    state.currentSlide ++
                    setSlide(state.currentSlide)
                }
            }
        })
    }
}