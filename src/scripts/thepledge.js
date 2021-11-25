
import { createApp, reactive } from "petite-vue"
import pressie from "./pressie.js"
// import deck from "../../content/components.js"
import { createPopper } from '@popperjs/core'
import anime from "animejs"

thePledge(document.querySelector("#app"))

function thePledge(el){
    const initialBanks = [
        new Bank({
            name: "Armadillo", 
            tokens: 10, 
            commitments: ["UNDECIDED","UNDECIDED","UNDECIDED"],
            lobbyVotes: 2
        }),
        new Bank({
            name: "Vulture", 
            tokens: 10, 
            commitments: ["UNDECIDED","UNDECIDED","UNDECIDED"],
        }),
        new Bank({
            name: "Penguin", 
            tokens: 10, 
            commitments: ["UNDECIDED","UNDECIDED","UNDECIDED"],
        }),
    ]

    const pledge = reactive({ 
        banks: initialBanks,
        regulations: [
            { name: "Carbon Credits", votes: 0, passed: false },
            { name: "Mandatory Targets", votes: 0, passed: false }
        ],
        templateBank: new Bank({name:""}),
        newBankEditor: false,
        selectedBank: 0,
        commitmentsForm: false,
        get latestBank() {
            return this.banks[this.banks.length - 1]
        },
        get initialScore(){
            return {banks:this.banks}
        },
        get roundOneScore() {
            const commits = this.banks.reduce( (pv,cv) => {
                let cc = cv.commitments[0] == "RAISE" ? 1 : 0;
                return pv + cc
            }, 0)
            const roundOneBanks = this.banks.map((cb,i) => {
                const bb = Object.assign({}, cb)
                if(commits == this.banks.length){
                    bb.tokens--
                } else if (commits == 0) {
                    return bb
                } else {
                    if(bb.commitments[0] > 0){ bb.tokens = bb.tokens - 3 } 
                    else { bb.tokens ++ }
                }
                return bb
            })
            return { 
                banks: roundOneBanks,
                totalCommits: commits
            }
        },
        get roundTwoScore() {
            const commits = this.banks.reduce( (pv,cv) => {
                let cc = cv.commitments[1] == "RAISE" ? 1 : 0;
                return pv + cc
            }, 0)
            const roundOneBanks = this.roundOneScore.banks
            const roundTwoBanks = roundOneBanks.map((cb, i) => {
                const bb = Object.assign({}, cb)
                if(commits == this.banks.length){
                    bb.tokens -= bb.commitments[0] == 0 ? 2 : 0
                    return  bb
                } else if (commits == 0){
                    return bb
                } else {
                    if(bb.commitments[1] == 0 && !bb.publicPressure){
                        bb.tokens ++
                    } else if(bb.commitments[1] == 1) {
                        bb.tokens -= 2
                        if(bb.commitments[0] == 0){
                            bb.tokens -= 2
                        }
                    }
                    return bb
                }
            })
            return {
                banks: roundTwoBanks,
                totalCommits: commits
            } 
        },
        get roundThreeScore() {
            const commits = this.banks.reduce( (pv,cv) => {
                let cc = cv.commitments[2] == "RAISE" ? 1 : 0;
                return pv + cc
            }, 0)
            const passedRegulation = this.regulations.find((r)=>{ r.passed })
            const roundThreeBanks = this.roundTwoScore.banks.map((cb, i) => {
                const bb = Object.assign({}, cb)
                if(commits == 0){ return bb }
                if( passedRegulation 
                    && passedRegulation.name == "Carbon Credits"
                    && bb.commitments[1] < 1 
                    && bb.commitments[2] > 0 )
                { bb.tokens -= 3 }
                if(commits != this.banks.length){
                    if(bb.commitments[2] > 0){
                        bb.tokens ++
                    } else {
                        bb.tokens -= 2
                    }
                }
                // same as round two atm, todo
                return bb
            })
            return {banks: roundThreeBanks, commits: commits}
        },
        get finalScore(){
            return this.roundThreeScore
        },
        addBank(bank){
            this.banks[this.banks.length] = new Bank(bank)
        },
        removeBank(i){
            this.banks.splice(i,1)
            console.log(i, this.banks)
        },
        showNewBankEditor(){
            this.newBankEditor = true
            let showEvent = new CustomEvent('animate', { 
                bubbles: true, 
                detail: {
                    element: ".add-bank-form", 
                    type: "fade-in",
                    cb: () => {}
                }
            });
            document.body.dispatchEvent(showEvent)
        }, 
        confirmNewBankEditor(){
            this.addBank({name:this.templateBank.name})
            this.dismissNewBankEditor();
        },
        dismissNewBankEditor(){
            let hideEvent = new CustomEvent('animate', { 
                bubbles: true, 
                detail: {
                    element: ".add-bank-form", 
                    type: "fade-out", 
                    cb: () => { this.newBankEditor = false } 
                }
            });
            document.body.dispatchEvent(hideEvent)
            this.templateBank.name = ""
        },
        showCommitmentsPopup(i, bank){
            this.selectedBank = bank
            this.commitmentsForm = true
            let showEvent = new CustomEvent('animate', { 
                bubbles: true, 
                detail: {
                    element: `.bank-commitment-form-${i}`, 
                    type: "fade-in",
                    cb: () => {}
                }
            });
            document.body.dispatchEvent(showEvent)
        }, 
        dismissCommitmentsPopup(i){
            let hideEvent = new CustomEvent('animate', { 
                bubbles: true, 
                detail: {
                    element: `.bank-commitment-form-${i}`, 
                    type: "fade-out", 
                    cb: () => { this.commitmentsForm = false } 
                }
            });
            document.body.dispatchEvent(hideEvent)
        },
        setAsStick(i, bank) {
            bank.commitments[i] = "STICK"
            this.dismissCommitmentsPopup(i)
        },
        setAsRaise(i, bank) {
            bank.commitments[i] = "RAISE"
            this.dismissCommitmentsPopup(i)
        }
    })

    let slideDeck = pressie(deck()).join("")
    slideDeck = insertSVGs(slideDeck)
    el.innerHTML = slideDeck
    createApp({ pledge, Countdown}).mount()
    document.querySelector(".slide.active").classList.add('visible')


    function Countdown(props) {
        return {
            time: 0,
            timer: {},
            running: false,
            get timeString(){
                return `${Math.floor(this.time / 60)}:${('0'+this.time % 60).slice(-2)}`
            },
            start() {
                this.running = true
                this.timer = setInterval(()=>{
                    if(this.time == 1) {
                        clearInterval(this.timer)
                    }
                    this.time --
                }, 1000)
            },
            mounted() {
                this.time = props.duration
            },
            reset() {
                this.running = false
                clearInterval(this.timer)
                this.time = props.duration
            }
        }
    }

    function Bank ({name, qualities, tokens, publicPressure, lobbyVotes, regulationVotes, commitments}) {
        const actions = {
            raise: 1,
            stick: 0,
        }
    
        const bnk = {}
        bnk.name = name || ""
        bnk.qualities = qualities || ""
        bnk.tokens = tokens || 6
        bnk.publicPressure = publicPressure || false
        bnk.lobbyVotes = lobbyVotes || 0
        bnk.regulationVotes = regulationVotes || 0
        bnk.actions = actions
        bnk.commitments = commitments || [
            actions.stick,
            actions.stick,
            actions.stick
        ]

        return bnk
    }
}

