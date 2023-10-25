let nasaData;

function init() {
    // wish I could hide api keys but this is on Github static page (i think there is a way)
    const API_KEY = `3qTHhoutarfLnx81918TdVY6FpFTFEW5ijlwA0P1`
    
    // DOM ELEMENTS
    const searchBtn = document.querySelector('#searchBtn')
    const appContents = document.querySelector("#")



    

    let userStr = ''

    async function getNASAPics() {
        let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=3&hd=false&thumbs=false`;
        const response = await fetch(url);
        const nasaData = await response.json();
        console.log(nasaData);
    
        generateCards();
      }
    
    
    getNASAPics();



    function initEventListeners(){
        
    }
}


function generateCards(obj){

}



// eventListeners

