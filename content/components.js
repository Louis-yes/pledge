const deckContent = `
<!-- This is where the slide deck starts! treat it like markdown, but you can also include html and vue-petite components :) -->

<slide class="landing-page">

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

<!-- Bank introduction screen -->
### Lets look at the banks

<div v-scope>
    <div v-if="banks.length < 1">
        <div class="add-bank bg-btn"></div>
        <span>Click to add bank</span>
    </div> 
    <div v-else>
        <div class="bank" v-for="(bank,i) in banks" :key="i">
            <span @click="removeBank(i)" class="db pointer underline-hover o-0 remove">x</span>
        </div>
        <span @click="addBank" class="mt3 underline-hover dib pointer add">Add Bank</span>
    </div>
</div>

---
<!-- Bank commitments screen -->
<div v-scope>
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <h2> {{bank.name}} Bank</h2>
        <form class="commitments">
        <input type="radio" v-model="bank.commitments[0]" name="commitment" :id="bank.name + '-raisecc0'" value="1"><label :for="bank.name + '-raisecc0'" class="pointer">Raise</label> 
        <input type="radio" v-model="bank.commitments[0]" name="commitment" :id="bank.name + '-stickcc0'" value="0"><label :for="bank.name + '-stickcc0'" class="pointer">Stick</label> 
        </form>
    </div>
</div>

---

<!-- Points round up 1 -->
<div v-scope>
    <h1>
        Points for round one
    </h1>
    <div class="bank" v-for="(bank,i) in roundOneScore.banks" :key="i">
        <h2> {{bank.name}} Bank</h2>
        <span v-for="t in bank.tokens" :key="t">
            *
        </span>
    </div>
</div>

---

<!-- lobby votes -->
<div v-scope>
    <h1>Lobbying</h1>
    <div class="bank"  v-for="(bank,i) in banks" :key="i">
        <h2>{{bank.name}}</h2>
        <button @click="bank.lobbyVotes++" class="pointer underline-hover button bn bg-black white">Vote</button>
        <span v-for="v in bank.lobbyVotes" :key="v" class="pointer underline-hover" @click="bank.lobbyVotes--">$</span>
    </div>
</div>

---

<!-- Public Pressure -->
<div v-scope>
        <div class="bank" v-for="(bank,i) in banks" :key="i">
                <h2> {{bank.name}} Bank</h2>
            <form class="publicpressure">
                <input type="checkbox" v-model="bank.publicPressure" name="publicPressure" :id="bank.name + '-pp'" :value="true"><label :for="bank.name + '-pp'" class="pointer">Public Pressure</label> 
            </form>
        </div>
</div>

---

<!-- Bank commitments screen 2 -->

<div v-scope>
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <h2> {{bank.name}} Bank</h2>
        <form class="commitments">
        <input type="radio" v-model="bank.commitments[1]" name="commitment" :id="bank.name + '-raisecc1'" value="1"><label :for="bank.name + '-raisecc1'" class="pointer">Raise</label> 
        <input type="radio" v-model="bank.commitments[1]" name="commitment" :id="bank.name + '-stickcc1'" value="0"><label :for="bank.name + '-stickcc1'" class="pointer">Stick</label> 
        </form>
    </div>
</div>

---

<!-- Points round up 2 -->

<div v-scope>
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

<div v-scope>
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

<div v-scope>
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

<div v-scope>
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
export default function deck(){
    return deckContent
}
