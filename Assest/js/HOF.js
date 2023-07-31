const data = [
    {
        user: "Ragnarok Online",
        quote: "Pertarungan antar manusia dan dewa",
        image:"https://www.genmuda.com/wp-content/uploads/2017/02/ragnarok-online.jpg",
        rating:1,
        hid: "hid1",
        myImage:"myImage1",
        myVideo:"myVideo1",
        video : "video/ragnarok.mp4",

    },
    {
        user: "Dota 2",
        quote: "Game Plagiat",
        image:"https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg",
        rating:2,
        hid: "hid2",
        myImage:"myImage2",
        myVideo:"myVideo2",
        video:"video/dota2.mp4",
    },
    {
        user: "Final Fantasy 7",
        quote: "Adventure the best",
        image:"https://www.godisageek.com/wp-content/uploads/FF7R-Thumb-1.jpg",
        rating:3,
        hid: "hid3",
        myImage:"myImage3",
        myVideo:"myVideo3",
        video:"video/ff7.mp4",
    },
    {
        user: "Zelda",
        quote: "Game about Zelda",
        image:"https://assets.nintendo.com/image/upload/v1681238674/Microsites/zelda-tears-of-the-kingdom/videos/posters/totk_microsite_officialtrailer3_1304xj47am",
        rating:5,
        hid: "hid4",
        myImage:"myImage4",
        myVideo:"myVideo4",
        video:"video/zelda.mp4",
    },
    {
        user: "Super Mario",
        quote: "Mario Bros and Lugius",
        image:"https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg",
        rating:5,
        hid: "hid5",
        myImage:"myImage5",
        myVideo:"myVideo5",
        video:"video/mario.mp4",
    },
    {
        user: "Pokemon",
        quote: "Tempat Mencari Hewan",
        image:"https://assets.pokemon.com/assets//cms2/img/video-games/_tiles/pokemon-scarlet-violet/launch/scarlet-violet-875-en.jpg",
        rating:5,
        hid: "hid6",
        myImage:"myImage6",
        myVideo:"myVideo6",
        video:"video/pokemon.mp4",
    },
    {
        user: "GTA V",
        quote: "Criminal Town",
        image:"https://cdn1-production-images-kly.akamaized.net/XznoBZcs4cKsVCKXiMyHhfYCrGM=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/796713/original/094485900_1421485203-GTAV-Review.jpg",
        rating:1,
        hid: "hid7",
        myImage:"myImage7",
        myVideo:"myVideo7",
        video:"video/gta.mp4",
    },
    {
        user: "Perfect World",
        quote: "Game First Adventure can Fly",
        image:"https://cdn.akamai.steamstatic.com/steam/apps/2359600/capsule_616x353.jpg?t=1681301831",
        rating:5,
        hid: "hid8",
        myImage:"myImage8",
        myVideo:"myVideo8",
        video:"video/pw.mp4",
    },
    {
        user: "Kriby",
        quote: "Hewan yang Pink",
        image:"https://kirby.nintendo.com/assets/img/home/kirbys-return-to-dreamland-deluxe.jpg",
        rating:2,
        hid: "hid9",
        myImage:"myImage9",
        myVideo:"myVideo9",
        video:"video/kriby.mp4",
    },
]


// INI UNTUK ALL RATING
const allRating = () => {
    let stringKosong = ``

    data.forEach((card,i)=>{
        stringKosong += `<div class="crd_grid flex">
        <div class="crd_card" id="hid">
            <a href="InProject.html">
                <div class="card_div">
                    <div class="card_div1">
                        <img src="${card.image}" alt="photo" class="card_div1-img">
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

    const filterRat = data.filter((card) => {
        return card.rating === rating;
    });

    //bikin jika dia tidak ada maka NOT FOUND
    if (filterRat.length === 0) {
        filterStringKosong = `<p class="font-bold text-6xl flex">NOT FOUND...</p>`;
    } else {
        filterRat.forEach((card, i) => {
            filterStringKosong += `<div class="crd_grid flex">
                <div class="crd_card" id="hid">
                    <a href="InProject.html">
                        <div class="card_div">
                            <div class="card_div1">
                                <img src="${card.image}" alt="photo" class="card_div1-img">
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
