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
                <div class="card group relative col-span-2 max-h-[900px] rounded-2xl overflow-hidden text-center justify-center items-center cursor-pointer bg-slate-100 shadow-md hover:bg-slate-200 hover:shadow-xl 
                ">
                    <div class="img-ctn h-96 w-96 block">
                        <img src="${obj.url}" alt="${obj.title}" 
                        class="object-cover w-full h-full group-hover:scale-110">
                    </div>
            
                    <div class="curtain absolute inset-0 bg-transparent group-hover:bg-gray-800/80"></div>
            
                    <div class="text-ctn absolute inset-0 flex flex-col text-gray-100 px-9 translate-y-[110%] overflow-hidden group-hover:translate-y-[30%]" >
                        <h1 class="text-3xl font-bold">Title</h1>
                        <div class="text-lg p-1">Date: ${obj.title}</div>
                        <p class="overflow-hidden">Description: ${obj.explanation}</p>
                    </div>
                </div>
    
             `
    })

    appContents.innerHTML = appContentsHTML
}







