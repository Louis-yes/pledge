function pressie(md){
    const state = {
        currentSlide : Number(window.location.hash.replace("#",'')) || 0,
        length : window.deck().split('---').length - 1,
    }
    state.slides = makeSlides()

    // add nav element, to hold focus 
    const nav = document.createElement('div')
    nav.style.opacity = 0
    nav.tabIndex = "0"
    document.body.appendChild(nav)

    keyboardEvents()

    return state.slides
    
    function makeSlides (){
        return md.split('---').map((ss,i) => {
            const themeRegex = new RegExp("(theme\=\")(.+)(\")",'g')
            let themeTest = themeRegex.exec(ss)
            let theme = themeTest ? 'theme-'+themeTest[2] : ''
            return `
                <section class="slide index-${i} ${i == state.currentSlide ? 'active': ''} ${theme}">
                    <article>${marked(ss)}</article>
                </section>`
            })
    }

    function setSlide(i){
        window.location.hash = i
        document.querySelectorAll('.slide').forEach(el => { el.classList.remove('active') })
        document.querySelector('.index-'+i).classList.add("active")
    }

    function keyboardEvents(){
        window.addEventListener('keydown', (e)=>{
            if(document.activeElement === document.body || document.activeElement === nav) {
                if(e.code == "ArrowLeft"){
                    if (state.currentSlide == 0)  return 
                    state.currentSlide --
                    setSlide(state.currentSlide)
                } else if (e.code == "ArrowRight" || e.code == "Space"){
                    if (state.currentSlide == maxSlides)  return 
                    state.currentSlide ++
                    setSlide(state.currentSlide)
                }
    
            }
        })
    }

}