/* 
<div v-scope="Counter({ initialCount: 1 })" @mounted="mounted">
  <p>{{ count }}</p>
  <button @click="inc">increment</button>
</div> 
*/

const tooltips = Array.from(document.querySelectorAll("[data-tooltip]"));
if(tooltips.length > 0){
    window.tooltips = {}
    tooltips.forEach(tt => {
        const tooltip = document.querySelector(tt.dataset.tooltip)
        if(tooltip){ 
            let backdrop = document.createElement("div")
            let tclone = tooltip.cloneNode()
            backdrop.className = "tooltip-backdrop"
            tooltip.before(backdrop)
            tooltips[tt.dataset.tooltip] = createPopper(tt, tooltip, {
                modifiers: [
                  { name: 'offset', options: { offset: [0, 20], }, },
                ],
            })
        }
    })

    document.addEventListener('click', (e) => {
        if(e.target.dataset.tooltip && !e.target.classList.contains('tooltip-clone')){
            let tt = e.target
            let tooltip = document.querySelector(e.target.dataset.tooltip)
            if(!tooltip) return;
            let backdrop = tooltip.parentNode.querySelector('.tooltip-backdrop')
            e.target.classList.add('active-tooltip')
            let rect = tt.getBoundingClientRect()
            let clone = tt.cloneNode(true);
            clone.id = ""
            clone.style.position = "fixed"
            clone.style.top = rect.top + "px"
            clone.style.left = rect.left + "px"
            clone.className = "tooltip-clone"
            backdrop.parentNode.appendChild(clone)        

            anime({
                targets: [tooltip, backdrop, clone],
                opacity: ['0', '1'],
                duration: "200",
                easing: 'easeInOutQuad',
                begin: function(anim) {
                    tooltips[e.target.dataset.tooltip].update()
                    tooltip.classList.add('active')
                    backdrop.classList.add('active')
                },
                complete: function(anim) {
                }
            })
       
        }
        if(e.target.classList.contains("tooltip-backdrop")){
            let backdrop = e.target
            let tooltip =  backdrop.parentNode.querySelector('.tooltip.active')
            let activeToolTipper = document.querySelector('.active-tooltip')
            let clone = document.querySelector('.tooltip-clone')
            anime({
                targets: [backdrop, tooltip, clone],
                opacity: ['1', '0'],
                duration: "200",
                easing: 'easeInOutQuad',
                complete: function(anim) {
                    tooltip.classList.remove('active')
                    backdrop.classList.remove('active')
                    activeToolTipper.classList.remove('active-tooltip')
                    clone.remove()
                },
            })
        }
    })
}

