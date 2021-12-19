/************************

    - bank image selector
    - announcement screen
    - change slide change to vue function
    - change next button to vue component

***********************/



import { createApp } from "vue"
import pressie from "./pressie.js"
import { createPopper } from '@popperjs/core'

thePledge(document.querySelector("#app"))

function thePledge(el){
    const initialBanks = [
        new Bank({
            name: "Armadillo", 
            tokens: 10, 
            commitments: ["UNDECIDED","UNDECIDED","UNDECIDED"],
            // investments: {
            //     behemoss: 1,
            //     concredible: 0
            // }
        }),
        new Bank({
            name: "Vulture", 
            tokens: 10, 
            commitments: ["UNDECIDED","UNDECIDED","UNDECIDED"],
            // investments: {
            //     behemoss: 1,
            //     concredible: 1
            // }
        }),
        new Bank({
            name: "Penguin", 
            tokens: 10, 
            commitments: ["UNDECIDED","UNDECIDED","UNDECIDED"],
            // investments: {
            //     behemoss: 2,
            //     concredible: 1
            // }
        }),
        // new Bank({
        //     name: "Tiger", 
        //     tokens: 10, 
        //     commitments: ["RAISE","UNDECIDED","UNDECIDED"],
        // }),
    ]
    const regulations = {
        green: "GREENSUBSIDIES",
        credits: "ENHANCECREDITGUIDANCE"
    }

    const pledge = { 
        data () {
            return {
                banks: initialBanks,
                regulations: [
                    { name: "Carbon Credits", votes: 0, passed: false },
                    { name: "Mandatory Targets", votes: 0, passed: false }
                ],
                templateBank: new Bank({name:""}),
                newBankEditor: false,
                selectedBank: 0,
                commitmentsForm: false, 
                activeSlide: Number(window.location.hash.replace("#",'')) || 0
            }
        },
        computed: {
            latestBank() {
                return this.banks[this.banks.length - 1]
            },
            initialScore() {
                return {banks:this.banks}
            },
            score() {
                let banks = this.banks.map((bb, i, bbb) => {
                    const bank = Object.assign({}, bb)
                    bank["Initial Score"] = {score: bank.tokens }
                    bank.rounds = [
                        getRoundOneScore(bank, bbb),
                        getRoundTwoScore(bank, bbb),
                        getRoundThreeScore(bank, bbb)
                    ]
                    bank["Interstitial A"] = getInterstitialAScore(bank, bbb)
                    bank["Interstitial B"] = getInterstitialBScore(bank, bbb)
                    bank["Final Score"] = getFinalScore(bank, bbb)
                    return bank
                })
                let commitments = [
                    totalCommitments(0, this.banks),
                    totalCommitments(1, this.banks),
                    totalCommitments(2, this.banks)
                ]

                // let rounds = [
                //     "Initial Score",
                //     "Round 1",
                //     "Interstitial A",
                //     "Round 2",
                //     "Interstitial B",
                //     "Round 3",
                //     "Final Score"
                // ]

                let totalCommits = (this.banks.length * 3) / this.banks.reduce(
                    (pp,cc) => {
                        return pp += cc.commitments.reduce((pv,cv) => {
                            return pv += cv == "RAISE" ? 1 : 0
                        }, 0)
                    }
                ,0)

                return {
                    banks: banks,
                    commitments: commitments,
                    totalCommitments: totalCommits,
                    winningRegulation: getWinningRegulation(banks)
                }
            }
        },
        created: function() {
            window.addEventListener('pressie-slide-change', this.changeSlides);
        },
        methods : {
            changeSlides(e){
                this.activeSlide = -1
                setTimeout(() => {
                    this.activeSlide = e.detail.next
                }, 100)
            },
            addBank(bank){
                this.banks[this.banks.length] = new Bank(bank)
            },
            removeBank(i){
                this.banks.splice(i,1)
            },
            setCommitment(round, bank, commitment){
                this.banks[bank].commitments[round] = commitment
            },
            setInvestment(investments, index){
                this.banks[index].investments.concredible = investments.concredible
                this.banks[index].investments.behemoss = investments.behemoss
            }
        }
    }

    let prz = pressie(deck(), {slideTemplate, nav: document.createElement('nav')})
    let slideDeck = prz.slides.join("")
    el.innerHTML = slideDeck
    const app = createApp(pledge)

    function slideTemplate(cc, ii, classes, attrs) {
        return `
            <transition name="slide-fade">
                <section v-show="${ii} == activeSlide" class="${classes}" ${attrs}>
                        <article>${cc}</article>
                </section>
            </transition>
            `
    }

    app.component('countdown', {
        props: ['duration'],
        data () {
            return {
                time: 0,
                timer: {},
                running: false
            }
        },
        computed: {
            timeString(){
                return `${Math.floor(this.time / 60)}:${('0'+this.time % 60).slice(-2)}`
            }
        },
        methods: {
            start() {
                this.running = true
                this.timer = setInterval(()=>{
                    if(this.time == 1) {
                        clearInterval(this.timer)
                    }
                    this.time --
                }, 1000)
            },
            reset() {
                this.running = false
                clearInterval(this.timer)
                this.time = this.duration
            }
        },
        mounted() {
            this.time = this.duration
        },
        template: `
        <div class="countdown">
            <div class="btn bg-orange white" v-if="!running" @click="start"><i class="fas fa-play"></i></div>
            <div class="btn bg-orange white" v-else @click="reset"><i class="fas fa-sync-alt"></i></div>
            <p class="time-string">{{ timeString }}</p>
        </div> `
    })

    app.component('bankintro', {
        props: ["banks"],
        emits: ["addBank", "removeBank"],
        data(){
            return {
                newBankEditor: false,
                templateBank: new Bank({ name: "" , tokens: 10 })
            }
        },
        methods: {
            showNewBankEditor(){
                this.newBankEditor = true
                this.templateBank.name = ""
            },
            dismissNewBankEditor(){
                this.newBankEditor = false
            },
            submitNewBankEditor(){
                this.$emit('addBank', this.templateBank)
                this.dismissNewBankEditor()
            },
            removeBank(i) {
                this.$emit('removeBank', i)
            }
        },
        template: `
        <div>
            <div v-if="banks.length < 1" class="no-banks">
                <span class="instruction">Click to add bank.</span>
                <div class="add-bank btn bg-green white" @click="showNewBankEditor">+</div>
            </div>
            <div v-else class="banks">
                <div class="bank" v-for="(bank,i) in banks" :key="i">
                    <div class="avatar"></div>
                    <p> {{bank.name}} </p>
                    <span class="token-count">
                        <span v-if="bank.tokens > 0" class="positive">
                            <span class="token-text">
                            {{bank.tokens}} {{ banks.tokens > 1 ? 'token' : 'tokens' }}  </span>
                            <span v-for="t in bank.tokens" :key="t" class="token">.</span>
                        </span>
                        <span v-else class="negative token-text">
                            {{bank.tokens}}
                        </span>
                    </span>
                    <span @click="removeBank(i)" class="remove">
                        <i class="fa fa-times"></i>
                    </span>
                </div>
                <div class="add-bank btn bg-green white" @click="showNewBankEditor">+</div>
            </div>
            <transition name="slide-fade">
                <div class="bank-action-form" v-show="newBankEditor" v-on:click.self="dismissNewBankEditor">
                    <form v-on:submit.prevent="submitNewBankEditor">
                        <label for="bankname">What's your animal?</label>
                        <input id="bankname" v-model="templateBank.name" placeholder="" class="input">
                        <div class="bank-ok btn" @click="submitNewBankEditor"><i class="fa fa-check white"></i></div>
                    </form>
                </div>
            </transition>
        </div>
        `
    })

    app.component("commitments", {
        props: ["banks", "round", "score"],
        data(){
            return {
                bankCommitmentForm: false,
                selectedBank: 0
            }
        },
        computed: {
        },
        methods: {
            showBankCommitmentForm(i) {
                this.selectedBank = i
                this.bankCommitmentForm = true
            },
            dismissBankCommitmentForm(){
                this.bankCommitmentForm = false
            },
            commit(cc){
                this.$emit('commit', this.round, this.selectedBank, cc)
                this.dismissBankCommitmentForm()
            }
        },
        template: `
        <div class="commitments actions">
            <div class="bank" v-for="(bank,i) in banks" :key="i">
                <div :class="['commitment', bank.commitments[round]]">
                    <div v-if="bank.commitments[round] == 'RAISE'" class="raise">
                        <i class="fa fa-arrow-up">
                    </div>
                    <div v-if="bank.commitments[round] == 'STICK'" class="stick">
                        <i class="fa fa-arrow-down">
                    </div>
                    <div v-if="bank.commitments[round] == 'UNDECIDED'" class="undecided btn white bg-green" @click="showBankCommitmentForm(i)">
                        <i class="fa fa-question">
                    </div>
                </div>
                <div class="avatar"><bank></div>
                <p> {{bank.name}} Bank<p>
                <ul v-if="score.commitments[round] != 'UNDECIDED'">
                    <li v-for="m in score.banks[i].rounds[round].messages" :key="i">
                        {{m}}
                    </li>
                </ul>
            </div>
            <transition name="slide-fade">
                <div class="bank-action-form bank-action-form-0" v-show="bankCommitmentForm" @click.self="dismissBankCommitmentForm">
                    <form class="inner-content">
                        What did {{banks[selectedBank].name}} Bank do?
                        <div class="options">
                            <div class="stick" @click="commit('STICK')"> <span class="label">stick</span><span class="btn"><i class="fa fa-arrow-down"></i></span></div>
                            <div class="raise" @click="commit('RAISE')"> <span class="label">raise</span><span class="btn"><i class="fa fa-arrow-up"></i></span></div>
                        </div>
                    </form>
                </div>
            </transition>
        </div>
        `
    })

    app.component("investments", {
        props: ["banks"],
        data(){
            return {
                bankForm: false,
                selectedBank: 0,
                investments: {concredible: 0, behemoss: 0}
            }
        },
        computed: {
        },
        methods: {
            showBankForm(i) {
                this.selectedBank = i
                this.investments.concredible = 0
                this.investments.behemoss = 0
                this.bankForm = true
            },
            dismissBankForm(){
                this.bankForm = false
            },
            invest(cc){
                this.$emit('invest', this.investments, this.selectedBank, cc)
                this.dismissBankForm()
            }
        },
        template: `
        <div class="investments actions">
            <div class="bank" v-for="(bank,i) in banks" :key="i">
                <div :class="['commitment', bank.commitments[round]]">
                    <div 
                        v-if="bank.investments.concredible == 'UNDECIDED' || bank.investments.behemoss == 'UNDECIDED'" 
                        class="undecided btn white bg-green" 
                        @click="showBankForm(i)"
                    >
                        <i class="fa fa-question">
                    </div>
                    <div v-else>
                        <div><i class="fa fa-building orange"></i><span>{{bank.investments.concredible}}</span></div>
                        <div><i class="fa fa-seedling green"></i><span>{{bank.investments.behemoss}}</span></div>
                    </div>
                </div>
                <div class="avatar"><bank></div>
                <p> {{bank.name}} Bank<p>
            </div>
            <transition name="slide-fade">
                <div class="bank-action-form" v-show="bankForm" @click.self="dismissBankForm">
                    <form class="inner-content" v-on:submit="invest">
                        What did {{banks[selectedBank].name}} Bank invest?
                        <div class="investments">
                            <div><i class="fa fa-building orange"></i><input type="number" v-model="investments.concredible"></div>
                            <div><i class="fa fa-seedling green"></i><input type="number" v-model="investments.behemoss"/></div>
                        </div> 
                        <div class="bank-ok btn" v-if="typeof investments.behemoss == 'number' && typeof investments.concredible == 'number' " @click="invest"><i class="fa fa-check white"></i></div>
                        <div class="bank-ok btn disabled" v-else><i class="fa fa-check white"></i></div>
                    </form>
                </div>
            </transition>
        </div>
        `
    })

    app.component("ally-results", {
        props: ["banks"],
        template: `
            <div class="ally-results actions">
                <div class="bank" v-for="(bank,i) in banks" :key="i">
                    <div :class="[bank.publicPressure ? 'bg-green':'bg-red', 'btn']" v-on:click="bank.publicPressure = !bank.publicPressure">
                        <i class="fa fa-solid fa-handshake" />
                    </div>
                    <div class="avatar"><bank></div>
                    <p> {{bank.name}} Bank<p>
                </div>
            </div>
        `
    })

    app.component("regulation-votes", {
        props: ["banks"],
        methods: {
            vote(b,i){
                if(i == 0){
                    this.banks[b].lobbyVotes.greensubsidies = 1
                    this.banks[b].lobbyVotes.enhancedcreditguidance = 0
                } else {
                    this.banks[b].lobbyVotes.greensubsidies = 0
                    this.banks[b].lobbyVotes.enhancedcreditguidance = 1
                }
            }
        },
        template: `
            <div class="regulation-votes actions">
                <div class="bank" v-for="(bank,i) in banks" :key="i">
                    <div class="avatar"><bank></div>
                    <p> {{bank.name}} Bank<p>
                    <div class="vote" v-if="typeof bank.lobbyVotes.greensubsidies != 'number'" v-on:click="vote(i,0)">
                        Green Subsidies
                    </div>
                    <div class="vote" v-else-if="bank.lobbyVotes.greensubsidies > bank.lobbyVotes.enhancedcreditguidance" v-on:click="bank.lobbyVotes.greensubsidies++" >
                        Green Subsidies {{bank.lobbyVotes.greensubsidies}}
                        <span class="add-more">+</span>
                    </div>
                    <div class="vote" v-if="typeof bank.lobbyVotes.enhancedcreditguidance != 'number'" v-on:click="vote(i,1)">
                        Enhanced Credit Guidance
                    </div>
                    <div class="vote" v-else-if="bank.lobbyVotes.enhancedcreditguidance > bank.lobbyVotes.greensubsidies" v-on:click="bank.lobbyVotes.enhancedcreditguidance++" >
                        Enhanced Credit Guidance {{bank.lobbyVotes.enhancedcreditguidance}}
                        <span class="add-more">+</span>
                    </div>
                </div>
            </div>
        `
    })

    app.component("ally-pause", {
        props: ["banks"],
        data(){
            return {
                activeBank : 0
            }
        },
        methods: {
            nextSlide(e){
                if(this.activeBank < this.banks.length-1) {
                    this.activeBank ++
                } else {
                    prz.controls.nextSlide()
                    window.setTimeout(() => {
                        this.activeBank = 0
                    }, 300)
                }
            }
        },
        template: `
            <div v-on:nextSLide>
                <div class="title">{{banks[activeBank].name}} Bank</div>
                <div>
                    Employees of {{banks[activeBank].name}} Bank, you have 5 seconds to privately message ALLY.
                </div>
            </div>
            <div :class="[disabled ? 'disabled' : '', 'pressie-nav']">
                <span class="text" ><slot></slot></span>
                <a class="next btn" data-pressie="next" v-on:click="nextSlide">
                    <i class="fas fa-arrow-right"></i>
                </a>
                <a class="previous" data-pressie="previous"> previous </a> 
            </div>
        `
    })

    app.component("tooltip-for", {
        props: ["el"],
        data(){
            return {
            }
        },
        computed: {
        },
        methods: {
            toggleToolTip(){
                let cc = document.querySelector(this.el)
                if(cc){cc.click()}
            }
        },
        template: `
            <span class="tooltip-for" @click="toggleToolTip" :data-el="el">
                <slot></slot>
            </span>
        `
    })

    app.component("tooltip", {
        props: ["id"],
        data(){
            return {
                visible: false,
                clone: "",
                top: "",
                left: ""
            }
        },
        computed: {
        },
        methods: {
            showMe(){
                if(this.visible){
                    this.visible = false
                } else {
                    let tt = document.querySelector("[data-el='#"+this.id+"']")
                    let rect = tt.getBoundingClientRect()
                    let clone = tt.cloneNode(true)
                    this.visible = true
                    this.top = rect.top + "px"
                    this.left = rect.left + "px"
                    this.clone = clone.innerHTML
                    this.tt.update()    
                }
            }
        },
        mounted(){
            let tt = document.querySelector("[data-el='#"+this.id+"']")
            let tooltip = document.querySelector("#"+this.id + " .content")
            this.tt = createPopper(tt, tooltip, {
                modifiers: [
                  { name: 'offset', options: { offset: [0, 20], }, },
                ]
            })
        },
        template: `
        <transition name="slide-fade">
            <div :id="id" v-show="visible" @click="showMe" class="tooltip backdrop">
                <div class="clone" :style="'top:'+ top + '; left:' + left +';'">{{clone}}</div>
                <div class="tooltip content">
                    <slot></slot>
                </div>
            </div>
        </transition>
        `
    })

    app.component('next', {
        props: ["disabled"],
        data(){
            return {}
        },
        methods: {
            nextSlide(){
                if(!this.disabled) {
                    prz.controls.nextSlide()
                }
            }
        },
        template: `
        <div :class="[disabled ? 'disabled' : '', 'pressie-nav']">
            <span class="text" ><slot></slot></span>
            <a class="next btn" data-pressie="next" v-on:click="nextSlide">
                <i class="fas fa-arrow-right"></i>
            </a>
            <a class="previous" data-pressie="previous"> previous </a> 
        </div>
        `
    })

    app.component('scoreboard', {
        props: ["score", "rounds", "banks"],
        data(){
            return {
                active: this.rounds[this.rounds.length - 1]
            }
        },
        template: `
            <div class="scoreboard">
                <table>
                    <tr>
                        <th></th>
                        <th v-for="(b,i) in score.banks" :key="i">
                            {{b.name}} Bank
                        </th>
                    </tr>
                    <tr>
                        <td>Initial Score</td>
                        <td v-for="(b,i) in score.banks" :key="i">{{b['Initial Score'].score}}</td>
                    </tr>
                    <tr :class="active == 'Round 1'? 'active' : ''">
                        <td>Round 1</td>
                        <td v-for="(b,i) in score.banks" :key="i"><span v-if="rounds.indexOf('Round 1') > 0">
                             <i class='raise fa fa-arrow-up' v-if="banks[i].commitments[0] == 'RAISE'"></i>
                             <i class='stick fa fa-arrow-down' v-else></i>
                            {{b.rounds[0].score}}
                            </span></td>
                    </tr>
                    <tr :class="active == 'Interstitial A' ? 'active' : ''">
                        <td>Interstitial A</td>
                        <td v-for="(b,i) in score.banks" :key="i"><span v-if="rounds.indexOf('Interstitial A') > 0">{{b['Interstitial A'].score}}</span></td>
                    </tr>
                    <tr :class="active == 'Round 2'? 'active' : ''">
                        <td>Round 2</td>
                        <td v-for="(b,i) in score.banks" :key="i">
                        <span v-if="rounds.indexOf('Round 2') > 0" >
                        <i class='raise fa fa-arrow-up' v-if="banks[i].commitments[1] == 'RAISE'"></i>
                        <i class='stick fa fa-arrow-down' v-else></i>
                        {{b.rounds[1].score}}</span></td>
                    </tr>
                    <tr :class="active == 'Interstitial B' ? 'active' : ''">
                        <td>Interstitial B</td>
                        <td v-for="(b,i) in score.banks" :key="i"><span v-if="rounds.indexOf('Interstitial B') > 0" >{{b['Interstitial B'].score}}</span></td>
                    </tr>
                    <tr :class="active == 'Round 3'? 'active' : ''">
                        <td>Round 3</td>
                        <td v-for="(b,i) in score.banks" :key="i">
                        <span v-if="rounds.indexOf('Round 3') > 0">
                        <i class='raise fa fa-arrow-up' v-if="banks[i].commitments[2] == 'RAISE'"></i>
                        <i class='stick fa fa-arrow-down' v-else></i>
                       {{b.rounds[2].score}}<span></td>
                    </tr>
                    <tr>
                        <td>Final Score</td>
                        <td v-for="(b,i) in score.banks" :key="i" v-if="rounds.indexOf('Final Score') > 0">{{b['Final Score'].score}}</td>
                    </tr>
                </table>
            </div>
        `
    })

    app.mount(el)

    function Bank ({name, qualities, tokens, publicPressure, investments, commitments}) {
        const actions = {
            raise: "RAISE",
            stick: "STICK",
            undecided: "UNDECIDED"
        }
    
        const bnk = {}
        bnk.name = name || ""
        bnk.qualities = qualities || ""
        bnk.tokens = tokens || 10
        bnk.publicPressure = publicPressure || false
        bnk.lobbyVotes = {
            greensubsidies: actions.undecided,
            enhancedcreditguidance: actions.undecided
        }
        bnk.investments = investments || {
            concredible : actions.undecided,
            behemoss: actions.undecided
        }
        bnk.actions = actions
        bnk.commitments = commitments || [
            actions.undecided,
            actions.undecided,
            actions.undecided
        ]

        return bnk
    }

    function getRoundOneScore(bank, banks){
        // get total commits, for utility
        const commits = banks.reduce( (pv,cv) => {
            let cc = cv.commitments[0] == "RAISE" ? 1 : 0
            return pv + cc
        }, 0)

        let messages = []
        let score = bank.tokens

        if(commits == banks.length){ // if all banks committed
            score -= 1
            messages.push("-1 token")
        } else if (commits == 0) { // if no banks committed
            score = score // no change
        } else {
            if(bank.commitments[0] == "RAISE"){ // if this bank raised
                score -= 3 
                messages.push("-2 tokens")
                messages.push("-1 token (transition cost)")
            } else { // this bank didnt raise
                score += 1
                messages.push("+1 token")
            }
        }
        return { 
            score: score,
            messages: messages
        }
    }
    
    function getInvestmentScore(bank, banks) {
        let score = getRoundOneScore(bank, banks).score
        score -= bank.investments.concredible
        score -= bank.investments.behemoss
        return { score: score }
    }

    function getAllyScore(bank, banks) {
        let score = getInvestmentScore(bank, banks).score 
        score = bank.publicPressure ? score - 1 : score // was their any public pressure?
        return { score: score }
    }

    function getInterstitialAScore(bank, banks){
        return getAllyScore(bank, banks)
    }

    function getRoundTwoScore(bank, banks) {
        const commits = banks.reduce( (pv,cv) => {
            let cc = cv.commitments[1] == "RAISE" ? 1 : 0;
            return pv + cc
        }, 0)
        // change this reference ally score
        let score = getAllyScore(bank, banks).score 
        let messages = []
        if(commits == banks.length){ // if all raised
            score -= bank.commitments[0] == "STICK" ? 2 : 0 // if bank stuck before
            messages.push("-2 tokens (transition cost)")
        } else if (commits == 0){ // if no raise
            score = score
        } else {
            if(bank.commitments[1] == "STICK"){
                score += 1
                messages.push("+1 token")
            } else { // if raised
                score -= 2
                messages.push("-2 tokens")
                if(bank.commitments[0] == "STICK"){ // if bank stuck before
                    score -= 2
                    messages.push("-2 tokens (transition cost)")
                }
            }
        }
        return {
            score: score,
            messages: messages
        }
    }

    function getVotingScore(bank, banks) {
        let score = getRoundTwoScore(bank, banks).score
        score -= bank.lobbyVotes.greensubsidies
        score -= bank.lobbyVotes.enhancedcreditguidance
        score += 1 // free vote
        return { score: score }
    }

    function getInterstitialBScore(bank, banks) {
        return getVotingScore(bank, banks)
    }

    function getRoundThreeScore(bank, banks) {
        const commits = banks.reduce( (pv,cv) => {
            let cc = cv.commitments[2] == "RAISE" ? 1 : 0;
            return pv + cc
        }, 0)

        let score = getVotingScore(bank, banks).score
        let messages = []

        if(commits == 0 || commits == banks.length){  
            // do nothing
        } else {
            if(bank.commitments[2] == "RAISE"){
                score -= 2
                messages.push("-2 tokens")
            } else {
                score += 1
                messages.push("+1 token")
            }
        }
        // do regulation thing
        if(getWinningRegulation(banks) === regulations.green){
            if(bank.commitments[1] == "STICK" && bank.commitments[2] == "RAISE"){
                score -= 3
                messages.push("-3 tokens (transition cost)")
            }
        }
        return {score: score, messages: messages}
    }

    function getFinalScore(bank, banks) {
        let score = getRoundThreeScore(bank, banks).score
        if(bank.publicPressure){
            score += 2
        }
        // investment
        return {score: score}
    }

    function totalCommitments(i, banks){ 
        let ll = 0
        banks.forEach(b => {
            let cc = b.commitments[i]
            if(cc == "UNDECIDED" || ll == "UNDECIDED"){
                ll = "UNDECIDED"
            } else {
                ll += cc == "RAISE" ? 1 : 0
            }
        })
        if(ll == "UNDECIDED") {
            return "UNDECIDED"
        } else {
            return ll
        }
    }

    function getWinningRegulation(banks){
        const votes = banks.reduce( (pv,cv) => {
            pv.green += cv.lobbyVotes.greensubsidies
            pv.credits += cv.lobbyVotes.enhancedcreditguidance
            return pv
        }, {green: 0, credits: 0})
        return votes.green > votes.credits ? regulations.green : regulations.credits 
    }
}
