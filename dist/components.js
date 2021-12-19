const deckContent = `
<!-- This is where the slide deck starts! treat it like markdown, but you can also include html and vue-petite components :) -->

<slide class="landing-page" />

# The Pledge.

---

# Welcome to **The Pledge.**
This is a game about the transition to <tooltip-for el="#net-zero">net-zero.</tooltip-for> 
*(When you see highlighted text, click for an explanation.)*  
  
You’ll be playing in teams. Each team is a different bank.  
  
<next>When you're ready, click this arrow to proceed</next>

<tooltip id="net-zero">
The state of carbon neutrality,
where all carbon emissions are balanced by removal. 

*Click anywhere to close this message.*
</tooltip>

---

Each bank is named after a different animal.  

You’ll now meet your team in a breakout room for 3 minutes. 

*With your team, decide what animal your bank is named after.*

<countdown duration="180"></countdown>

<next>When you’re back together, proceed.</next>

---

<slide class="bank-intro-screen" />

### Lets look at the banks

<bankintro :banks="banks" v-on:add-bank="addBank" v-on:remove-bank="removeBank"></bankintro>

---

# So how do we play?

<next>When you're ready, proceed.</next>

---

# Objectives

- To progess in your career
- To be a profitable, succesful bank
- To take care of the planet

You'll have to balance these long term and short term priorities.

At the end, we'll judge your success by looking at your career trajectory, the wealth of your bank and the state of the planet.

<next>When you're ready, proceed.</next>

---

# Tokens

Each bank starts with 10 tokens.

This represents your bank’s rate of <span data-tooltip="#return-on-equity">Return on Equity</span> and your
bank's market position.

If your tokens drop to zero, that means you're no longer competitive. The sharks are circling and customers are deserting in droves.

<next>When you're ready, proceed.</next>

---

<slide class="first-decision" />

It's time to make your first decision as a bank

<next>I'm excited!</next>

---

# Rounds

There are 3 rounds. In each round, each bank will make a <span data-tooltip="#public-commitment">public commitment</span> towards your net zero plans.

You'll decide whether your bank is going to <span class="raise">raise <arrow></span> your commitment or <span class="stick">stick <arrow></span> to your current commitment.

*Everyone get a piece of paper and draw a thick arrow on it.*

To announce your commitment, one person from each bank will hold their arrow up to the camera pointing <span class="raise">up</span> or <span class="stick">down</span>. We'll do that simultaneously.

<next>Once you've read these instructions, proceed.</next>

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

<next>When you're ready, proceed.</next>


---

# Round 1 <br> Net Zero Announcement

Your banks are under pressure to make a net zero commitment. You need to make a public statement about your plans.  

How ambitious will your commitment be?


<next>Proceed</next>

---

<slide class="net-zero-options"/>

Your bank has investments in lots of different sectors: transport, agriculture, energy, construction, health care, and many more.  

In some of these sectors, like energy, the carbon impact is easy to measure. In others, like health care, it's much harder.  

You have two options:

- You can <span class="raise">raise</span> your commitment to make a net zero pledge which includes all your
sectors, even the ones you can't yet measure the impact of.

- Or you can <span class="stick">stick</span> to your current commitments which focus only on high carbon sectors to begin with.

<next>When you're ready, proceed.</next>

---

You've got a press conference booked for tomorrow morning to make your announcement.  
What will you say?  
<br>
<br>

In just a moment, you’ll meet with your team to make decisions:

- Who will make the public announcement – who will hold up the piece of paper? 

- Decide whether to <span class="raise">raise</span> your commitment or <span class="stick">stick.</stick>

<next>Proceed</next>

---

One more thing: there's a cost to changing course early on.  

If you choose to <span class="raise">raise</span> your commitment this turn, you will pay **1 token** in
addition to anything that happens with the other banks.

*In your breakout room, decide whether to stick or raise. You have 5 minutes.*

<countdown duration="300">

<next>When you’re back from your breakout rooms, proceed.</next>

---

Welcome back. It’s time to see what was decided.  

One player from each bank will make the announcement.

*Announcers, please identify yourselves and prepare your arrow.*  
*On the count of three, simultaneously reveal your arrow pointing up or down.*

<next>When all banks have revealed their decision, proceed</next>

---
<slide class="commitments-screen"/>

# Results
*Click the question marks to record each bank’s decision.*
<next :disabled="score.commitments[0] == 'UNDECIDED'" >When all bank decisions have been recorded, proceed.</next>

<commitments :banks="banks" :round="0" v-on:commit="setCommitment" :score="score">

---

# Lets look at the scores

---

<scoreboard :score="score" rounds="['Round 1']" :banks="banks" />

---

# Climate
blah blah blah

---

<div class="news-update">

# News Update

IPCC scientists report that they are deeply concerned by the lack of action from the financial sector. Share prices for Chevron and BP have a surprisingly strong quarter.

</div>

---

<slide class="investment-decision" />

# Investment Decision: <br> New Green Tech

You have the opportunity to invest in two different companies.

- <i class="fa fa-building orange"></i> **Concredible** – a building materials company making concrete that sequesters atmospheric carbon as it hardens
- <i class="fa fa-seedling green"></i> **Behemoss** – a biohacking agritech startup attempting to capture carbon in the atmosphere via genetically modified edible moss

<next>Proceed</next>

---

Because these technologies are speculative, there's a chance that the research will be unproductive and your money will be lost. However, if the research is successful, it could be a game-changer in terms of its impact on the environment.
The profit margins will be slim – if the research is successful, you'll get your tokens back, and you'll get 1 additional token of profit.
So if you put in 1 token and the research is successful, you get 2 tokens back. If you put in 4 tokens, you'd get 5 back.

<next>When you're ready, proceed.</next>

---

At the moment, there's a 10% chance of the research yielding fruit. Each token invested in a technology will increase the chance of success by 10%.
You have three minutes in your breakout rooms to decide how much, if anything, you'd like to invest in one or both of these technologies. You should also decide who will reveal your bank’s decision.

<countdown duration="180"/>

<next>When you're back from the breakout rooms, proceed.</next>

---

Welcome back. It’s time to see what was decided.
One player from each bank will reveal how much you are investing.
Investment announcers, please identify yourselves.
On the count of three, send a message to the group chat that looks like this:
“[Bank Name], Concredible [# of tokens invested], Behemoss [# of tokens invested]”

<next>When all banks have revealed their decision, proceed</next>

---

# Results
*Click the question marks to record each bank’s decision.*
<next :disabled="score.commitments[0] == 'UNDECIDED'" >When you're ready, proceed.</next>

<investments :banks="banks" v-on:invest="setInvestment">

---

# Research takes time.
# We’ll see the results of the research later.

---

# Internal Bank Dynamics

Banks are not monolithic structures. They are made up of hundreds or thousands of employees. Many employees would like their banks to be more climate active, but they have their own concerns and pressures.
Sometimes bank employees reach out to external allies like NGOs and newspapers. These organisations apply scrutiny and pressure which can nudge the banks to more sustainable actions.

---

If you want to engage with external allies, you'll send a private message to the facilitator with the word ALLY.
Don't do this yet! We'll go bank by bank – so wait for your bank's turn before you send a message.
How to send a private message: Use the chat function. Click on the facilitator's name. Then type and send the word ‘ALLY’.

---

Be warned: even though this is secret, taking this step may have consequences for your own career.
But that extra scrutiny might benefit your bank too.
The risks and rewards for this decision won't be clear until later.

---

<ally-pause :banks="banks">
</ally-pause>

---

# Results
*Facilitator: click on the banks that had at least one employee message ALLY.*

<ally-results :banks="banks" />

---

# Results

There is a wave of public pressure and scrutiny applied to banks who brought in external allies. The short-term affect is to impact the reputation of those banks, which affects their market share.
All banks who had someone reach out to external allies lose 1 token.
We'll see the long-term effects of this decision later.

---

# Let’s take a look at the scores.

---

<scoreboard :score="score" rounds="['Round 1','Interstitial A']"  :banks="banks" />
<next>When you're ready, proceed.</next>

---

# Round 2

It's two years in the future. In the last few months, public debate has focused on banks providing loans to fossil fuel companies.
Your bank, like many others, has contracts with fossil fuel companies. You plan to conclude these loans by 2050 as part of your net zero plans.
But now you're under pressure to speed up these plans.

---

Climate NGOs argue that 2050 is too far away. They want banks to commit to more ambitious timeframes for phasing out fossil fuels.
On the other hand, an unrealistic deadline will make your bank look naive, and will be embarrassing if you can't achieve it.
Your bank's sustainability team has proposed to bring forward your deadline for phasing out fossil fuels to 2035.

---

You have two options:

- You can raise your commitment and promise to be completely out of fossil fuels by 2035.
- Or you can stick to your current commitments and retain your deadline of no more fossil fuels by 2050.

You've got a press conference tomorrow to make a public statement, and you need to make your decision.

---

Public pressure is mounting for significant climate action, but it's still costly for banks to make the first move if their peers don't follow.
Remember, if the banks do different things, then:

- All the banks who raised their commitment lose 2 points.
- All the banks who stuck with their current commitment gain 1 point.

---

In just a moment, you’ll meet with your team to make decisions:

- Who will make the public announcement – who will hold up the piece of paper? 
- Decide whether to raise your commitment or stick.

---

One more thing: if you stuck with your existing commitments in the previous round, there's now a 2 token cost to raise your commitment.
If you raised your commitment last turn, it doesn't cost anything additional to continue to raise this turn.
In your breakout room, decide whether to stick or raise. You have 5 minutes.

<countdown duration="300">

---

Welcome back. It’s time to see what was decided.
One player from each bank will make the announcement.
Announcers, please identify yourselves and prepare your arrow.
On the count of three, simultaneously reveal your arrow pointing up or down.

---

# Results
*Click the question marks to record each bank’s decision.*
<next :disabled="score.commitments[1] == 'UNDECIDED'" >When all bank decisions have been recorded, proceed.</next>

<commitments :banks="banks" round="1" v-on:commit="setCommitment" :score="score">

---

# Let’s take a look at the scores.

---

<scoreboard :score="score" rounds="['Round 1', 'Interstitial A', 'Round 2']" :banks="banks" />

---

news updates

---

# New Regulation

One of the biggest drivers in the financial system are governments and regulators. The decisions of governments and central banks shape the landscape that banks operating within since they determine the rules that banks are required to comply with.
To break the deadlock of climate inaction, financial regulators have put forward two possible policies. The banks will vote on which they prefer.

---

The first policy is Green Subsidies.
This is a package of laws which ease capital holding restrictions for
sustainable loans and inject money directly into green sectors.
If we go with this policy, banks get 3 tokens for each occasion they’ve previously raised their commitment.

---

The second policy is Enhanced Credit Guidance.
In this case, central banks and regulators take a much more interventionist
role and block certain kinds of loans to high-carbon sectors.
If we go with this policy, each bank pays 1 token, and we remove the transition cost for banks to raise their commitments.

---

You'll decide in your breakout rooms which policy you're going to vote for.
Then you’ll have the opportunity to spend tokens to buy additional votes.
You can negotiate with other banks and make the decision collectively if you like.

---

Before you go to your breakout rooms:
The employees who engaged with external allies previously have now been found out. Rocking the boat this way has had an impact on your career.
For this next decision, the bank has locked you out of the conference room as potential trouble- makers.
You can stand at the glass doors, but you can't speak.
If you messaged ALLY earlier, mute your microphone and don't use the chat during this discussion. You can gesture as much as you like to express your opinion.

---

The policy choices are:
- GreenSubsidies: banks get 3 tokens for each occasion they’ve previously raised their commitment
- Enhanced Credit Guidance: each bank pays 1 token, and we remove the transition cost for banks to raise their commitments
In your breakout rooms, decide which policy to vote for and discuss whether you will buy additional votes. You have 3 minutes.

<countdown duration="180">

---

# Voting
*Click the thumbs up underneath the bank to reflect voting.*

<regulation-votes :banks="banks"></regulation-votes>

---

# Let’s take a look at the scores.

---

<scoreboard :score="score" rounds="['Round 1', 'Interstitial A', 'Round 2', 'Interstitial B']" :banks="banks" />

---

# Round 3
It's now six years in the future. Severe weather events are impacting the planet and the urgency around climate action has reached a critical point.
Industries are under increasing pressure to decarbonise. Many people say that banks are responsible for the emissions of the businesses they loan money to. NGOs say that banks should be actively forcing their clients to decarbonise and cancelling contracts with those that don't move fast enough. Other people argue that a bank's job is to offer clients a service, not to interfere with their business.
Should banks be helping fund their clients' decarbonisation?

---

You have two options:

- You can raise your commitment and financially incentivise your clients to accelerate their decarbonisation. This includes investing money to drive up the pace of change in emerging green sectors.

- Or you can stick to your current commitments and continue to honour your existing relationships. You can help clients to transition to net zero if they want it, but you won't force them before they're ready.

---

This is the last round of the game. As in previous rounds, if the banks do different things, then:

- All the banks who raised their commitment lose 2 points.
- All the banks who stuck with their current commitment gain 1 point

---

In just a moment, you’ll meet with your team to make decisions:

- Who will make the public announcement – who will hold up the piece of paper? 
- Decide whether to raise your commitment or stick.

---

<div v-if="score.winningRegulation == 'GREENSUBSIDIES'">

If you raised your commitment last turn, it doesn't cost anything additional to continue to raise this turn.

</div>
<div v-else> 

Because of new regulation Enhanced Credit Guidance, there is no cost to raise your commitment if you stuck last turn.

</div>

*In your breakout room, decide whether to stick or raise. You have 5 minutes.*

<countdown duration="180"/>

---

Welcome back. It’s time to see what was decided.
One player from each bank will make the announcement.

Announcers, please identify yourselves and prepare your arrow.

On the count of three, simultaneously reveal your arrow pointing up or down.

---

# Results
*Click the question marks to record each bank’s decision.*
<next :disabled="score.commitments[2] == 'UNDECIDED'" >When all bank decisions have been recorded, proceed.</next>

<commitments :banks="banks" round="1" v-on:commit="setCommitment" :score="score">

---

# Before we reveal the final scores...

---

# Halo Effect

If your bank had someone in it that messaged ALLY, you've been under much more public scrutiny from external NGOs. You've been criticised for your mistakes – but also, there's more attention on the good things you've done.

---

If you engaged with external allies and your bank has raised its commitment two or more times, you have established a reputation as a ‘green leader’. You have access to the best green financeable projects, and a great customer base.
This has a financial benefit to your bank of 2 tokens. The following banks receive this bonus:

<div v-for="(b,i) in banks.filter(b => b.publicPressure)" :key="i">
    <div>{{b.name}} Bank </div>
</div>

---

# R&D Results

Let's check in to see how our R&D went. Were either of our green startups successful?

Without any additional funding, there was a 10% chance that research would be successful. Collectively, the banks contributed tokens to research, which brings the likelihood of success up by
10% per invested token. After investment, the odds look like this:
70% chance of success 30% chance of success

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