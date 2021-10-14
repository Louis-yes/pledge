function thePledge(el){
    const initialBanks = [
        new Bank({
            name: "Armadillo", 
            tokens: 6, 
            commitments: [0,0,0],
            lobbyVotes: 2
        }),
        new Bank({
            name: "Vulture", 
            tokens: 6, 
            commitments: [0,1,1]
        }),
        new Bank({
            name: "Penguin", 
            tokens: 6, 
            commitments: [1,1,1]
        }),
    ]

    const pledge = PetiteVue.reactive({ 
        banks: initialBanks,
        regulations: [
            { name: "Carbon Credits", votes: 0, passed: false },
            { name: "Mandatory Targets", votes: 0, passed: false }
        ],
        /** 
         * The score functions apply all the scoring rules for each round
         * 
         * returns {
         *  banks: an array of banks with tokens adjusted to current game state
         *  totalCommits: total number of commits made
         * }
         * 
         * to get the total possible commits, you can use length of banks array * round number
         * 
         * */  
        get roundOneScore() {
            const commits = this.banks.reduce((pv,cv)=>{return pv + cv.commitments[0]}, 0)
            const roundOneBanks = this.banks.map((cb,i) => {
                const bb = Object.assign({}, cb)
                if(commits == this.banks.length){
                    bb.tokens--
                } else if (commits == 0) {
                    return bb
                } else {
                    if(bb.commitments[0] > 0){
                        bb.tokens = bb.tokens - 3
                    } else {
                        bb.tokens ++
                    }
                }
                return bb
            })
            return score = { 
                banks: roundOneBanks,
                totalCommits: commits
            }
        },
        get roundTwoScore() {
            const commits = this.banks.reduce((pv,cv)=>{return pv + cv.commitments[1]}, 0)
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
            return score = {
                banks: roundTwoBanks,
                totalCommits: commits
            } 
        },
        get roundThreeScore() {
            const commits = this.banks.reduce((pv,cv)=>{return pv + cv.commitments[2]}, 0)
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
        addBank(){
            this.banks[this.banks.length] = new Bank()
        },
        removeBank(i){
            this.banks.splice(i,1)
            console.log(i, this.banks)
        }
    })

    el.innerHTML = pressie(deck()).join("")
    PetiteVue.createApp(pledge).mount()

    function Bank ({name, qualities, tokens, publicPressure, lobbyVotes, regulationVotes, commitments}) {
        const actions = {
            raise: 1,
            stick: 0,
        }
    
        bnk = {}
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