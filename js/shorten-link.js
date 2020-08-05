/* Shorten It CTA section */
let inputLink = document.querySelector('#shorten-it__input-link')
let shortenItBtn = document.querySelector('#shorten-it__btn')

/* shortened links container */
let shortenedLinks = document.querySelector('.shorten-it__links')

/* shortened link element */
let shortenedLinksItem
let shortenedLinksURL

let shortenedLinksResultContainer
let shortenedLinksShortenedURL
let shortenedLinksCopyBtn

/* no link error message */
let noLinkError = document.querySelector('#add-link--error')

let link
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

let createShortenedLinkItem = () => {

    /* shortened links item */
    shortenedLinksItem = document.createElement('div')
    shortenedLinksItem.setAttribute('class', 'shorten-it__links-item')
    shortenedLinks.appendChild(shortenedLinksItem)

    /*user input url */
    shortenedLinksURL = document.createElement('p')
    shortenedLinksURL.innerHTML = `...`
    shortenedLinksURL.setAttribute('class', 'shorten-it__links-item--add')
    shortenedLinksItem.appendChild(shortenedLinksURL)

    /*result container*/
    shortenedLinksResultContainer = document.createElement('div')
    shortenedLinksResultContainer.setAttribute('class', 'shorten-it__links-item--result')
    shortenedLinksItem.appendChild(shortenedLinksResultContainer)

    /*shortened url */
    shortenedLinksShortenedURL = document.createElement('p')
    shortenedLinksShortenedURL.innerHTML = `...`
    shortenedLinksShortenedURL.setAttribute('class', 'shorten-it__links-item--result-url')
    shortenedLinksResultContainer.appendChild(shortenedLinksShortenedURL)

    /* copy btn */
    shortenedLinksCopyBtn = document.createElement('button')
    shortenedLinksCopyBtn.innerHTML = `Copy`
    shortenedLinksCopyBtn.setAttribute('class', 'btn btn-color copy-btn')
    shortenedLinksResultContainer.appendChild(shortenedLinksCopyBtn)

    setShortenedLinkContent()
}

let copyToClipboard = () => {
    let aux = document.createElement("input")

    copyBtn = document.querySelectorAll('.copy-btn')
    shortenedLinksShortenedURL = document.querySelectorAll('.shorten-it__links-item--result-url')

    for( let i = 0 ; i < copyBtn.length ; i++ ) {
        (function(i) {
            copyBtn[i].addEventListener('click', () => {
                aux.setAttribute("value", shortenedLinksShortenedURL[i].innerHTML)

                document.body.appendChild(aux)
                aux.select()
                document.execCommand("copy")
                document.body.removeChild(aux)

                copyBtn[i].innerHTML = `Copied!`
                copyBtn[i].style.animation = `copyBtnTransition 400ms`
                copyBtn[i].style.backgroundColor = `hsl(257, 27%, 26%)`
                copyBtn[i].style.transition = `background-color 800ms`

                setTimeout(() => {
                    copyBtn[i].innerHTML = `Copy`
                    copyBtn[i].style.backgroundColor = `hsl(180, 66%, 49%)`
                }, 2000) 
            })
        })(i)
    }
}

let setShortenedLinkContent = () => {
    shortenedLinksURL.innerHTML = inputLink.value

    fetchURL(inputLink.value).
    then(results => {
        shortenedLinksShortenedURL.innerHTML = results.url.replace('/api/links/','/')
        copyToClipboard()
    }).
    catch(err => console.error(err))
}

let noLink = () => {
    inputLink.style.border = `3px solid hsl(0, 87%, 67%)`
    noLinkError.style.display = `block`
    inputLink.value = `Shorten a link here...`
    inputLink.style.color = `hsl(0, 87%, 67%)` 

    inputLink.addEventListener('focus', () => {
        inputLink.style.color = `hsl(260, 8%, 14%)`
    })
    inputLink.addEventListener('blur', () => {
        inputLink.style.color = `hsl(0, 87%, 67%)`
    })
}

let withLink = () => {
    inputLink.style.border = `none`
    noLinkError.style.display = `none`
    inputLink.value = ``
    inputLink.style.color = `hsl(260, 8%, 14%)`
}

copyToClipboard()

shortenItBtn.addEventListener('click', () => {
    if(inputLink.value != "") {
        createShortenedLinkItem()
        withLink()
    }
    else {
        noLink()
    }
})

sessionStorage.setItem('shortenedLinksList', shortenedLinks.innerHTML)
console.log(sessionStorage.getItem('shortenedLinksList'))