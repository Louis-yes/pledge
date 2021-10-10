function thePledge(el){
    // bank {
    //     name: string, short
    //     qualities: string, paragraph,
    //     tokens: 6,
    //     publicPressure: boolean
    // }
    
    el.innerHTML = pressie(deck()).join("")
    PetiteVue.createApp({ 
        // todo - create data and methods to represent the game
    }).mount()
}