/************************

    - bank image selector
    - announcement screen
    - change slide change to vue function
    - change next button to vue component

***********************/


thePledge(document.querySelector("#app"))

function thePledge(el){
    const initialBanks = [
        new Bank({
            name: "Armadillo", 
            avatar: "fa-galaxy",
            slogan: "Curl up and stay safe",
            tokens: 10, 
            commitments: ["RAISE","RAISE","RAISE"],
            investments: {
                behemoss: 1,
                concredible: 0
            },
            lobbyVotes: {
              greensubsidies : 0,
              enhancedcreditguidance: 2
            },
            publicPressure: true
        }),
        new Bank({
            name: "Vulture",
            avatar: 'fa-skull-cow', 
            slogan: "Do whats necessary, not what's popular",
            tokens: 10, 
            commitments: ["STICK","STICK","STICK"],
            investments: {
                behemoss: 1,
                concredible: 1
            },
            lobbyVotes: {
                greensubsidies : 1,
                enhancedcreditguidance: 0
            },
        }),
        new Bank({
            name: "Penguin", 
            avatar: 'fa-egg',
            slogan: "Huddle up and wait out the winter",
            tokens: 10, 
            commitments: ["STICK", "RAISE", "RAISE"],
            investments: {
                behemoss: 2,
                concredible: 1
            },
            lobbyVotes: {
                greensubsidies : 2,
                enhancedcreditguidance: 0
            }
        })
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
                activeSlide: Number(window.location.hash.replace("#",'')) || 0,
                randoms: [Math.random(), Math.random()]
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
                    bank["Final Score"] = getFinalScore(bank, bbb, this.investments)
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

                let totalCommits = 0
                this.banks.forEach(bb => {
                    totalCommits += bb.commitments.filter(cc => cc == "RAISE").length
                })

                let percentageCommits = ( totalCommits
                    + (this.investments.behemoss.successful ? 1 : 0) 
                    + (this.investments.concredible.successful ? 1 : 0)) / (banks.length * commitments.length)

                console.log(( totalCommits
                    + (this.investments.behemoss.successful ? 1 : 0) 
                    + (this.investments.concredible.successful ? 1 : 0)))
                console.log(percentageCommits)

                let degrees =   percentageCommits < 0.26 ? 3.5 :
                                percentageCommits < 0.51 ? 3 : 
                                percentageCommits < 0.76 ? 2 :
                                1.5;

                return {
                    banks: banks,
                    commitments: commitments,
                    totalCommitments: totalCommits,
                    winningRegulation: getWinningRegulation(banks),
                    degrees: degrees
                }
            },
            investments(){

                let behemossTokens = this.banks.reduce((pp,cc) => {
                    return pp + cc.investments.behemoss
                }, 0)
                let concredibleTokens = this.banks.reduce((pp,cc) => {
                    return pp + cc.investments.concredible
                }, 0)

                let behemossSuccessPercent = (1 + 1 * behemossTokens) / 10
                let concredibleSuccessPercent = (1 + 1 * concredibleTokens) /10

                let behemossSuccess = this.randoms[0] < behemossSuccessPercent
                let concredibleSuccess = this.randoms[1] < concredibleSuccessPercent

                return {
                    concredible: {successful: concredibleSuccess, funded: concredibleSuccessPercent, random: this.randoms[0]},
                    behemoss: {successful: behemossSuccess, funded: behemossSuccessPercent, random: this.randoms[1]}
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

    app.component('miniscore', {
        props: ["score", "round"],
        template: `
            <table class="miniscore" v-if="score.banks[i]">
                <tr class="bank" v-for="(b,i) in score.banks" :key="i">
                    <td><i :class="['fa', b.avatar]"></i></td><td> {{round >= 0 ? score.banks[i].rounds[round].score : score.banks[i][round].score}}</td>
                </tr>
            </table>
        `
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
                this.templateBank.slogan = ""
            },
            dismissNewBankEditor(){
                this.newBankEditor = false
            },
            submitNewBankEditor(){
                this.templateBank.avatar = avatars()[Math.floor(Math.random() * avatars().length)]
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
                <div class="add-bank btn bg-green white" @click="showNewBankEditor"><i class="fa fa-plus white"></i></div>
            </div>
            <div v-else class="banks">
                <div class="bank" v-for="(bank,i) in banks" :key="i">
                    <div class="avatar"><i :class="['fa-light', bank.avatar]"></i></div>
                    <p> {{bank.name}} Bank </p>
                    <em class="slogan">&#8220{{bank.slogan}}&#8221</em>
                    <span @click="removeBank(i)" class="remove">
                        <i class="fa fa-times"></i>
                    </span>
                </div>
                <div class="add-bank btn bg-green white" @click="showNewBankEditor"><i class="fa fa-plus"></i></div>
            </div>
            <transition name="slide-fade">
                <div class="bank-action-form" v-show="newBankEditor" v-on:click.self="dismissNewBankEditor">
                    <form v-on:submit.prevent="submitNewBankEditor">
                        <label for="bankname">What's your animal?</label>
                        <input id="bankname" v-model="templateBank.name" placeholder="" class="input">
                        <label for="bankname">What's your slogan?</label>
                        <input id="bankslogan" v-model="templateBank.slogan" placeholder="" class="input">
                        <button class="bank-ok btn"><i class="fa fa-check white"></i></button>
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
                        <i class="fa fa-arrow-up"></i>
                    </div>
                    <div v-if="bank.commitments[round] == 'STICK'" class="stick">
                        <i class="fa fa-arrow-down"></i>
                    </div>
                    <div v-if="bank.commitments[round] == 'UNDECIDED'" class="undecided btn white bg-green" @click="showBankCommitmentForm(i)">
                        <i class="fa fa-question"></i>
                    </div>
                </div>
                <div class="avatar"><i :class="['fa-light', bank.avatar]"></i></div>
                <p> {{bank.name}} Bank</p>
                <ul class="messages" v-if="score.commitments[round] != 'UNDECIDED' && score.banks[i]">
                    <li v-for="m in score.banks[i].rounds[round].messages" :key="i">
                        {{m}}
                    </li>
                </ul>
            </div>
            <transition name="slide-fade">
                <div class="bank-action-form bank-action-form-0" v-show="bankCommitmentForm" @click.self="dismissBankCommitmentForm">
                    <form v-if="banks[selectedBank]" class="inner-content">
                        <i :class="['avatar fa-light', banks[selectedBank].avatar]"></i>
                        <p>What did {{banks[selectedBank].name}} Bank do?</p>
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


    app.component("news-update", {
        props: ["score", "part"],
        data(){
            return {
                index: 0,
                showquote: true,
                figuresData: {
                    "part 0" : [
                        { 
                            title: `Mark Carney <br/> Former Governor, Bank of England`,
                            quote: {
                                bad: "Despite some positive signals, I worry that banks are simply not taking the warnings of scientists seriously.",
                                good: "Despite some legitimate concerns, I am positive that the financial sector is taking responsibility for the planet’s future."
                            },
                            img: "markcarney"
                        },
                        {
                            title: `Alexandria Ocasio-Cortez <br/> United States Representative`,
                            quote: {
                                bad: "The ship is steering straight towards an iceberg, and there are banks telling us it will cost too much to turn the wheel.",
                                good: "I’m not going to congratulate banks for doing the right thing for a change. This is an existential global threat. Step it up and do it now."
                            },
                            img: "aoc"
                        }
                    ],
                    "part 1" : [
                        { 
                            title: `Greta Thurnburg <br/> Activist`,
                            quote: {
                                bad: "The internal teams of these banks are cowards and criminals and they will be remembered that way.",
                                good: "The banks are telling us that they’re taking action. But that’s not enough. You have to do more. You have to do the impossible. And you have to do it now."
                            },
                            img: "greta"
                        },
                        {
                            title: `Larry Fink <br/> CEO, BlackRock`,
                            quote: {
                                bad: "I applaud banks for refusing to capitulate to unrealistic activist demands, and instead taking cautious but realistic steps towards a sustainable future.",
                                good: "While I applaud banks for taking bold steps towards a sustainable future, I do worry that financial institutions are allowing extremist NGOs to set the agenda."
                            },
                            img: "larry"
                        }
                    ]
                }
    
            }
        },
        computed: {
            ratio() {
                return [ 
                    this.score.commitments[0] / this.score.banks.length , 
                    (this.score.commitments[0] + this.score.commitments[1]) / (this.score.banks.length * 2)
                ]
            },
            figures() {
                return {
                    "part 0" : { 
                        title: this.figuresData["part 0"][this.index].title ,
                        quote: this.ratio[0] > .5 ? this.figuresData["part 0"][this.index].quote.good : this.figuresData["part 0"][this.index].quote.bad,
                        img: this.figuresData["part 0"][this.index].img
                    },
                    "part 1" : {
                        title: this.figuresData["part 1"][this.index].title ,
                        quote: this.ratio[0] > .5 ? this.figuresData["part 1"][this.index].quote.good : this.figuresData["part 1"][this.index].quote.bad,
                        img: this.figuresData["part 1"][this.index].img
                    }
                }
            }
        },
        methods: {
            swap(){
                this.showquote = false
                window.setTimeout(()=>{
                    this.index = this.index == 0 ? 1 : 0
                    this.showquote = true
                }, 300)
            }
        },
        template: `
            <div class="news-update">
                <h1 >News Update</h1>
                <span v-if="part == 0">
                    <p v-if="ratio[0] > .5">
                        So far, we have {{score.commitments[0]}} out of a total possible {{score.banks.length}} raised commitments. IPCC scientists report that they are deeply concerned by the lack of action from the financial sector. Chevron and BP have a surprisingly strong quarter, and share prices are up.
                    </p>
                    <p v-else>
                        So far, we have {{score.commitments[0]}} out of a total possible {{score.banks.length}} raised commitments. IPCC scientists are cautiously positive about the activity coming from the financial sector. Share prices for Chevron and BP undergo a significant drop this quarter.
                    </p>
                    <transition name="slide-fade">
                        <div class="pullquote" v-show="showquote">
                            <div class="quote" v-on:click="swap">
                                {{figures['part 0'].quote}}
                            </div>
                            <div class="figure-title" v-html="figures['part 0'].title"></div>
                            <div :class="['figure-img',figures['part 0'].img]"></div>
                        </div>
                    </transition>
                </span>
                <span v-else>
                    <p v-if="ratio[1] > .5">
                        So far, we have {{score.commitments[1] + score.commitments[0]}} out of a total possible {{score.banks.length * 2}} raised commitments. The latest news from the financial sector sends a ripple of quiet panic through the international climate community. Meanwhile, there is a boom on property sales in remote parts of New Zealand as wealthy billionaires start buying up land.
                    </p>
                    <p v-else>
                        So far, we have {{score.commitments[1] + score.commitments[0]}} out of a total possible {{score.banks.length * 2}} raised commitments. The latest announcements from the financial sector send a small signal of hope to the international climate community. There is a boom in new renewable energy projects and the value of unmined coal begins to fall radically.                    </p>
                    <transition name="slide-fade">
                        <div class="pullquote" v-show="showquote">
                            <div class="quote" v-on:click="swap">
                                {{figures['part 1'].quote}}
                            </div>
                            <div class="figure-title" v-html="figures['part 1'].title"></div>
                            <div :class="['figure-img',figures['part 1'].img]"></div>
                        </div>
                    </transition>
                </span>

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
                        <i class="fa fa-question"></i>
                    </div>
                    <table v-else>
                        <tr><td><i class="fa fa-building orange"></i></td><td>{{bank.investments.concredible}}</td></tr>
                        <tr><td><i class="fa fa-seedling green"></i></td><td>{{bank.investments.behemoss}}</td></tr>
                    </table>
                </div>
                <div class="avatar"><i :class="['fa-light', bank.avatar]"></i></div>
                <p> {{bank.name}} Bank</p>
            </div>
            <transition name="slide-fade">
                <div class="bank-action-form" v-show="bankForm" @click.self="dismissBankForm">
                    <form class="inner-content" v-if="banks[selectedBank]" v-on:submit="invest">
                        <div class="avatar"><i :class="['fa-light', banks[selectedBank].avatar]"></i></div>
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
                    <div class="avatar"><i :class="['fa-light', bank.avatar]"></i></div>
                    <p> {{bank.name}} Bank</p>
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
                    <div class="avatar"><i :class="['fa-light', bank.avatar]"></i></div>
                    <p> {{bank.name}} Bank</p>
                    <div class="vote hover" v-if="typeof bank.lobbyVotes.greensubsidies != 'number'" v-on:click="vote(i,0)">
                        Green Subsidies
                    </div>
                    <div class="vote more"  v-if="bank.lobbyVotes.greensubsidies > bank.lobbyVotes.enhancedcreditguidance">
                        <transition name="slide-fade"><div class="add-less vote-control" v-show="bank.lobbyVotes.greensubsidies > 1" v-on:click="bank.lobbyVotes.greensubsidies--"><i class="fa fa-minus"></i></div></transition>
                        <div class="vote-text">Green Subsidies <span class="count">{{bank.lobbyVotes.greensubsidies}}</span></div>
                        <div class="add-more vote-control" v-on:click="bank.lobbyVotes.greensubsidies++"><i class="fa fa-plus"></i></div>
                    </div>
                    <div class="vote disabled" v-if="bank.lobbyVotes.greensubsidies > bank.lobbyVotes.enhancedcreditguidance">
                        Enhanced Credit Guidance
                    </div>
                    <div class="vote hover" v-if="typeof bank.lobbyVotes.enhancedcreditguidance != 'number'" v-on:click="vote(i,1)">
                        Enhanced Credit Guidance
                    </div>
                    <div class="vote disabled" v-if="bank.lobbyVotes.enhancedcreditguidance > bank.lobbyVotes.greensubsidies">
                        Green Subsidies
                    </div>
                    <div class="vote more" v-if="bank.lobbyVotes.enhancedcreditguidance > bank.lobbyVotes.greensubsidies" >
                    <transition name="slide-fade"><div class="add-less vote-control" v-show="bank.lobbyVotes.enhancedcreditguidance > 1" v-on:click="bank.lobbyVotes.enhancedcreditguidance--"><i class="fa fa-minus"></i></div></transition>
                        <div class="vote-text">Enhanced Credit Guidance <span class="count">{{bank.lobbyVotes.enhancedcreditguidance}}</span></div>
                        <div class="add-more vote-control" v-on:click="bank.lobbyVotes.enhancedcreditguidance++"><i class="fa fa-plus"></i></div>
                    </div>
                </div>
            </div>
        `
    })

    app.component("ally-pause", {
        props: ["banks"],
        data(){
            return {
                activeBank : 0,
                show: true
            }
        },
        methods: {
            nextSlide(e){
                if(this.activeBank < this.banks.length-1) {
                    this.show = false
                    window.setTimeout(()=>{
                        this.activeBank ++
                        this.show = true
                    }, 300)
                } else {
                    prz.controls.nextSlide()
                    window.setTimeout(() => {
                        this.activeBank = 0
                    }, 300)
                }
            }
        },
        template: `
            <transition name="slide-fade">
                <div class="ally-pause" v-show="show" v-if="banks[activeBank]">
                    <div class="title tc">
                        <i :class="['avatar fa-light', banks[activeBank].avatar]"></i>
                        <h2> {{banks[activeBank].name}} Bank </h2>
                    </div>
                    <div class="tc mt5">
                        Employees of {{banks[activeBank].name}} Bank, you have 5 seconds to privately message ALLY.
                    </div>
                </div>
            </transition>
            <div :class="[disabled ? 'disabled' : '', 'pressie-nav']">
                <span class="text" >When you’re ready, proceed.</span>
                <a class="next btn" data-pressie="next" v-on:click="nextSlide">
                    <i class="fa fa-arrow-right"></i>
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
                <i class="fa-regular fa-arrow-right"></i>
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
                            <div><i :class="['fa-light', b.avatar]"></i></div>
                            <div>{{b.name}} Bank</div>
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
                       {{b.rounds[2].score}}</span></td>
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

    function Bank ({name, slogan, tokens, publicPressure, investments, commitments, avatar, lobbyVotes}) {
        const actions = {
            raise: "RAISE",
            stick: "STICK",
            undecided: "UNDECIDED"
        }
    
        const bnk = {}
        bnk.avatar = avatar
        bnk.name = name || ""
        bnk.slogan= slogan || ""
        bnk.tokens = tokens || 10
        bnk.publicPressure = publicPressure || false
        bnk.lobbyVotes = lobbyVotes || {
            greensubsidies: actions.undecided,
            enhancedcreditguidance: actions.undecided
        }
        bnk.investments = investments ? Object.assign({}, investments) : {
            concredible : actions.undecided,
            behemoss: actions.undecided
        }
        bnk.actions = actions
        bnk.commitments = commitments ? [...commitments] : [
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

    function getFinalScore(bank, banks, investments) {
        let score = getRoundThreeScore(bank, banks).score
        if(bank.publicPressure){
            score += 2
        }
        if(investments.concredible.successful){
            score += 1 + bank.investments.concredible * 1
        }
        if(investments.behemoss.successful){
            score += 1 + bank.investments.behemoss * 1
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
        if(votes.green == votes.credits || typeof votes.credits != 'number' || typeof votes.green != 'number') {
            return "TIE"
        } else {
            return votes.green > votes.credits ? regulations.green : regulations.credits 
        }
    }

    function avatars(){
        return [
            'fa-egg', 'fa-skull-cow', 'fa-galaxy'
        ]
    }

    
}
