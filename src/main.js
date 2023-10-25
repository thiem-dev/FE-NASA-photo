// let nasaData;
window.addEventListener('DOMContentLoaded', (event) => {
    init();
    console.log('DOM fully loaded and parsed');
});


function init() {
    // wish I could hide api keys but this is on Github static page (i think there is a way)
    const API_KEY = `3qTHhoutarfLnx81918TdVY6FpFTFEW5ijlwA0P1`
    
    // Variables declarations
    const searchBtn = document.querySelector('#searchBtn')

    const startDateInput = document.querySelector('#startDate')


    let userStr = '';


    //function calls
    initEventListeners();

    


    //functions declarations
    async function getNASAPics() {
        let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=3&hd=false&thumbs=false`;
        const response = await fetch(url);
        const nasaData = await response.json();
        console.log(nasaData);
    
        generateCards(nasaData);
      }

    function initEventListeners(){
        searchBtn.addEventListener('click', (e) => {
            console.log('clicked')
            getNASAPics();
        })
        
        startDateInput.addEventListener('input', (e) => {
            console.log(e.target.value)
        })
        
    }
}

// TODO account for num of a photos
function generateCards(arr){
    // console.log('generate cards',obj)
    
    const appContents = document.querySelector("#app-contents")

    let appContentsHTML = `
        <div class="card col-span-1 rounded-2xl bg-slate-100 shadow-md hover:bg-slate-200 hover:shadow-xl">
            <div class="text-4xl p-4">${arr[0].title}</div>
            <img src="${arr[0].url}" alt="${arr[0].title}">
            <div class="text-lg p-1">Date: ${arr[0].date}</div>
            <p class="p-4">${arr[0].explanation}</p>
        </div>
        `


    appContents.innerHTML = appContentsHTML
}



// eventListeners

