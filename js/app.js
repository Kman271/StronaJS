
// single page website implementation
//
const scriptsMap = new Map([
    ['home.html', 'imgBox.js']
])
function isScriptInPage(name) {

    for(let key of  scriptsMap.keys()) {
        if(key === name) {
            console.log("TRUE: site has script!")
            return true
        }
        console.log(`${name} != ${key}`)
    }
    console.log("FALSE: site has no script!")
    return false
}

function putInsideHtml(objectSelector, data) {
    document.querySelector(objectSelector).innerHTML = data;
}

async function loadIntoHTML(objectSelector, name) {

    console.log('selected: ' + objectSelector)
    console.log("name: " + name)
    await fetch(name)
        .then(response => response.text())
        .then(text => {
            putInsideHtml(objectSelector, text)
            if(document.getElementById('importedScript') != null)
                document.getElementById('importedScript').remove()
            if(isScriptInPage(name)) {
                fetch('js/' + scriptsMap.get(name))
                    .then(responseS => responseS.text()).then(scriptText => {

                        console.log('appending... js/' + scriptsMap.get(name))

                        let newScript = document.createElement('script')
                        newScript.innerHTML = scriptText
                        newScript.id = 'importedScript'

                        document.body.append(newScript)

                    })
                console.log("append")
            }
        })
        .catch(error => console.log("ERROR: " + error));
}

// load main page
loadIntoHTML('#inners', 'home.html').then(r => {})

// get navbar elements
const navigationList = document.getElementById("navigation").getElementsByTagName("button")

const navigationSites = navigationList.length

// add logic to navbar
for(let i = 0; i < navigationSites; i++) {

    let currentElement = navigationList.item(i)
    let currentHtml = currentElement.id + '.html'
    console.log(currentElement)
    console.log(currentHtml)
    currentElement.addEventListener('click', async (e) => {
        await loadIntoHTML('#inners', currentHtml)
    })

}



