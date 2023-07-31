// INI MENGAMBIL DATA DARI API [Langka 1]
const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open("GET", "https://api.npoint.io/46229389514a25ce4fb7", true)
    xhr.onload = function(){
        // http code : 200 -> OK
        if (xhr.status === 200){
            resolve(JSON.parse(xhr.responseText)) // mengubah JSON ke AOF
        }else if (xhr.status >= 400){
            reject("Error loading data")
        }
    }
    xhr.onerror = function () {
        reject("Network error")
    }
    xhr.send()
})


// INI MENGOPER DATA KE Aysnc / Promise [Langka 2]

// pakai Promise

// promise.then((value)=>{
//     console.log(value)
// }).catch((err)=>{
//     console.log(err)
// })

// ---------------------

// pakai Async
let ArrayData = [];

async function getData() {
    try{
        const response = await promise
        console.log(response)
        ArrayData = response; //promise JSON di masukin ke aray kosong
        allRating();
    } catch{
        console.log(err)
    }
}

getData()
 



// INI UNTUK ALL RATING
const allRating = () => {
    let stringKosong = ``

    ArrayData.forEach((card,i)=>{ //ArrayData dari Array Kosong
        stringKosong += `<div class="crd_grid ">
        <div class="crd_card" id="${card.hid}">
            <a href="InProject.html">
                <div class="card_div">
                    <div class="card_div1">
                        <img id="${card.myImage}" src="${card.image}" alt="photo" class="card_div1-img">
                        <video id="${card.myVideo}" src="${card.video}" loop muted class="w-full h-full object-cover" style="display: none;"></video>
                    </div>
                    <h1 class="text-xl">${card.quote}</h1>
                    <h1 class="crd_div2">${card.user}</h1>
                    <p class="flex items-center justify-end pt-5 pb-10 gap-x-2 font-bold text-xl">${card.rating}<i class="fa-solid fa-star text-yellow-500"></i></p>
                </div>
            </a>
        </div>
    </div>`
    })

    document.getElementById("text2").innerHTML = stringKosong
}

allRating(); //memanggil keluar saat di refres dia akan keluar






// INI UNTUK MENFILTER Filter Rating
const filterRating = (rating) => {
    let filterStringKosong = ``;

    const filterRat = ArrayData.filter((card) => { //ArrayData dari Array Kosong
        return card.rating === rating;
    });

    //bikin jika dia tidak ada maka NOT FOUND
    if (filterRat.length === 0) {
        filterStringKosong = `<p class="font-bold text-6xl flex">NOT FOUND...</p>`;
    } else {
        filterRat.forEach((card, i) => {
            filterStringKosong += `<div class="crd_grid flex">
            <div class="crd_card" id="${card.hid}">
                <a href="InProject.html">
                    <div class="card_div">
                        <div class="card_div1">
                            <img id="${card.myImage}" src="${card.image}" alt="photo" class="card_div1-img">
                            <video id="${card.myVideo}" src="${card.video}" loop muted class="w-full h-full object-cover" style="display: none;"></video>
                        </div>
                        <h1 class="text-xl">${card.quote}</h1>
                        <h1 class="crd_div2">${card.user}</h1>
                        <p class="flex items-center justify-end pt-5 pb-10 gap-x-2 font-bold text-xl">${card.rating}<i class="fa-solid fa-star text-yellow-500"></i></p>
                    </div>
                </a>
            </div>
        </div>`;
        });
    }

    document.getElementById("text2").innerHTML = filterStringKosong;
};





