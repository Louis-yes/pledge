const deckContent = `
<!-- This is where the slide deck starts! treat it like markdown, but you can also include html and vue-petite components :) -->

<slide class="landing-page" />

# The Pledge.

<next>Play</next>

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

You’ll now meet your team in a breakout room for **3 minutes.**  

*With your team, decide what <tooltip-for el="#animal">animal</tooltip-for> your bank is named after.*  
<br/>
<br/>

<div>
<countdown duration="180"></countdown>
</div>

<next>When you’re back together, proceed.</next>

<tooltip id="animal">
animal qualities you want to emulate.
Are you sturdy, agile, cautious?

*Click anywhere to close this message.*
</tooltip>

---

<slide class="bank-intro-screen" />

### Lets look at the banks

<div class="w-100">
<bankintro :banks="banks" v-on:add-bank="addBank" v-on:remove-bank="removeBank"></bankintro>
</div>

<next :disabled="banks.length < 2">When all banks have been added, proceed.</next>


---
<slide class="middle-title" />

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

Each bank starts with **10 tokens**.

This represents your bank’s rate of <tooltip-for id="#return-on-equity">Return on Equity</tooltip-for> and your
bank's market position.

If your tokens drop to zero, that means you're no longer competitive. The sharks are circling and customers are deserting in droves.

<next>When you're ready, proceed.</next>

<miniscore :score="score" round="Initial Score" />

---

<slide class="middle-title" />

It's time to make your first decision as a bank

<next>I'm excited!</next>

<miniscore :score="score" round="Initial Score" />

---

<h1 class="mb1">Rounds</h1>

There are 3 rounds. In each round, each bank will make a <tooltip-for el="#public-commitment">public commitment</tooltip-for> towards your net zero plans.

You'll decide whether your bank is going to <span class="raise">raise <i class="fa fa-arrow-up"></i></span> your commitment or <span class="stick">stick <i class="fa fa-arrow-down"></i></span> to your current commitment.

*Everyone get a piece of paper and draw a thick arrow on it.*  
To announce your commitment, one person from each bank will hold their arrow up to the camera pointing <span class="raise">up</span> or <span class="stick">down</span>. We'll do that simultaneously.

<next>Once you've read these instructions, proceed.</next>

<tooltip id="public-commitment" class="tooltip">

tooltip

</tooltip>

---

<slide class="middle-title" />

Now if all the banks do the same thing – if all the banks <span class="raise">raise <i class="fa fa-arrow-up"></i></span> or all the banks <span class="stick">stick <i class="fa fa-arrow-down"></i></span> – then there's no change to your relative positions, and nothing happens.

**But if some banks <span class="raise">raise</span> and others <span class="stick">stick</span>, there are consequences.**

<next>When you're ready, proceed.</next>

---

The majority of <tooltip-for el="#shareholders">shareholders</tooltip-for> today don't want their banks to make commitments that will cost them business. So shareholders will punish banks that risk their profitability being too ambitious with their net zero commitments..
<br>
<br>

If the banks do different things, then:
- All the banks who <span class="raise">raised</span> their commitment **lose 2 points**.
<br>
- All the banks who <span class="stick">stuck</span> with their current commitment **gain 1 point**.
<br>
<br>

So there's a strong first mover disadvantage.

<tooltip id="shareholders" class="tooltip">
    shareholders
</tooltip>

<next>When you're ready, proceed.</next>


---

# Round 1

Your banks are under pressure to make a net zero commitment.  
You need to make a public statement about your plans.  

How ambitious will your commitment be?


<next>Proceed</next>

---

Your bank has investments in lots of different sectors: transport, agriculture, energy, construction, health care, and many more.  

In some of these sectors, like energy, the carbon impact is easy to measure. In others, like health care, it's much harder.  

You have **two options**:
- You can <span class="raise">raise</span> your commitment to make a net zero pledge which includes all your sectors, even the ones you can't yet measure the impact of.
- Or you can <span class="stick">stick</span> to your current commitments which focus only on high carbon sectors to begin with.

<next>When you're ready, proceed.</next>

---

### You've got a press conference booked for tomorrow morning to make your announcement.  
### What will you say?  

In just a moment, you’ll meet with your team to make decisions:

- Who will make the public announcement – who will hold up the piece of paper? 

- Decide whether to <span class="raise">raise</span> your commitment or <span class="stick">stick.</stick>

<next>Proceed</next>

---

One more thing: there's a cost to changing course early on.  

If you choose to <span class="raise">raise</span> your commitment this turn, you will pay **1 token** in
addition to anything that happens with the other banks.

*In your breakout room, decide whether to stick or raise. You have 5 minutes.*
<br/>
<br/>

<div>
<countdown duration="300"></countdown>
</div>

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

<em v-if="score.commitments[0] == 'UNDECIDED'">
    Click the question marks to record each bank’s decision.
    <br/>
</em>


<next :disabled="score.commitments[0] == 'UNDECIDED'" >When all bank decisions have been recorded, proceed.</next>

<commitments :banks="banks" :round="0" v-on:commit="setCommitment" :score="score">

---

<slide class="middle-title" />

# Lets look at the scores

<next>Proceed.</next>

---
<slide class="scores"/>

<div>
    <scoreboard :score="score" rounds="['Round 1']" :banks="banks"></scoreboard>
    <next>When you're ready, proceed.</next>
</div>


---

# Climate

The climate model in this game is very simple. We're going to use your choices over three rounds as an <tooltip-for el="#indication">indication</tooltip-for> of how well the financial sector has transitioned to net zero.

At the end of the game, we'll use the total number of raised commitments as a rough indication of the total greenhouse gas emissions in the atmosphere.

This will determine which of the Intergovernmental Panel on Climate Change's climate scenarios we end up in.

<tooltip id="indication">

We're using your choices as an
indication of how proactively banks worldwide are pushing towards
sustainable investments.

*click anywhere to close this message*

</tooltip>

<next>When you're ready, proceed.</next>

---
<news-update :score="score" part="0"></news-update>

<next>When you're ready, proceed.</next>

---

<slide class="investment-decision" />

# Investment Decision: <br> New Green Tech

Your banks have been invited to invest in research and development for several new technologies for helping draw down and <tooltip-for el="#sequester">sequester carbon</tooltip-for>.

- <i class="fa fa-building orange"></i> **Concredible** – a building materials company making concrete that sequesters atmospheric carbon as it hardens
- <i class="fa fa-seedling green"></i> **Behemoss** – a biohacking agritech startup attempting to capture carbon in the atmosphere via genetically modified edible moss

<tooltip id="sequester">

One of the key parts of net zero is the 'net' part. We need new technologies for helping draw down carbon dioxide from the atmosphere. There are many experimental technologies for capturing and storing carbon, but at this stage, none of them are viable at the scale we need to deploy them.

*Click anywhere to close this message.*

</tooltip>

<next>Proceed</next>

<miniscore :score="score" round="0"/>

---

Because these technologies are speculative, there's a chance that the research will be unproductive and your money will be lost. However, if the research is successful, it could be a game-changer in terms of its impact on the environment.

The profit margins will be slim – if the research is successful, you'll get your tokens back, and you'll get 1 additional token of profit.

So if you put in 1 token and the research is successful, you get 2 tokens back. If you put in 4 tokens, you'd get 5 back.

<next>When you're ready, proceed.</next>

---

At the moment, there's a 10% chance of the research yielding fruit. Each token invested in a technology will increase the chance of success by 10%.

You have three minutes in your breakout rooms to decide how much, if anything, you'd like to invest in one or both of these technologies. You should also decide who will reveal your bank’s decision.

<br/>
<br/>

<next>When you're back from the breakout rooms, proceed.</next>

<countdown duration="180"/>


---

Welcome back. It’s time to see what was decided.

One player from each bank will reveal how much you are investing.

*Investment announcers, please identify yourselves.*
*On the count of three, send a message to the group chat that looks like this:*

<p>&#8220 [Bank Name], Concredible [# of tokens invested], Behemoss [# of tokens invested] &#8221</p>

<next>When all banks have revealed their decision, proceed</next>

---

# Results
*Click the question marks to record each bank’s decision.*

<next :disabled="!(investments.concredible.funded || investments.concredible.funded === 0) || !(investments.behemoss.funded || investments.behemoss.funded === 0)" >When you're ready, proceed.</next>

<br/>
<br/>

<investments :banks="banks" v-on:invest="setInvestment">

---

# Research takes time.
# We’ll see the results of the research later.

<next>Proceed.</next>

---

# Internal Bank Dynamics

Banks are not monolithic structures. They are made up of hundreds or thousands of employees. Many employees would like their banks to be more climate active, but they have their own <tooltip-for el="#concerns">concerns and pressures</tooltip-for>.

Sometimes bank employees reach out to external allies like NGOs and newspapers. These organisations apply scrutiny and pressure which can nudge the banks to more sustainable actions.

<next>When you're ready, proceed.</next>

<tooltip id="concerns">

Often bank employee earnings are tied to quarterly targets or stock prices

*Click anywhere to close this message.*

</tooltip>

<miniscore :score="score" round="Interstitial A"/>

---

You are about to make a choice as an individual, not with the rest of your bank.

We're going to offer you now a chance to share some information about your bank with a climate NGO.

This is a choice you make privately.

<next>When you're ready, proceed.</next>

---

If you want to engage with external allies, you'll send a private message to the facilitator with the word ALLY.

Don't do this yet! We'll go bank by bank – so wait for your bank's turn before you send a message.

*How to send a private message: Use the chat function. Click on the facilitator's name. Then type and send the word ‘ALLY’.*

<next>When you're ready, proceed.</next>

---

Be warned: even though this is secret, taking this step may have consequences for your own career.

But that extra scrutiny might benefit your bank too.

The risks and rewards for this decision won't be clear until later.

<next>When you're ready, proceed.</next>

---

<slide class="middle-title" />

<ally-pause :banks="banks">
</ally-pause>

---

# Results
*Facilitator: click on the banks that had at least one employee message ALLY.*
<br/>
<br/>
<next>When you're done, proceed.</next>

<ally-results :banks="banks" />


---

# Results

There is a wave of public pressure and scrutiny applied to banks who brought in external allies. The short-term affect is to impact the reputation of those banks, which affects their market share.

**All banks who had someone reach out to external allies lose 1 token.**

We'll see the long-term effects of this decision later.

<next>When you're ready, proceed.</next>

---

# Let’s take a look at the scores.

<next>Proceed.</next>

---
<slide class="scores" />

<div>
    <scoreboard :score="score" rounds="['Round 1','Interstitial A']"  :banks="banks"></scoreboard>
</div>

<next>When you're ready, proceed.</next>

---

# Round 2

It's two years in the future. In the last few months, public debate has focused on banks providing loans to fossil fuel companies.  

Your bank, like many others, has contracts with fossil fuel companies. You plan to conclude these loans by 2050 as part of your net zero plans.  

But now you're under pressure to speed up these plans.

<next>Proceed.</next>

---

Climate NGOs argue that 2050 is too far away. They want banks to commit to more ambitious timeframes for phasing out fossil fuels.

On the other hand, an unrealistic deadline will make your bank look naive, and will be embarrassing if you can't achieve it.

Your bank's sustainability team has proposed to bring forward your deadline for phasing out fossil fuels to 2035.

<next>Proceed.</next>

---

You have two options:

- You can <span class="raise">raise</span> your commitment and promise to be completely out of fossil fuels by 2035.
- Or you can <span class="stick">stick</span> to your current commitments and retain your deadline of no more fossil fuels by 2050.

You've got a press conference tomorrow to make a public statement, and you need to make your decision.

<next>Proceed.</next>

---

Public pressure is mounting for significant climate action, but it's still costly for banks to make the first move if their peers don't follow.

Remember, if the banks do different things, then:

- All the banks who **<span class="raise">raised</span>** their commitment **lose 2 points**.
- All the banks who **<span class="stick">stuck</span>** with their current commitment **gain 1 point**.

<next>Proceed.</next>
---

In just a moment, you’ll meet with your team to make decisions:

- Who will make the public announcement – who will hold up the piece of paper? 
- Decide whether to **<span class="raise">raise</span>** your commitment or **<span class="stick">stick</span>**.

<next>Proceed.</next>

---

One more thing: if you **<span class="stick">stuck</span>** with your existing commitments in the previous round, there's now a <tooltip-for el="#twotoken">2 token cost</tooltip-for> to raise your commitment.  

If you **<span class="raise">raised</span>** your commitment last turn, it doesn't cost anything additional to continue to raise this turn.  

*In your breakout room, decide whether to stick or raise. You have 5 minutes.*
<br/>
<br/>
<next>When you’re back from your breakout rooms, proceed.</next>

<tooltip id="twotoken">

That's because you've already got a lot of momentum behind your current trajectory and it's hard to change course.

*Click anywhere to close this message.*

</tooltip>

<countdown duration="300">


---

Welcome back. It’s time to see what was decided.  

One player from each bank will make the announcement.  

*Announcers, please identify yourselves and prepare your arrow.  
On the count of three, simultaneously reveal your arrow pointing up or down.*

<next>When all banks have revealed their decision, proceed.</next>

---

# Results
*Click the question marks to record each bank’s decision.*

<next :disabled="score.commitments[1] == 'UNDECIDED'">
    <span v-if="score.commitments[1] == 'UNDECIDED'">
        When all banks have revealed their decision, proceed.
    </span>
    <span v-else>When you're ready, proceed.</span>
</next>


<commitments :banks="banks" round="1" v-on:commit="setCommitment" :score="score">

---

<slide class="middle-title"/>

# Let’s take a look at the scores.

<next>When all banks have revealed their decision, proceed.</next>


---
<slide class="scores"/>

<div>
<scoreboard :score="score" rounds="['Round 1', 'Interstitial A', 'Round 2']" :banks="banks" />
</div>

<next>When you're ready, proceed.</next>

---

<news-update :score="score" part="1"></news-update>

<next>When you're ready, proceed.</next>

---

# New Regulation

One of the biggest drivers in the financial system are governments and regulators. The decisions of governments and central banks shape the landscape that banks operating within since they determine the rules that banks are required to comply with.  

To break the deadlock of climate inaction, financial regulators have put forward two possible policies. The banks will vote on which they prefer.

<next>When you're ready, proceed.</next>


---

The first policy is **Green Subsidies.**  

This is a package of laws which ease capital holding restrictions for
sustainable loans and inject money directly into green sectors.  

If we go with this policy, banks get 3 tokens for each occasion they’ve previously raised their commitment.  

<next>When you're ready, proceed.</next>

---

The second policy is **Enhanced Credit Guidance.**

In this case, central banks and regulators take a much more interventionist role and block certain kinds of loans to high-carbon sectors.  

If we go with this policy, each bank pays **1 token**, and we remove the transition cost for banks to raise their commitments.

<next>When you're ready, proceed.</next>

---

You'll decide in your breakout rooms which policy you're going to vote for.  

Then you’ll have the opportunity to spend tokens to buy additional votes.  

You can negotiate with other banks and make the decision collectively if you like.

<next>When you're ready, proceed.</next>

---

Before you go to your breakout rooms:  

The employees who engaged with external allies previously have now been found out. Rocking the boat this way has had an impact on your career.  

For this next decision, the bank has locked you out of the conference room as potential trouble- makers.  

You can stand at the glass doors, but you can't speak.

*If you messaged ALLY earlier, mute your microphone and don't use the chat during this discussion. 
You can gesture as much as you like to express your opinion.*

<next>When you're ready, proceed.</next>

---

The policy choices are:

- **GreenSubsidies**: banks get 3 tokens for each occasion they’ve previously raised their commitment <br><br>
- **Enhanced Credit Guidance**: each bank pays 1 token, and we remove the transition cost for banks to raise their commitments.

*In your breakout rooms, decide which policy to vote for and discuss whether you will buy additional votes. You have 3 minutes.*

<next>When you're ready, proceed.</next>


<countdown duration="180">

---

# Voting
*Select each banks votes, one regulation must win*
<div>
    <regulation-votes :banks="banks"></regulation-votes>
</div>
<next :disabled="score.winningRegulation == 'TIE'">When all voting is finished, proceed.</next>

---

<slide class="middle-title" />

# Let’s take a look at the scores.

<next>Proceed.</next>

---
<slide class="scores"/>

<div>
<scoreboard :score="score" rounds="['Round 1', 'Interstitial A', 'Round 2', 'Interstitial B']" :banks="banks" />
</div>

<next>When you're ready, proceed.</next>

---

# Round 3
It's now six years in the future. Severe weather events are impacting the planet and the urgency around climate action has reached a critical point.  

Industries are under increasing pressure to decarbonise. Many people say that banks are responsible for the emissions of the businesses they loan money to. NGOs say that banks should be actively forcing their clients to decarbonise and cancelling contracts with those that don't move fast enough. Other people argue that a bank's job is to offer clients a service, not to interfere with their business.

Should banks be helping fund their clients' decarbonisation?

<next>Proceed.</next>

---

You have two options:

- You can **<span class="raise">raise</span>** your commitment and financially incentivise your clients to accelerate their decarbonisation. This includes investing money to drive up the pace of change in emerging green sectors. <br> <br>
- Or you can **<span class="stick">stick</span>** to your current commitments and continue to honour your existing relationships. You can help clients to transition to net zero if they want it, but you won't force them before they're ready.

<next>Proceed.</next>

---

This is the last round of the game. As in previous rounds, if the banks do different things, then:

- All the banks who **<span class="raise">raised</span>** their commitment **lose 2 points**.  

- All the banks who **<span class="stick">stuck</span>** with their current commitment **gain 1 point**.

<next>Proceed.</next>

---

In just a moment, you’ll meet with your team to make decisions:

- Who will make the public announcement – who will hold up the piece of paper? 
- Decide whether to **<span class="raise">raise</span>** your commitment or **<span class="stick">stick</stick>**.

<next>Proceed.</next>

---

<div v-if="score.winningRegulation == 'GREENSUBSIDIES'">

One more thing: if you <span class="stick">**stuck**</span> with your existing commitments in the previous round, there's now a <tooltip-for el="#tokens">3 token cost</tooltip-for> to raise your commitment.

If you <span class="raise">**raised**</span> your commitment last turn, it doesn't cost anything additional to continue to raise this turn.


</div>
<div v-else> 

Because of new regulation **Enhanced Credit Guidance**, there is no cost to raise your commitment if you stuck last turn.

</div>

*In your breakout room, decide whether to stick or raise. You have 5 minutes.*
<br><br>
<br><br>


<div>
    <next>When you’re back from your breakout rooms, proceed.</next>
</div>

<countdown duration="300"/>
---

Welcome back. It’s time to see what was decided.  

One player from each bank will make the announcement.  

*Announcers, please identify yourselves and prepare your arrow.  
On the count of three, simultaneously reveal your arrow pointing up or down.*

<next>When all banks have revealed their decision, proceed.</next>

---

# Results
*Click the question marks to record each bank’s decision.*
<next :disabled="score.commitments[2] == 'UNDECIDED'" >When all bank decisions have been recorded, proceed.</next>

<commitments :banks="banks" round="2" v-on:commit="setCommitment" :score="score">

---

<slide class="middle-title" />

# Before we reveal the final scores...

<next>Proceed.</next>

---

<h1> Halo Effect </h1>

<p>
<br/><br/>
If your bank had someone in it that messaged ALLY, you've been under much more public scrutiny from external NGOs. You've been criticised for your mistakes – but also, there's more attention on the good things you've done.</p>

<next>Proceed.</next>

---

If you engaged with external allies and your bank has raised its commitment two or more times, you have established a reputation as a ‘green leader’. You have access to the best green financeable projects, and a great customer base.  

This has a financial benefit to your bank of **2 tokens**.  

<div v-if="banks.filter(b => b.publicPressure).length">

The following banks receive this bonus:  

<div class="public-pressure-results" v-for="(b,i) in banks.filter(b => b.publicPressure)" :key="i">
    <div class="bank">
        <div class="avatar"><i :class="['fa-light', b.avatar]"></i></div>
        <div>{{b.name}} Bank </div>
    </div>
</div>

</div>
<div v-else >

*Unfortunately, no one engaged with external allies*

</div>

<next>Proceed.</next>

---

# R&D Results

Let's check in to see how our R&D went. Were either of our green startups successful?

Without any additional funding, there was a 10% chance that research would be successful. Collectively, the banks contributed tokens to research, which brings the likelihood of success up by 10% per invested token. After investment, the odds look like this:

<div class="investment-results">
    <div><i class="fa fa-building orange"></i> {{investments.concredible.funded * 100}}% chance of success</div>
    <div><i class="fa fa-seedling green"></i> {{investments.behemoss.funded * 100}}% chance of success</div>
</div>

<next>Proceed.</next>

---
<slide class="investment-results-plus" />
<div v-if="investments.concredible.successful">

### <i class="fa fa-building orange"></i> Concredible Research – Success  

Great news. The research is successful and we're able to introduce the tech at scale.  

For those banks that invested in this technology, you're able to make your investment back – you get back the same number of tokens you invested, plus 1.  

And we'll see the impact of this technology on our sustainability efforts later.

<div class="actions">
    <div class="bank" v-for="b in banks.filter(bb => bb.investments.concredible > 0)">
        <div class="avatar"><i :class="['fa-light', b.avatar]"></i></div>
        <p> {{b.name}} Bank</p>
    </div>
</div>

</div>
<div v-else>

### <i class="fa fa-building orange"></i> Concredible Research – Failure  

Unfortunately, despite the best efforts of scientists, we haven't been able to produce a carbon capture technology that works at scale. There are many great prototypes, but they are too expensive and energy-consuming to provide a meaningful contribution to the solution.

For those banks that invested in this research, I'm afraid you won't make your money back. And we'll need to address our impact on the environment without relying on transformative technology.

</div>

<next>Proceed.</next>

---
<slide class="investment-results-plus" />

<div v-if="investments.behemoss.successful">

### <i class="fa fa-seedling green"></i> Behemoss Research – Success  

Great news. The research is successful and we're able to introduce the tech at scale.
For those banks that invested in this technology, you're able to make your investment back – you get back the same number of tokens you invested, plus 1.

And we'll see the impact of this technology on our sustainability efforts later.

<div class="actions">
    <div class="bank" v-for="b in banks.filter(bb => bb.investments.behemoss > 0)">
        <div class="avatar"><i :class="['fa-light', b.avatar]"></i></div>
        <p> {{b.name}} Bank</p>
    </div>
</div>

</div>
<div v-else>

### <i class="fa fa-seedling green"></i> Behemoss Research – Failure  

Unfortunately, despite the best efforts of scientists, we haven't been able to produce a carbon capture technology that works at scale. There are many great prototypes, but they are too expensive and energy-consuming to provide a meaningful contribution to the solution.  

For those banks that invested in this research, I'm afraid you won't make your money back. And we'll need to address our impact on the environment without relying on transformative technology.

</div>

---

<scoreboard :score="score" rounds="['Round 1', 'Interstitial A', 'Round 2', 'Interstitial B', 'Round 3', 'Final Score']" :banks="banks" />

---

The most successful bank in terms of market advantage was {{score.banks.reduce((p,v) => { return p['Final Score'] > v['Final Score'] ? p : v }).name}} Bank. Well done!

---

# Net Zero

Finally, how did we go with our transition to net zero?
In this game, we use the decisions you made as an indication of how the financial sector as a whole manages the transition to net zero.
The more raised commitments you made collectively, the better for the planet.

---

We had {{banks.length}} banks over three turns, so there were a total of {{banks.length * 3}} opportunities to raise your commitments.

According to the IPCC and the IEA, it's still possible to achieve the Paris targets of 1.5 degrees above preindustrial levels. But to hit those targets, everything has to go right.

In our model, if you made {{banks.length * 3}} raised commitments, we would be on a Paris-aligned pathway. Out of {{banks.length * 3}} possible raised commitments, you managed to make {{score.totalCommitments}}.

Thanks to the deployment of the new carbon capture technology, there has been a reduction in the amount of atmospheric greenhouse gases. Each successfully researched green technology adds the equivalent of one raised commitment.

In our model, that places us on a pathway to {{score.degrees}} degrees above preindustrial levels.

---
<div v-if="score.degrees == 1.5">

# 1.5 
At the end of the 2020s, the world is on a Paris-aligned pathway to 1.5 degrees above preindustrial levels.
There will be an increase in severe weather events, the loss of many coastal ecosystems and the drying out of many agricultural regions, affecting hundreds of millions of people.
But thanks to the proactive response by the finance sector in the 2020s, the damage is far less than it could have been. Banks worked together to cut off funding for fossil fuels, to decarbonise across sectors, and to support the global transition to net zero.
There will still be some significant disruptions to the financial system expected over the coming decades, but because of the extraordinary leadership of the banks, it's possible to imagine a future on a healthy planet.

</div>
<div v-if="score.degrees == 2">

# 2
In the 2020s, the finance sector moved away to cut off funding for fossil fuels, to decarbonise across sectors, and to support the global transition to net zero.
Unfortunately, the sector did not quickly enough to achieve the goals of the Paris Agreement. There was disagreement and conflict within the sector, and as a result, the planet is on track for roughly 2 degrees warming.
That means a massive increase in severe weather events, the loss of many coastal ecosystems and the drying out of many agricultural regions. Some regions of the tropics may become uninhabitable due to rising heat, meaning the forced migration of millions of people by the end of the century. Massive recessions are very likely and there will be significant disruptions to the financial system.
But thanks to the hard work of many people in different banks, the damage is less than it could have been, and we can hope for a better future on the planet.

</div>
<div v-if="score.degrees == 3">

# 3
In the 2020s, the finance sector struggled to transition away from carbon-intensive investments. Although some banks made serious commitments, many dragged their feet. There were many disagreements and very little trust.
As a result, we have missed the Paris targets by a large margin. The planet is on a pathway to approximately 3 degrees warming.
This means the likely collapse of many ecosystems, the loss of many coastal cities. Large regions of the tropics will be uninhabitable due to rising heat, meaning the forced migration of hundreds of millions of people by the end of the century. Massive recessions are guaranteed and the collapse of the current economic system is a remote but real possibility.
But thanks to the hard work of many people in different banks, the damage is less than it could have been, and we can hope for a better future on the planet.

</div>
<div v-if="score.degrees == 3.5">

3.5
In the 2020s, the finance sector failed to transition away from carbon-intensive investments.Although some banks made attempts to adjust, most dragged their feet.
As a result, we have missed the Paris targets by a large margin. The planet is on a pathway to a predicted 3.5 degrees warming.
This means the likely collapse of many ecosystems, the loss of coastal cities. Large regions of the tropics will be uninhabitable due to rising heat, meaning the forced migration of hundreds of millions of people by the end of the century. Massive recessions are guaranteed and the collapse of the current economic system is a very real possibility.

</div>
---

# Debrief

Thank you for playing The Pledge. We'd like to leave you with three questions to discuss among yourselves.

1. How did you balance profitability for your bank and planetary well-being while playing the game?

2. What do you think is required in order to accelerate the decarbonisation of the banking sector and the real economy?

3. What actions are you able to take to help the transition to net zero?

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