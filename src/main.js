/* TODO  
-if date doesn't exist yet then alert wrong date (or shake and focus wrong), toggle active class and remove after delay
*/


let nasaData = [];

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
    const loadingIcon = document.querySelector('#loading-icon')

    const successToast = () => {
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
                            }

    const failToast = (error) => {
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

    //default date set
    let startDate = ``
    let endDate = ``;

    //function calls
    initEventListeners();


    //functions declarations
    async function getNASAPics() {
        let response;

        //empty dates
        if(!startDate || !endDate ){
            alert('empty dates');
            startDateBtn.parentElement.classList.toggle("bg-red-500/50")
            setTimeout(()=>{
                startDateBtn.parentElement.classList.toggle("bg-red-500/50")
            }, 3000)

            return;
        }

        let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&hd=false&thumbs=false&start_date=${startDate}&end_date=${endDate}`;

        loadingIcon.classList.toggle('hidden')
        
        try {
            response = await fetch(url);
            nasaData = await response.json();
            successToast();
        } catch (error){
            console.error('Error: did not get NASA Pics', error)
            failToast(error)
        }

        loadingIcon.classList.toggle('hidden')
        generateCards(nasaData);
        
      }

    // eventListeners
    function initEventListeners(){

        const cards = document.querySelectorAll(".card") 
        
        searchBtn.addEventListener('click', () => {
            getNASAPics();
        })
        
        startDateBtn.addEventListener('input', (e) => {
            startDate = e.target.value 
        })

        endDateBtn.addEventListener('input', (e) => {
            endDate = e.target.value 
        })
        

        cards.forEach(card => {
            card.addEventListener('click', (e) =>{
                console.log('clicked on', e.target.parentElement.id)
            })
        })
    }


}

// TODO account for num of a photos
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
    initCardListeners(cards)

}

function initCardListeners(cardElements){

    cardElements.forEach(card => {
        card.addEventListener('click', (e) => {
            // console.log('clicked on', e.target.parentElement.id)
            loadModal(e.target.parentElement.id)
        })
    })

    //arr[i].addEventListener{this.id}
}


function loadModal(id){
    console.log(nasaData[id])

    
}







