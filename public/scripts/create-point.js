function populateUf() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json())
    .then(states =>{
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUf(event)
function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=stateName]")

    const stateIndex = event.target.selectedIndex

    stateInput.value = event.target.options[stateIndex].text

    citySelect.innerHTML = ""
    citySelect.disabled = true
    let ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = 
    fetch(url)
    .then(res => res.json())
    .then(cities =>{
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}


document.querySelector("select[name=uf]")
        .addEventListener("change", getCities)


//Itens de coleta!

const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itensToCollect){
    item.addEventListener("click", handleSelectIten)
}

const collectedItems = document.querySelector("[name=items]")



let selectedItems = []
function handleSelectIten(){

    const itemLi = event.target
    //adicionar ou remover uma class com js


    const itemId = itemLi.dataset.id

    console.log("Item ID", itemId)

    itemLi.classList.toggle("selected")

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
    return itemFound})

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })
        selectedItems = filteredItems

    }else{
        selectedItems.push(itemId)
    }

    console.log("SelectItems", selectedItems)

    collectedItems.value = selectedItems
}