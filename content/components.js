const deckContent = `
<!-- This is where the slide deck starts! treat it like markdown, but you can also include html and vue-petite components :) -->

<!-- name=title-page -->

# Welcome to The Pledge.

---

<div v-scope>
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <h2><input class="bn input name" v-model="bank.name" type="text"></h2>
        <span v-for="t in bank.tokens" :key="t">
            *
        </span>
        <span @click="removeBank(i)" class="db pointer underline-hover o-0 remove">x</span>
    </div>
    <span @click="addBank" class="mt3 underline-hover dib pointer add">Add Bank</span>
</div>

---

<div v-scope>
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <h2> {{bank.name}} Bank</h2>
        <form class="commitments">
        <input type="radio" v-model="bank.commitments[0]" name="commitment" :id="bank.name + '-raise'" value="1"><label :for="bank.name + '-raise'" class="pointer">Raise</label> 
        <input type="radio" v-model="bank.commitments[0]" name="commitment" :id="bank.name + '-stick'" value="0"><label :for="bank.name + '-stick'" class="pointer">Stick</label> 
        </form>
    </div>
</div>

---

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

<div v-scope>
    <div class="bank"  v-for="(bank,i) in banks" :key="i">
        <h2>{{bank.name}}</h2>
        <button @click="bank.lobbyVotes++" class="pointer underline-hover button bn bg-black white">Vote</button>
        <span v-for="v in bank.lobbyVotes" :key="v" class="pointer underline-hover" @click="bank.lobbyVotes--">$</span>
    </div>
</div>

---

<div v-scope>
        <div class="bank" v-for="(bank,i) in banks" :key="i">
                <h2> {{bank.name}} Bank</h2>
            <form class="publicpressure">
                <input type="checkbox" v-model="bank.publicPressure" name="publicPressure" :id="bank.name + '-pp'" :value="true"><label :for="bank.name + '-pp'" class="pointer">Public Pressure</label> 
            </form>
        </div>
</div>

---

<div v-scope>
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <h2> {{bank.name}} Bank</h2>
        <form class="commitments">
        <input type="radio" v-model="bank.commitments[1]" name="commitment" :id="bank.name + '-raise'" value="1"><label :for="bank.name + '-raise'" class="pointer">Raise</label> 
        <input type="radio" v-model="bank.commitments[1]" name="commitment" :id="bank.name + '-stick'" value="0"><label :for="bank.name + '-stick'" class="pointer">Stick</label> 
        </form>
    </div>
</div>

---

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

<div v-scope>
    <div class="bank" v-for="(bank,i) in banks" :key="i">
        <h2> {{bank.name}} Bank</h2>
        <form class="commitments">
        <input type="radio" v-model="bank.commitments[2]" name="commitment" :id="bank.name + '-raise'" value="1"><label :for="bank.name + '-raise'" class="pointer">Raise</label> 
        <input type="radio" v-model="bank.commitments[2]" name="commitment" :id="bank.name + '-stick'" value="0"><label :for="bank.name + '-stick'" class="pointer">Stick</label>
        </form>
    </div>
</div>

---

Thank you for playing *The Pledge*

<!-- This is where the slide deck ends! Don't edit further than here unless you know what you're doing! -->
`
function deck(){
    return deckContent
}
