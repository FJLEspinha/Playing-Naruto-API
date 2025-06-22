import { renderCharacters, renderCharacterInfo, renderAllSearchResult } from "./Render/charactersShow.js"
import { index } from "./Data/CharactersData.js"

const containerCharacters = document.querySelector("#characters-container")
const buttonBack = document.querySelector("#back")
const buttonNext = document.querySelector("#next")
const searchForm = document.querySelector("#search-form")

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault()
    const name = document.querySelector("#name").value

    const response = await fetch(`http://localhost:8080/characters/search?name=${encodeURIComponent(name)}`)
    const dataResponse = await response.json()
    const identifier = {
        id: dataResponse[0].id
    }
   
    if (dataResponse.length === 1){
        return renderCharacterInfo(identifier.id)
    }
    if(dataResponse.length > 1) {
     
        return renderAllSearchResult(dataResponse)
    }
})





renderCharacters()




buttonNext.addEventListener('click', () => {
    index.page++
    containerCharacters.textContent = ''
    renderCharacters()
})

buttonBack.addEventListener('click', () => {
    if(index.page === 1){
        // TODO: Add visual information for user
       return console.log('You are in the first page') 
    }
    index.page--
    containerCharacters.textContent = ''
    renderCharacters() 
})


export {buttonBack, buttonNext, containerCharacters}

