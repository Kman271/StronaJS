
// img box implementation
//
function loadImageBy(object, offset) {

    const imgList = ['headphones.jpg', 'mixer.jpg', 'microphone.jpg', 'dj.jpg', 'interface.jpg']
    const altMap = new Map([
        ['headphones.jpg', 'black headphones on white table'],
        ['mixer.jpg', 'dark blue mixer with white knobs'],
        ['microphone.jpg', 'classic silver microphone at purple background'],
        ['dj.jpg', 'black dj workspace with glowing red buttons'],
        ['interface.jpg', 'a bunch of dark colored audio interfaces with a lot of knobs']
    ])

    const currImgStringFull = object.getAttribute(`src`)
    const currImgString = currImgStringFull.slice(currImgStringFull.lastIndexOf('/')+1)
    let newImgIndex = 0

    if(imgList.indexOf(currImgString) + offset >= 0) {
        newImgIndex = (imgList.indexOf(currImgString) + offset) % imgList.length
    } else {
        newImgIndex = imgList.indexOf(currImgString) + offset
        do {
            newImgIndex += imgList.length
        }while (newImgIndex < 0);
    }
    const newImgString = imgList[newImgIndex]
    const newImgAlt = altMap.get(newImgString);

    console.log("currImgStringFull: " + currImgStringFull)
    console.log("currImgString: " + currImgString)
    console.log("newImgIndex: " + newImgIndex + ", was " + imgList.indexOf(currImgString))
    console.log("newImgString: " + newImgString)
    console.log("newImgAlt: " + newImgAlt)

    object.setAttribute(`src`, 'img/'+newImgString)
    object.setAttribute(`alt`, newImgAlt)

}

displayImg = document.getElementById('displayedImg')
nextButton = document.getElementById('nextButton')
prevButton = document.getElementById('prevButton')

nextButton.addEventListener('click', (e) => {loadImageBy(displayImg, 1)} )
prevButton.addEventListener('click', (e) => {loadImageBy(displayImg, -1)} )
