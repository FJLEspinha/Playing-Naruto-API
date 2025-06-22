

let index = 
    {
    page: 1
    }

async function getInfoCharacters() {
    const data = await fetch("http://localhost:8080/characters?page="+index.page)
    const dataJson = await data.json()
    const characters = dataJson[0].characters
    return characters
    
}




async function getCharacterInfo(id){
    const data = await fetch("http://localhost:8080/characters/" + id)
    const characterInfo = await data.json()
    return characterInfo
}

export {getInfoCharacters, getCharacterInfo, index}