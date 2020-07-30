/* Shorten It CTA section */
let inputLink = document.querySelector('#shorten-it__input-link')
let shortenItBtn = document.querySelector('#shorten-it__btn')

/* Shortened Links section */
let copyBtn = document.querySelectorAll('.copy-btn')
let shortenItItem = document.querySelectorAll('.shorten-it__links-item')
let shortenItResultURL = document.querySelectorAll('.shorten-it__links-item--result-url')
let shortenItLinks = document.querySelector('.shorten-it__links-item--add')

let shortenedLinksContainer = document.querySelector('.shorten-it__links')

let shortenedLinks = []

let shortenedLink = {
    id: '',
    link: '',
    shortenedURL: '',
    style: ''
}

let myURL = `https://jiroricaro.netlify.app`
const relAPI = `https://rel.ink/api/links/`


let fetchURL = async (link) => {
    let response = await fetch(relAPI, { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: link }) })
    let json = await response.json(link)
    return {
        url: relAPI + json.hashid
    } 
}

let addShortenedLinkStyle = () => {
    let parent_element
    let child_element_link
    let child_element_result
    let child_element_result_url
    let child_element_result_copy

    /* parent element */
    parent_element = document.createElement('article')
    parent_element.setAttribute('class', 'shorten-it__links-item')
    shortenedLinksContainer.appendChild(parent_element)
    /* parent element */

    /* child element LINK */
    child_element_link = document.createElement('p')
    child_element_link.innerHTML = inputLink.value
    child_element_link.setAttribute('class', 'shorten-it__links-item--add')
    parent_element.appendChild(child_element_link)
    /* child element LINK */

    /* child element result parent div*/
    child_element_result = document.createElement('div')
    child_element_result.setAttribute('class', 'shorten-it__links-item--result')
    parent_element.appendChild(child_element_result)
    /* child element result parent div*/

    /* child element result url*/
    child_element_result_url = document.createElement('p')

    child_element_result_url.innerHTML = 
        fetchURL(inputLink.value).
        then(results => {
            results.url.replace('/api/links/','/')
        }).
        catch(err => console.error(err))

    child_element_result_url.setAttribute('class', 'shorten-it__links-item--result-text')
    child_element_result.appendChild(child_element_result_url)
    /* child element result url*/

    /* child element result copy button*/
    child_element_result_copy = document.createElement('button')
    child_element_result_copy.setAttribute('class', 'btn btn-color copy-btn')
    child_element_result_copy.innerHTML = `Copy`
    child_element_result.appendChild(child_element_result_copy)
    /* child element result copy button*/
}

let copyURL = () => {
    let aux = document.createElement("input")
    for( let i = 0 ; i < shortenedLinks.length ; i++ ) {
        copyBtn.addEventListener('click', () => {
            aux.setAttribute("value", shortenedLinks[i].shortenedLink.shortenedURL.innerHTML)

            document.body.appendChild(aux)
            aux.select()
            document.execCommand("copy")
            document.body.removeChild(aux)
        })
    }
}

shortenItBtn.addEventListener('click', () => {
    shortenedLinks.push(shortenedLink = {
        link: inputLink.value,
        style: addShortenedLinkStyle()
    })
    console.log(shortenedLinks)
})

copyURL()