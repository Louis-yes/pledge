const deckContent = `
<!-- This is where the slide deck starts! treat it like markdown, but you can also include html and vue-petite components :) -->
Welcome.

For this activity, you’ll need a  pen and paper. A thick pen or a marker is ideal, but not necessary.

Also it might be handy to have a handful of coins, paperclips or buttons to keep track of your score.

---

# THE PLEDGE:
## NET ZERO in 60 MINUTES

---

<!-- 
heal 
theme="red"
-->
# OBJECTIVES
- be a profitable 
financial institution
- take care of the planet

---

# roles
- HEAD OF COMMS
  - You’re responsible for thinking about the bank’s public-facing reputation.
- CEO
  - You want decisions to reflect your bank’s brand and ethos.
- CHIEF FINANCIAL OFFICER
  - Your focus is on the bank's profit & loss.
- RISK OFFICER
  - You want to ensure the long-term financial stability of the bank.
- PORTFOLIO MANAGER
  - Your job security depends on meeting quarterly income targets.


---

<div v-scope>
  <label>How many birds are you going to kill?</label>
  <input v-model="count">
</div>

---

<span v-scope>

# {{count}} dead birds 

</span>

---

<span v-scope>

# {{count}} dead birds 

<span v-if="count > 10">

that's too many I'm afraid

</span>

<span v-else-if="count > 0">

that's not too many

</span>

<span v-else>

brilliant

</span>

</span>

<!-- This is where the slide deck ends! Don't edit further than here unless you know what you're doing! -->
`
function deck(){
    return deckContent
}
