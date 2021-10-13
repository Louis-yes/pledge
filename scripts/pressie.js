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

*************************************************************/


function pressie(md){
    const state = {
        currentSlide : Number(window.location.hash.replace("#",'')) || 0,
        length : window.deck().split('---').length - 1,
    }
    state.slides = makeSlides()

    // add nav element, to hold focus 
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
                <section class="slide index-${i} ${i == state.currentSlide ? 'active': ''} ${theme}">
                    <article>${marked(ss)}</article>
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
        window.location.hash = i
        document.querySelectorAll('.slide').forEach(el => { el.classList.remove('active') })
        document.querySelector('.index-'+i).classList.add("active")
    }

    /**
     * initialises the keyboard event listeners
     */
    function keyboardEvents(){
        const nav = makeNavElement()

        window.addEventListener('keydown', (e)=>{
            if(document.activeElement === document.body || document.activeElement === nav) {
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