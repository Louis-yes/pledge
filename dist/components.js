const deckContent = `
<!-- This is where the slide deck starts! treat it like markdown, but you can also include html and vue-petite components :) -->

<slide class="landing-page" />

# The Pledge.

---

# Welcome to **The Pledge.**
This is a game about the transition to <span data-tooltip="#net-zero">net zero.</span>  
*(When you see highlighted text, click for an explanation.)*  
  
You’ll be playing in teams. Each team is a different bank.  
  
<span class="next-prompt">When you're ready, click this arrow to proceed</span>

<div id="net-zero" class="tooltip">
The state of carbon neutrality,
where all carbon emissions are balanced by removal. 

*Click anywhere to close this message.*
</div>

---

Each bank is named after a different animal.  

You’ll now meet your team in a breakout room for 3 minutes. 

*With your team, decide what animal your bank is named after.*

<div v-scope="Countdown({ duration: 180 })" @mounted="mounted" class="countdown">
    <div class="bg-btn" v-if="!running" @click="start"><play></div>
    <div class="bg-btn" v-else @click="reset"><reset></div>
    <p class="time-string">{{ timeString }}</p>
</div> 

<span class="next-prompt">When you’re back together, proceed.</span>

---

<!-- Bank introduction screen -->
<slide class="bank-intro-screen" v-scope="pledge" />

### Lets look at the banks

<div v-if="banks.length < 1" class="no-banks">
    <span class="instruction">Click to add bank.</span>
    <div class="add-bank bg-btn" @click="showNewBankEditor">+</div>
</div>
<div v-else class="banks">
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <div class="avatar"><bank></div>
        <p> {{bank.name}} <p>
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
            <cross>
        </span>
    </div>
    <div class="add-bank bg-btn" @click="showNewBankEditor">+</div>
</div>
<div class="add-bank-form" :class="newBankEditor ? 'visible' : ''" v-on:click.self="dismissNewBankEditor()">
    <form v-on:submit.prevent="hideNewBankEditor">
        <label for="bankname">What's your animal?</label>
        <input id="bankname" v-model="templateBank.name" placeholder="" class="input"></input>
        <div class="bank-ok bg-btn" @click="confirmNewBankEditor"><tick></div>
    </form>
</div>

---

# So how do we play?

<span class="next-prompt">When you're ready, proceed.</span>

---

# Objectives

- To progess in your career
- To be a profitable, succesful bank
- To take care of the planet

You'll have to balance these long term and short term priorities.

At the end, we'll judge your success by looking at your career trajectory, the wealth of your bank and the state of the planet.

<span class="next-prompt">When you're ready, proceed.</span>

---

# Tokens

Each bank starts with 10 tokens.

This represents your bank’s rate of <span data-tooltip="#return-on-equity">Return on Equity</span> and your
bank's market position.

If your tokens drop to zero, that means you're no longer competitive. The sharks are circling and customers are deserting in droves.

<span class="next-prompt">When you're ready, proceed.</span>

---

# Bonus

Each player starts with a bonus: <span class="dollar"><dollar></span>

This is not for your bank, this is just for you.

It represents your salary bonus and your chance of promotion.

During the game, you might lose or increase your bonus. Keep track of your own bonus.

<span class="next-prompt">When you're ready, proceed.</span>

---

<slide class="first-decision" />

It's time to make your first decision as a bank

<span class="next-prompt">I'm excited!</span>

---

<slide class="investment-decision" />

# Investment Decision: <br> New Green Tech

You have the opportunity to invest in two different companies.

- <building> **Concredible** – a building materials company making concrete that sequesters atmospheric carbon as it hardens
- <plant> **Behemoss** – a biohacking agritech startup attempting to capture carbon in the atmosphere via genetically modified edible moss

<span class="next-prompt">Proceed</span>

---

<!-- Points round up 1 -->
<div v-scope="pledge" class="scoreboard">
    <table>
        <tr>
            <th></th>
            <th v-for="(b,i) in banks" :key="i">
                {{b.name}} Bank
            </th>
        </tr>
        <tr>
            <td>Starting Position</td>
            <td v-for="(b,i) in initialScore.banks" :key="i">{{b.tokens}}</td>
        </tr>
        <tr class="">
            <td>Round 1</td>
            <td v-for="(b,i) in roundOneScore.banks" :key="i"></td>
        </tr>
        <tr class="">
            <td>???</td>
            <td v-for="(b,i) in banks" :key="i"></td>
        </tr>
        <tr>
            <td>Round 2</td>
            <td v-for="(b,i) in roundTwoScore.banks" :key="i"></td>
        </tr>
        <tr class="">
            <td>???</td>
            <td v-for="(b,i) in banks" :key="i"></td>
        </tr>
        <tr>
            <td>Round 3</td>
            <td v-for="(b,i) in roundThreeScore.banks" :key="i"></td>
        </tr>
        <tr>
            <td>Final Score</td>
            <td v-for="(b,i) in finalScore.banks" :key="i"></td>
        </tr>
    </table>
</div>

<span class="next-prompt">When you're ready, proceed.</span>

---

# Rounds

There are 3 rounds. In each round, each bank will make a <span data-tooltip="#public-commitment">public commitment</span> towards your net zero plans.

You'll decide whether your bank is going to <span class="raise">raise <arrow></span> your commitment or <span class="stick">stick <arrow></span> to your current commitment.

*Everyone get a piece of paper and draw a thick arrow on it.*

To announce your commitment, one person from each bank will hold their arrow up to the camera pointing <span class="raise">up</span> or <span class="stick">down</span>. We'll do that simultaneously.

<span class="next-prompt">Once you've read these instructions, proceed.</span>

<div id="public-commitment" class="tooltip">

tooltip

</div>

---

<slide class="explain-consequences"/>

Now if all the banks do the same thing – if all the banks <span class="raise">raise <arrow></span> or all the banks <span class="stick">stick <arrow></span> – then there's no change to your relative positions, and nothing happens.

**But if some banks <span class="raise">raise</span> and others <span class="stick">stick</span>, there are consequences.**

---

The majority of <span data-tooltip="#shareholders">shareholders</span> today don't want their banks to make commitments that will cost them business. So shareholders will punish banks that risk their profitability.
<br>
<br>

If the banks do different things, then:

- All the banks who <span class="raise">raised</span> their commitment **lose 2 points**.
<br>
<br>
- All the banks who <span class="stick">stuck</span> with their current commitment **gain 1 point**.
<br>
<br>

So there's a strong <span data-tooltip="#first-mover">first mover disadvantage.</span>

<div id="shareholders" class="tooltip">
    shareholders
</div>
<div id="first-mover" class="tooltip">
    first mover
</div>

<span class="next-prompt">When you're ready, proceed.</span>


---

# Round 1 <br> Net Zero Announcement

Your banks are under pressure to make a net zero commitment. You need to make a public statement about your plans.  

How ambitious will your commitment be?


<span class="next-prompt">Proceed</span>

---

<slide class="net-zero-options"/>

Your bank has investments in lots of different sectors: transport, agriculture, energy, construction, health care, and many more.  

In some of these sectors, like energy, the carbon impact is easy to measure. In others, like health care, it's much harder.  

You have two options:

- You can <span class="raise">raise</span> your commitment to make a net zero pledge which includes all your
sectors, even the ones you can't yet measure the impact of.

- Or you can <span class="stick">stick</span> to your current commitments which focus only on high carbon sectors to begin with.

<span class="next-prompt">When you're ready, proceed.</span>

---

You've got a press conference booked for tomorrow morning to make your announcement.  
What will you say?  
<br>
<br>

In just a moment, you’ll meet with your team to make decisions:

- Who will make the public announcement – who will hold up the piece of paper? 

- Decide whether to <span class="raise">raise</span> your commitment or <span class="stick">stick.</stick>

<span class="next-prompt">Proceed</span>

---

One more thing: there's a cost to changing course early on.  

If you choose to <span class="raise">raise</span> your commitment this turn, you will pay **1 token** in
addition to anything that happens with the other banks.

*In your breakout room, decide whether to stick or raise. You have 5 minutes.*

<div v-scope="Countdown({ duration: 10 })" @mounted="mounted" class="countdown">
    <div class="bg-btn" v-if="!running" @click="start"><play></div>
    <div class="bg-btn" v-else @click="reset"><reset></div>
    <p class="time-string">{{ timeString }}</p>
</div> 

<span class="next-prompt">When you’re back from your breakout rooms, proceed.</span>

---

Welcome back. It’s time to see what was decided.  

One player from each bank will make the announcement.

*Announcers, please identify yourselves and prepare your arrow.*  
*On the count of three, simultaneously reveal your arrow pointing up or down.*

<span class="next-prompt">When all banks have revealed their decision, proceed</span>

---
<slide class="commitments-screen"/>

# Results
*Click the question marks to record each bank’s decision.*

<span class="next-prompt">When all bank decisions have been recorded, proceed.</span>

<div v-scope="pledge" class="commitments" >
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <div :class="['commitment', bank.commitments[0]]">
            <div v-if="bank.commitments[0] == 'RAISE'" class="raise">
                    <arrow>
            </div>
            <div v-if="bank.commitments[0] == 'STICK'" class="stick">
                    <arrow>
            </div>
            <div v-if="bank.commitments[0] == 'UNDECIDED'" class="undecided" @click="showCommitmentsPopup(0,i)">
                    <question>
            </div>
        </div>
        <div class="avatar"><bank></div>
        <p> {{bank.name}} Bank<p>
    </div>
    <div class="bank-commitment-form bank-commitment-form-0" :class="commitmentsForm ? 'visible':''" @click.self="dismissCommitmentsPopup(0)">
            <form class="inner-content">
                What did {{banks[selectedBank].name}} Bank do?
                <div class="options">
                    <div class="stick" @click="setAsStick(0, banks[selectedBank])"> stick <span class="btn-little"><arrow></span></div>
                    <div class="raise" @click="setAsRaise(0, banks[selectedBank])"> raise <span class="btn-little"><arrow></span></div>
                </div>
            </form>
    </div>
</div>


---

<!-- Bank commitments screen -->

---

<!-- Points round up 1 -->
<div v-scope="pledge" class="scoreboard">
    <table>
        <tr>
            <th></th>
            <th v-for="(b,i) in banks" :key="i">
                {{b.name}} Bank
            </th>
        </tr>
        <tr>
            <td>Initial Score</td>
            <td v-for="(b,i) in initialScore.banks" :key="i">{{b.tokens}}</td>
        </tr>
        <tr class="active">
            <td>Round 1</td>
            <td v-for="(b,i) in roundOneScore.banks" :key="i">{{b.tokens}}</td>
        </tr>
        <tr class="">
            <td>Interstitial A</td>
            <td v-for="(b,i) in banks" :key="i"></td>
        </tr>
        <tr>
            <td>Round 2</td>
            <td v-for="(b,i) in roundTwoScore.banks" :key="i"></td>
        </tr>
        <tr class="">
            <td>Interstitial B</td>
            <td v-for="(b,i) in banks" :key="i"></td>
        </tr>
        <tr>
            <td>Round 3</td>
            <td v-for="(b,i) in roundThreeScore.banks" :key="i"></td>
        </tr>
        <tr>
            <td>Final Score</td>
            <td v-for="(b,i) in finalScore.banks" :key="i"></td>
        </tr>
    </table>
</div>

<span class="next-prompt">When you're ready, proceed.</span>

---

<!-- lobby votes -->
<div v-scope="pledge">
    <h1>Lobbying</h1>
    <div class="bank"  v-for="(bank,i) in banks" :key="i">
        <h2>{{bank.name}}</h2>
        <button @click="bank.lobbyVotes++" class="pointer underline-hover button bn bg-black white">Vote</button>
        <span v-for="v in bank.lobbyVotes" :key="v" class="pointer underline-hover" @click="bank.lobbyVotes--">$</span>
    </div>
</div>

---

<!-- Public Pressure -->
<div v-scope="pledge">
        <div class="bank" v-for="(bank,i) in banks" :key="i">
                <h2> {{bank.name}} Bank</h2>
            <form class="publicpressure">
                <input type="checkbox" v-model="bank.publicPressure" name="publicPressure" :id="bank.name + '-pp'" :value="true"><label :for="bank.name + '-pp'" class="pointer">Public Pressure</label> 
            </form>
        </div>
</div>

---

<!-- Bank commitments screen 2 -->

<slide class="commitments-screen round-two"/>
<div v-scope="pledge" class="banks" >
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <div class="avatar"><bank></div>
        <p> {{bank.name}} Bank<p>
        <form class="commitments">
            <div class="commitment stay" :class="bank.commitments[1] == 'STAY' ? 'selected' : ''" @click="bank.commitments[0] = 'STAY'" >Stay</div>
            <div class="commitment raise" :class="bank.commitments[1] == 'RAISE' ? 'selected' : ''" @click="bank.commitments[0] = 'RAISE'">Raise</div>
        </form>
    </div>
</div>

---

<!-- Points round up 2 -->

<div v-scope="pledge">
    <h1>
        Points for round two
    </h1>
    <div class="bank" v-for="(bank,i) in roundTwoScore.banks" :key="i">
        <h2> {{bank.name}} Bank</h2>
        <span v-for="t in bank.tokens" :key="t">
            *
        </span>
    </div>
</div>

---

<!-- Regulations -->

<div v-scope="pledge">
    <div class="bank mb4"  v-for="(bank,i) in banks" :key="i">
        <h3 class="mb1">{{bank.name}}</h2>
        <button v-for="(regulation,i) in regulations" :key="i" @click="
            regulation.votes++;  bank.regulationVotes++
        " class="pointer underline-hover button bn bg-black white db">Vote for {{regulation.name}}</button>
    </div>
    <div :class="regulation.passed ? 'red' : 'white'" v-for="(regulation,i) in regulations" :key="i" >
        <button :class="['i bg-black underline-hover bn', regulation.passed ? 'red' : 'white']" @click="regulation.passed = !regulation.passed">{{regulation.name}}</button>:{{regulation.votes}}
    </div>
</div>

---

<!-- Bank commitments screen 2 -->

<div v-scope="pledge">
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <h2> {{bank.name}} Bank</h2>
        <form class="commitments">
        <input type="radio" v-model="bank.commitments[2]" name="commitment" :id="bank.name + '-raisecc2'" value="1"><label :for="bank.name + '-raisecc2'" class="pointer">Raise</label> 
        <input type="radio" v-model="bank.commitments[2]" name="commitment" :id="bank.name + '-stickcc2'" value="0"><label :for="bank.name + '-stickcc2'" class="pointer">Stick</label> 
        </form>
    </div>
</div>

---

<!-- Bank commitments screen 2 -->

<div v-scope="pledge">
    <h1>
        Points for round three
    </h1>
    <div class="bank" v-for="(bank,i) in roundThreeScore.banks" :key="i">
        <h2> {{bank.name}} Bank</h2>
        <span v-for="t in bank.tokens" :key="t">
            *
        </span>
    </div>
</div>

---

Thank you for playing *The Pledge*

<!-- This is where the slide deck ends! Don't edit further than here unless you know what you're doing! -->
`
// export default function deck(){
//     return deckContent
// }

window.deck = function deck() {
    return deckContent
}