window.addEventListener("pressie-slide-change", (e) => {
    const {previous, next} = e.detail
    if(previous && !document.body.classList.contains("animating")){
        anime({
            targets: previous,
            opacity: [previous.style.opacity || '1' , '0'],
            duration: "200",
            easing: 'easeInOutQuad',
            begin: function(anim) {
                document.body.classList.add("animating")
            },
            complete: function(anim) {
                document.body.classList.remove("animating")
                previous.classList.remove('visible')
                showCurrentSlide();
            }
        })
    }
})

window.addEventListener("animate", (e) => {
    if(e.detail.type == "fade-in"){
        console.log(e.detail.element)
        let target = document.querySelector(e.detail.element);
        let cb = e.detail.cb
        if(target){
            anime({
                targets: target,
                opacity: ['0' , '1'],
                duration: "200",
                easing: 'easeInOutQuad',
                begin: function(anim) {
                    document.body.classList.add("animating")
                },
                complete: function(anim) {
                    document.body.classList.remove("animating")
                    if(cb){cb()}
                }
            })
        }
    } else if(e.detail.type == "fade-out"){
        let target = document.querySelector(e.detail.element);
        let cb = e.detail.cb
        if(target){
            anime({
                targets: target,
                opacity: ['1' , '0'],
                duration: "200",
                easing: 'easeInOutQuad',
                begin: function(anim) {
                    document.body.classList.add("animating")
                },
                complete: function(anim) {
                    document.body.classList.remove("animating")
                    if(cb){cb()}
                }
            })
        }
    }
})

function showCurrentSlide(){
    let next = document.querySelector('.slide.active')
    anime({
        targets: next,
        duration: "200",
        opacity: ['0', '1'],
        easing: 'easeInOutQuad',
        begin: function(anim) {
            next.classList.add('visible')
        }
    })
}

