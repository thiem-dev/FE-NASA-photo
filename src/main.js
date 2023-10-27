/* TODO  
*/

window.addEventListener('DOMContentLoaded', (event) => {
    init();
    console.log('DOM fully loaded and parsed');
});

function init() {
    initQselectors();
    initEventListeners();
    makeRandomCards();
}


//global objs
const interactiveElements = {
    closeModalBtn : `#closeModalBtn`,
    modalCtn : `#modal-ctn`,
    modalContents : `#modal-contents`,
    startDateBtn: `#startDate`,
    endDateBtn: `#endDate`,
    searchBtn: `#searchBtn`,
    loadingIcon: `#loading-icon`,
    scrollToTop: `#scrollToTop`,
    volumeBtn: `#volumeBtn`,
    randomBtn: `#randomBtn`,
    bgvideo: `#bgvideo`,
}

// wish I could hide api keys but this is on Github static page (i think there is a way)
const dataConfig = {
    nasaData : [],
    API_KEY: `3qTHhoutarfLnx81918TdVY6FpFTFEW5ijlwA0P1`,
    startDate: ``,
    endDate: ``,
}

const toast = {
    success: () => {
        Toastify({
            text: `Fetch Success!`,
            duration: 2000,
            gravity: "top",
            close: true,
            position:"center",
            style: {
                background: "linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61))"
            }
            }).showToast()
    },
    fail: () => {
        Toastify({
            text: `Error with getting pics ${error.name}`,
            duration: 3000,
            gravity: "top",
            close: true,
            position:"center",
            style: {
                background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))"
            }
            }).showToast()
    }
}

const iElem = interactiveElements;

// utility functions -----------------------------------------------------------------------------------------------------------------------------------

function initQselectors(){
    for(let [elem, selector] of Object.entries(iElem)){
        iElem[elem] = document.querySelector(selector)
    }
}

function initEventListeners(){
    const cards = document.querySelectorAll(".card") 

    iElem.searchBtn.addEventListener('click', () => {
        if(!checkDates(startDate, endDate)){ return } //if empty dates

        getNASAPics()
    })
    
    iElem.startDateBtn.addEventListener('input', (e) => {
        dataConfig.startDate = e.target.value 
    })

    iElem.endDateBtn.addEventListener('input', (e) => {
        dataConfig.endDate = e.target.value 
        
    })
    
    iElem.closeModalBtn.addEventListener('click', (e) => {
        iElem.modalCtn.classList.add('hidden')
    })

    // // TODO
    iElem.volumeBtn.addEventListener('click', (e) => {
        console.log(`volume clicked`)
        iElem.bgvideo.muted = true;
        // if(iElem.bgvideo.volume === 0){
        //     iElem.bgvideo.volume = 1
        // }else{
        //     iElem.bgvideo.volume = 0
        // }


        
    })

    iElem.randomBtn.addEventListener(`click`, (e) =>{
        makeRandomCards()
    })
    
    cards.forEach(card => {
        card.addEventListener('click', (e) =>{
            if(e.target.id === null){
                return //ignore
            } else{
                iElem.modalCtn.classList.remove('hidden')
            }
            
        })
    })
}

async function makeRandomCards(){
    const loadingIcon = iElem.loadingIcon.classList;

    loadingIcon.toggle('hidden')
    const url = `https://api.nasa.gov/planetary/apod?api_key=${dataConfig.API_KEY}&count=8`
    try{
        let response = await fetch(url)
        dataConfig.nasaData = await response.json();
        toast.success();
    } catch (error){
        console.error(error)
        toast.fail(error)
    }

    generateCards(dataConfig.nasaData);


    loadingIcon.toggle('hidden')
    
}

