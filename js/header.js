let hamburger = document.querySelector('#hamburger')
let mobileNav = document.querySelector('.header--mobile')
let mobileNavModal = document.querySelector('.header--mobile-modal')

let header = document.querySelector('header');

let mobileNavState = true

let mobileNavIsOpen = () => {
    mobileNav.style.zIndex = 50
    mobileNav.style.opacity = 1
    mobileNav.style.bottom = `-474px`
    mobileNav.style.transition = `bottom 400ms, opacity 400ms 100ms`
    mobileNavState = false
    mobileNavModal.style.display = `block`
        
}

let mobileNavIsClose = () => {
    mobileNav.style.zIndex = -99
    mobileNav.style.opacity = 0
    mobileNav.style.bottom = 0
    mobileNav.style.transition = `bottom 400ms 200ms, opacity 400ms`

    mobileNavModal.style.display = `none`
    mobileNavState = true
}

mobileNavModal.addEventListener('click', () => {
    mobileNavIsClose()
}) 

hamburger.addEventListener('click', () => {
    mobileNavState ? mobileNavIsOpen() : mobileNavIsClose()
})