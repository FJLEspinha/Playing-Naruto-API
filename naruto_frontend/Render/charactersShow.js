import { getInfoCharacters, getCharacterInfo } from "../Data/CharactersData.js"
import { buttonBack, buttonNext, containerCharacters } from "../main.js"

async function renderCharacters() {
    const characters = await getInfoCharacters()
    buttonBack.style.display = 'inline'
    buttonNext.style.display = 'inline'
    containerCharacters.textContent = ''
     

    characters.forEach(character => {
        const buttonCharacter = document.createElement("button")
        buttonCharacter.className = "card-character"
        buttonCharacter.id = character.id
        buttonCharacter.onclick = () => renderCharacterInfo(character.id)

        const h2Name = document.createElement("h2")
        h2Name.textContent = character.name

        const image = document.createElement("img")
        image.className = "image-character"
        image.alt = character.name
        image.src = character.images[0]

        buttonCharacter.appendChild(h2Name)
        buttonCharacter.appendChild(image)

        containerCharacters.appendChild(buttonCharacter)

    });

}

async function renderCharacterInfo(id) {
    const characterInfo = await getCharacterInfo(id)

    const section = document.createElement('section')
    section.id = characterInfo.name

    const buttonGoBack = document.createElement('button')
    buttonGoBack.id = 'go-back'
    buttonGoBack.textContent = 'Go back'
    buttonGoBack.onclick = () => renderCharacters()

    section.appendChild(buttonGoBack)

    const h1Name = document.createElement('h1')
    h1Name.textContent = characterInfo.name


    section.appendChild(h1Name)


    const image = document.createElement('img')
    image.id = 'image-character-info'
    image.src = characterInfo.images[0]
    image.alt = characterInfo.name


    section.appendChild(image)


    const sectionPersonal = document.createElement('section')
    sectionPersonal.id = 'personal-info'

    const h4birthdate = document.createElement('h4')
    h4birthdate.textContent = 'Birthdate: ' + characterInfo.personal.birthdate

    const h4sex = document.createElement('h4')
    h4sex.textContent = 'Sex: ' + characterInfo.personal.sex

    sectionPersonal.appendChild(h4birthdate)
    sectionPersonal.appendChild(h4sex)
    if (characterInfo.personal.clan !== null && characterInfo.personal.clan !== undefined) {
        const h4Clan = document.createElement('h4')
        h4Clan.textContent = 'Clan: ' + characterInfo.personal.clan
        sectionPersonal.appendChild(h4Clan)

    }

    section.appendChild(sectionPersonal)


    const sectionJutsu = document.createElement('section')
    sectionJutsu.id = 'jutsus'

    const olList = document.createElement('ol')
    olList.id = 'jutsu-list'


    const h4JustuList = document.createElement('h4')
    h4JustuList.textContent = 'Jutsus:'

    sectionJutsu.appendChild(h4JustuList)

    characterInfo.jutsu.forEach(jutsu => {
        const liJutsu = document.createElement('li')
        liJutsu.textContent = jutsu
        olList.appendChild(liJutsu)
    })
    sectionJutsu.appendChild(olList)
    section.appendChild(sectionJutsu)


    containerCharacters.textContent = ''
    buttonBack.style.display = 'none'
    buttonNext.style.display = 'none'
    containerCharacters.appendChild(section)
}

async function renderAllSearchResult(data) {
    containerCharacters.textContent = ''
    buttonBack.style.display = 'none'
    buttonNext.style.display = 'none'
    const character = await data

      const sectionTop = document.createElement('section')
      sectionTop.id = 'section-go-back'
       const buttonGoBack = document.createElement('button')
        buttonGoBack.id = 'go-back'
        buttonGoBack.textContent = 'Go back'
        buttonGoBack.onclick = () => { 
            renderCharacters()
            document.querySelector("#section-go-back").remove()
        }
        sectionTop.appendChild(buttonGoBack)

        document.body.prepend(sectionTop)


          const div = document.createElement('div')
        div.className = 'results-search'
        
    for(let i=0; i<character.length; i++){
        character[i] = await getCharacterInfo(character[i].id)

        const section = document.createElement('section')
        section.id = character[i].name
        section.className = 'card-character'

 
        const h1Name = document.createElement('h1')
        h1Name.textContent = character[i].name


        section.appendChild(h1Name)

        if (character[i].images !== 0) {
            const image = document.createElement('img')
            image.id = 'image-character-info'
            image.src = character[i].images[0]
            image.alt = character[i].name


            section.appendChild(image)
        }

        const sectionPersonal = document.createElement('section')
        sectionPersonal.id = 'personal-info'

        if (character[i].personal.hasOwnProperty("birthdate")) {
            const h4birthdate = document.createElement('h4')
            h4birthdate.textContent = 'Birthdate: ' + character[i].personal.birthdate
            sectionPersonal.appendChild(h4birthdate)
        }
      
        if (character[i].personal.hasOwnProperty("sex")) {
            const h4sex = document.createElement('h4')
            h4sex.textContent = 'Sex: ' + character[i].personal.sex

            sectionPersonal.appendChild(h4sex)
        }


        if (character[i].personal.hasOwnProperty("clan")) {
            const h4Clan = document.createElement('h4')
            h4Clan.textContent = 'Clan: ' + character[i].personal.clan
            sectionPersonal.appendChild(h4Clan)

        }

        section.appendChild(sectionPersonal)


        const sectionJutsu = document.createElement('section')
        sectionJutsu.id = 'jutsus'

        const olList = document.createElement('ol')
        olList.id = 'jutsu-list'


        const h4JustuList = document.createElement('h4')
        h4JustuList.textContent = 'Jutsus:'

        sectionJutsu.appendChild(h4JustuList)

        if (character[i].jutsu !== null && character[i].jutsu !== undefined) {
            character[i].jutsu.forEach(jutsu => {
                const liJutsu = document.createElement('li')
                liJutsu.textContent = jutsu
                olList.appendChild(liJutsu)
            })
            sectionJutsu.appendChild(olList)
        }
        section.appendChild(sectionJutsu)
        div.appendChild(section)
        containerCharacters.appendChild(div)
   
    }

}

export { renderCharacters, renderCharacterInfo, renderAllSearchResult }