async function getNASAPics() {
    let response;
    const apiKey = dataConfig.API_KEY
    const loadingIcon = iElem.loadingIcon.classList;
    let startDate = dataConfig.startDate;
    let endDate = dataConfig.endDate;

    //wrong dates, don't call
    if(!checkDates(startDate, endDate)) {return}

    loadingIcon.toggle('hidden')
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=false&thumbs=false&start_date=${startDate}&end_date=${endDate}`;
    try {
        response = await fetch(url);
        dataConfig.nasaData = await response.json();
        toast.success();
    } catch (error){
        console.error(error)
        toast.fail(error)
    }
    loadingIcon.toggle('hidden');
    generateCards(dataConfig.nasaData);
}

function checkDates(startDate, endDate){
    if(!startDate || !endDate ){
        alert('missing date information');

        //highlight error
        iElem.startDateBtn.parentElement.classList.toggle("bg-red-500/50")
        setTimeout(()=>{
            iElem.startDateBtn.parentElement.classList.toggle("bg-red-500/50")
        }, 3000)

        return false;
    } else{
        return true;
    }
}

function generateCards(arr){
    const appContents = document.querySelector("#app-contents")

    //empty out contents
    appContents.innerHTML = ``;
    let appContentsHTML = ``;

    arr.forEach((obj, index) => {
        appContentsHTML +=`
                <div id="${index}" class="card group relative col-span-2 max-h-[900px] rounded-2xl overflow-hidden text-center justify-center items-center cursor-pointer bg-slate-100 shadow-md hover:bg-slate-200 hover:shadow-xl 
                ">
                    <div class="img-ctn h-96 w-96 block">
                        <img src="${obj.url}" alt="${obj.title}" 
                        class="object-cover w-full h-full group-hover:scale-110">
                    </div>
            
                    <div class="curtain absolute inset-0 bg-transparent group-hover:bg-gray-800/80"></div>
            
                    <div class="text-ctn absolute inset-0 flex flex-col text-gray-100 px-9 translate-y-[110%] overflow-hidden group-hover:translate-y-[30%]" >
                        <h1 class="text-3xl font-bold">${obj.title}</h1>
                        <div class="text-lg p-1">Date: ${obj.date}</div>
                        <p class="overflow-hidden">Description: ${obj.explanation}</p>
                    </div>
                </div>
    
             `
    })

    appContents.innerHTML = appContentsHTML

    const cards = document.querySelectorAll(".card") 
    initNewCardListeners(cards)

}

function initNewCardListeners(cardElements){
    cardElements.forEach(card => {
        card.addEventListener('click', (e) => {
            if(e.target.id === null){
                return //ignore
            } else{
                loadModal(e.target.parentElement.id)
                iElem.modalCtn.classList.remove('hidden')
            }
        })
    })
}

function loadModal(id){  
    let nasaData = dataConfig.nasaData
    let author = nasaData?.[id]?.hasOwnProperty('copyright') ? nasaData[id].copyright : 'Unknown';

    iElem.modalContents.innerHTML = '';

    iElem.modalContents.innerHTML = `
                <div class="img-ctn basis-12 my-2">
                    <img src="${nasaData[id].url}" alt="nasa image of the day" class="w-[60%] object-cover object-center mx-auto">
                </div>
                
                <h1 class="text-xl md:text-3xl basis-12">${nasaData[id].title}</h1>
                <h2 class="text-lg md:text-2xl basis-12">Date: ${nasaData[id].date}</h2>
                <h3 class=" md:text-xl basis-12">Photo by: ${author}</h3>
                <p class="text-left basis-5 px-24 mb-12">${nasaData[id].explanation}</p>
                `

}

//scroll to top button config ----------------------------------------------------------
window.onscroll = () => {
    showScrollToTop()
}
function showScrollToTop(){
    if(document.documentElement.scrollTop > 100){
        iElem.scrollToTop.classList.remove(`translate-y-20`)
        iElem.scrollToTop.classList.add(`translate-y-0`)
    } else {
        iElem.scrollToTop.classList.add('translate-y-20');
        iElem.scrollToTop.classList.remove('translate-y-0');
    }
}
