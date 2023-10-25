/* TODO  
-if date doesn't exist yet then alert wrong date (or shake and focus wrong), toggle active class and remove after delay
*/


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
    const startDateBtn = document.querySelector('#startDate')
    const endDateBtn = document.querySelector('#endDate')

    //default date set
    let startDate = ``
    let endDate = ``;



    //function calls
    initEventListeners();

    


    //functions declarations
    async function getNASAPics() {
        let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&hd=false&thumbs=false&start_date=${startDate}&end_date=${endDate}`;
        const response = await fetch(url);
        const nasaData = await response.json();
        console.log(nasaData);
    
        generateCards(nasaData);
      }

    // eventListeners
    function initEventListeners(){
        searchBtn.addEventListener('click', (e) => {
            console.log('clicked')

            // let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=7&hd=false&thumbs=false&start_date=${startDate}&endDate=${endDate}`;
            // console.log(url)

            getNASAPics();
        })
        
        startDateBtn.addEventListener('input', (e) => {
            startDate = e.target.value 
            console.log('start date', e.target.value)
        })

        endDateBtn.addEventListener('input', (e) => {
            endDate = e.target.value 
            console.log('end date', e.target.value)
        })
        
    }
}

// TODO account for num of a photos
function generateCards(arr){
    
    const appContents = document.querySelector("#app-contents")

    let appContentsHTML = ``

    arr.forEach((obj) => {
        appContentsHTML +=`
            <div class="card col-span-2 max-w-2xl rounded-2xl  overflow-hidden bg-slate-100 shadow-md hover:bg-slate-200 hover:shadow-xl relative">
                <img src="${obj.url}" alt="${obj.title}" 
                    class="object-cover w-full">
                <h1 class="absolute inset-0 text-3xl font-bold">${obj.title}</h1>
                <div class="text-lg p-1">Date: ${obj.date}</div>
                <p class="absolute inset-0">Description: ${obj.explanation}</p>
            </div>
            `
    })

    appContents.innerHTML = appContentsHTML
}





