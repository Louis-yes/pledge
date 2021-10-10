function thePledge(el){
    el.innerHTML = pressie(deck()).join("")
    PetiteVue.createApp({ count: 0 }).mount()
}