function insertSVGs(string){
    let ss = string;
    const svgs = [
        [
            "<cross>", 
            `<svg xmlns="http://www.w3.org/2000/svg">
                <path d="M21.555,18.301c0.426,0.427,0.426,1.118,0,1.544l-1.711,1.711c-0.427,0.426-1.118,0.426-1.544,0l-7.363-7.363l-7.363,7.363
                c-0.426,0.426-1.117,0.426-1.543,0l-1.711-1.711c-0.426-0.426-0.426-1.117,0-1.543l7.363-7.364L0.319,3.574
                c-0.426-0.427-0.426-1.118,0-1.543l1.71-1.71c0.427-0.426,1.118-0.426,1.544,0l7.363,7.364L18.3,0.32
                c0.426-0.426,1.117-0.426,1.543,0l1.711,1.711c0.426,0.426,0.426,1.118,0,1.543l-7.363,7.364L21.555,18.301z">
            </svg>`
        ],
        [
            "<tick>",
            `<svg xmlns="http://www.w3.org/2000/svg">
                <path d="M41.547,0.343l2.762,2.763c0.458,0.457,0.458,1.199,0,1.657L15.03,34.041c-0.458,0.458-1.2,0.458-1.657,0
                L0.343,21.012c-0.458-0.458-0.458-1.2,0-1.657l2.762-2.763c0.458-0.457,1.2-0.457,1.657,0l9.439,9.438L39.89,0.343
                C40.347-0.114,41.089-0.114,41.547,0.343z"/>
            </svg>
            `
        ],
        [
            "<bank>",
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>`
        ],
        [
            "<play>",
            `
            <svg xmlns="http://www.w3.org/2000/svg""
                 width="37.5px" height="43.748px" viewBox="0 0 37.5 43.748">
            <path fill="#FFFFFF" d="M4.688,43.748C2.012,43.748,0,41.561,0,39.061V4.686C0,2.207,1.992,0,4.688,0
                c0.848,0,1.694,0.229,2.443,0.687l28.125,17.188c1.393,0.854,2.242,2.368,2.242,3.999s-0.85,3.147-2.242,3.999L7.132,43.06
                C6.387,43.514,5.537,43.748,4.688,43.748z"/>
            </svg>
            `
        ],
        [
            "<reset>",
            `
            <svg xmlns="http://www.w3.org/2000/svg"
                width="46.875px" height="46.875px" viewBox="0 0 46.875 46.875">
            <path fill="#FFFFFF" d="M43.505,30.645C40.673,39.42,32.574,45.312,23.35,45.312c-6.885,0-13.203-3.369-17.1-8.798v7.235
                c0,1.728-1.399,3.125-3.125,3.125S0,45.478,0,43.75V29.688c0-1.728,1.399-3.125,3.125-3.125h12.5c1.726,0,3.125,1.397,3.125,3.125
                s-1.399,3.125-3.125,3.125h-4.336c2.749,3.853,7.217,6.25,12.148,6.25c6.503,0,12.216-4.15,14.208-10.333
                c0.529-1.639,2.283-2.542,3.936-2.011C43.222,27.158,44.13,29.004,43.505,30.645z M46.875,3.125v14.062
                c0,1.728-1.398,3.125-3.125,3.125h-12.5c-1.725,0-3.125-1.397-3.125-3.125s1.4-3.125,3.125-3.125h4.336
                c-2.748-3.853-7.217-6.25-12.148-6.25c-6.504,0-12.217,4.15-14.21,10.341c-0.529,1.639-2.286,2.548-3.936,2.011
                c-1.642-0.527-2.544-2.292-2.013-3.934C6.112,7.455,14.209,1.562,23.438,1.562c6.972,0,13.291,3.371,17.187,8.798V3.125
                c0-1.728,1.4-3.125,3.125-3.125C45.478,0,46.875,1.397,46.875,3.125z"/>
            </svg>
            `
        ],
        [
            "<dollar>",
            `
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="80px" height="80px" viewBox="0 0 80 80">
            <path d="M80,40c0,22.094-17.906,40-40,40S0,62.094,0,40S17.906,0,40,0S80,17.906,80,40z M40.95,36.36l-1.294-0.344
                c-6.234-1.688-6.047-2.641-5.847-3.881c0.348-1.862,3.886-2.785,8.199-2.175c1.124,0.164,2.544,0.522,4.346,1.096
                c1.979,0.642,4.088-0.456,4.713-2.431c0.629-1.974-0.46-4.083-2.432-4.712c-1.932-0.618-3.478-0.996-4.88-1.241V20
                c0-2.07-1.68-3.75-3.75-3.75s-3.75,1.68-3.75,3.75v2.694c-5.271,0.842-8.982,3.759-9.819,8.203
                c-1.661,8.866,7.388,11.319,11.25,12.369l1.351,0.354c6.867,1.813,7.434,2.604,7.153,4.105c-0.352,1.863-3.885,2.791-8.224,2.174
                c-1.749-0.244-3.9-0.96-5.794-1.592l-1.003-0.332c-1.979-0.643-4.089,0.426-4.731,2.396c-0.646,1.967,0.43,4.084,2.396,4.73
                l0.967,0.32c2.006,0.67,4.254,1.375,6.459,1.756V60c0,2.07,1.68,3.75,3.75,3.75s3.75-1.68,3.75-3.75v-2.683
                c5.262-0.844,8.966-3.769,9.8-8.208C55.234,40.141,46.297,37.781,40.95,36.36z"/>
            </svg>
            `
        ],
        [
            "<arrow>",
            `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44px" height="44px" viewBox="0 0 44 44">
                <path d="M22.956,0.344l20.451,20.45c0.457,0.458,0.457,1.2,0,1.657L22.956,42.902c-0.457,0.457-1.199,0.457-1.657,0
                    l-1.934-1.934c-0.457-0.458-0.457-1.2,0-1.657l15.149-15.149H1.172C0.524,24.162,0,23.637,0,22.99v-2.734
                    c0-0.647,0.524-1.172,1.172-1.172h33.343L19.365,3.935c-0.457-0.458-0.457-1.2,0-1.657l1.934-1.934
                    C21.757-0.114,22.499-0.114,22.956,0.344z"/>
            </svg>
            `
        ],
        [
            "<building>",
            `
            <svg xmlns="http://www.w3.org/2000/svg" width="37.5px" height="50px" viewBox="0 0 37.5 50" >
            <path d="M32.812,0C35.4,0,37.5,2.1,37.5,4.688v40.625C37.5,47.9,35.4,50,32.812,50h-9.375v-7.812c0-2.588-2.1-4.688-4.688-4.688
                s-4.688,2.1-4.688,4.688V50H4.688C2.099,50,0,47.9,0,45.312V4.688C0,2.1,2.099,0,4.688,0H32.812z M7.812,9.375
                c-0.863,0-1.562,0.703-1.562,1.562v3.125c0,0.859,0.699,1.562,1.562,1.562h3.125c0.859,0,1.562-0.703,1.562-1.562v-3.125
                c0-0.859-0.703-1.562-1.562-1.562H7.812z M6.25,26.562c0,0.859,0.699,1.562,1.562,1.562h3.125c0.859,0,1.562-0.703,1.562-1.562
                v-3.125c0-0.859-0.703-1.562-1.562-1.562H7.812c-0.863,0-1.562,0.703-1.562,1.562V26.562z M15.625,14.062
                c0,0.859,0.703,1.562,1.562,1.562h3.125c0.859,0,1.562-0.703,1.562-1.562v-3.125c0-0.859-0.703-1.562-1.562-1.562h-3.125
                c-0.859,0-1.562,0.703-1.562,1.562V14.062z M17.188,21.875c-0.859,0-1.562,0.703-1.562,1.562v3.125c0,0.859,0.703,1.562,1.562,1.562
                h3.125c0.859,0,1.562-0.703,1.562-1.562v-3.125c0-0.859-0.703-1.562-1.562-1.562H17.188z M26.562,9.375
                c-0.859,0-1.562,0.703-1.562,1.562v3.125c0,0.859,0.703,1.562,1.562,1.562h3.125c0.859,0,1.562-0.703,1.562-1.562v-3.125
                c0-0.859-0.703-1.562-1.562-1.562H26.562z M25,26.562c0,0.859,0.703,1.562,1.562,1.562h3.125c0.859,0,1.562-0.703,1.562-1.562
                v-3.125c0-0.859-0.703-1.562-1.562-1.562h-3.125c-0.859,0-1.562,0.703-1.562,1.562V26.562z"/>
            </svg>
            `
        ],
        [
            "<plant>",
            `
            <svg xmlns="http://www.w3.org/2000/svg"  width="50px" height="43.75px" viewBox="0 0 50 43.75">
            <path d="M28.125,28.125v12.5c0,1.719-1.582,3.125-3.213,3.125s-3.037-1.406-3.037-3.213v-12.5C9.795,28.037,0,18.252,0,6.162h6.25
                C18.33,6.162,28.125,16.045,28.125,28.125z M50,0c0,11.318-8.594,20.615-19.609,21.758c-1.05-3.967-3.052-7.557-5.762-10.498
                C28.379,4.541,35.522,0,43.75,0H50z"/>
            </svg>
            
            `
        ],
        [
            "<question>",
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>`
        ]
    ]

    svgs.forEach((svg)=> {
        ss = ss.replaceAll(svg[0],svg[1])
    })

    return ss
}

function getSVG(string){
    
}