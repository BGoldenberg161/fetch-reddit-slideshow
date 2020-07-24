// Globals
const container = document.querySelector('.container')
const header = document.querySelector('.title')
const button = document.querySelector('button')
const goContainer = document.querySelector('#go')
const jumbo = document.querySelector('.jumbotron')
const input = document.querySelector('input')
let imageCounter = 0

// elements to be added
const stopButton = document.createElement('button')
stopButton.setAttribute('type', 'button')
stopButton.setAttribute('class', 'btn btn-outline-danger')
stopButton.textContent = 'Forgot My Sign'


document.addEventListener('DOMContentLoaded', function() {
    // search button click
    button.addEventListener('click', event => {
        // Get input value & replace space with +
        const input = document.querySelector('input').value
        let inputProper = input.split(' ').join('+')
        // insert input into url
        let requestURL = 'https://www.reddit.com/search.json?q=' + inputProper
        
        // remove title and insturctions, replace go button with stop
        jumbo.style.display = 'none'
        goContainer.removeChild(button)
        goContainer.appendChild(stopButton)

        // get data
        fetch(requestURL)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // create elements
            makeImageElement(data)
            // cycle thru classes
            cycleImages()
            }
        )
        .catch(function(error){
            console.log('Error', error)
        })
    })

    // listen for stop button click & reset page
    stopButton.addEventListener('click', () => {
        // jumbo.style.display = 'block'
        location.reload()
    })
})

// make element from bootstrap carousel
function makeImageElement(data){
    const slideShow = document.createElement('div')
    slideShow.setAttribute('class', 'carousel slide')
    slideShow.setAttribute('id', 'carouselExampleSlidesOnly')
    slideShow.setAttribute('data-ride', 'carousel')
    const innerSlide = document.createElement('div')
    innerSlide.classList.add('carousel-inner')
    slideShow.appendChild(innerSlide)

    container.appendChild(slideShow)

    // insert first 10 images
    for (let i = 0; i < 20; i++){
        let object = data.data.children[i]
        let image = object.data.url
        
        // create container if image is actually image
        // bootstrap template for carousel
        if (image.includes('.jpg') || image.includes('.png') || image.includes('.jpeg')){
            const item = document.createElement('div')
            innerSlide.appendChild(item)
            item.setAttribute('class', 'carousel-item')
            let newImage = document.createElement('img')
            newImage.setAttribute('class', 'd-block w-100')
            newImage.setAttribute('alt', '...')
            newImage.src = image
            item.appendChild(newImage)
            imageCounter++
        }
    } 
}
        
// cycle classes on div containers
function cycleImages() {
    console.log(imageCounter)
    // should run until stop button is clicked
    let n = 0
    setInterval(function() {
        const carousel = document.querySelector('.carousel-inner').children
        // if at bottom container, start at top again
        if (n === imageCounter-1){
            n = 0
            carousel[0].classList.value = 'carousel-item active'
            carousel[imageCounter-1].classList.value = 'carousel-item'
        // else cycle active div down the list
        } else {
            carousel[n+1].classList.value = 'carousel-item active'
            carousel[n].classList.value = 'carousel-item'
            n++
        }
    }, 3000)

}