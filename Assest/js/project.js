let projects = []; // Array untuk menyimpan proyek-proyek




function ProjectSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("input-porject-title").value;
    let desc = document.getElementById("input-description").value;
    let image = document.getElementById("input-blog-image").files; // Mengambil file yang dipilih
    let startDate = document.getElementById("input-project-startdate").value;
    let endDate = document.getElementById("input-project-enddate").value;



    if (name == "") {
        return alert("Please input your project name or title");
      } else if (startDate == "") {
        return alert("When did you start this project?");
      } else if (endDate == "") {
        return alert("When did you end this project?");
      } else if (desc == "") {
        return alert("Please describe this project.");
      } else if (image == "") {
        return alert("Please attach file image of your project.");
      }


    const reactIc = `<i class="fa-brands fa-react card_ictx"></i>`;
    const angularIc = `<i class="fa-brands fa-angular card_ictx"></i>`;
    const vueIc = `<i class="fa-brands fa-vuejs card_ictx"></i>`;
    const nodeIc =`<i class="fa-brands fa-node-js card_ictx"></i>`;


    let node = document.getElementById("input-node").checked ? nodeIc : "";
    let react = document.getElementById("input-react").checked ? reactIc : "";
    let angular = document.getElementById("input-angular").checked ? angularIc : "";
    let vue = document.getElementById("input-vue").checked ? vueIc : "";
    
    image = URL.createObjectURL(image[0]); // Menghasilkan URL dari file

    let project = {
        name: name,
        desc: desc,
        image,
        node,
        react,
        angular,
        vue,
        startDate,
        endDate,
    };
    
    // agar card hilang saat di click
    let hiddenElement = document.getElementById("hid");
    hiddenElement.style.display = "none";

    projects.push(project);
    
    // Panggil fungsi lain atau lakukan manipulasi data lain dengan menggunakan nilai projects di sini
    processProjects();
    console.log(endDate);

}


function processProjects() {
    let test = document.getElementById("test2").innerHTML=''
    for (let i = 0; i < projects.length; i++) {
        let projectName = projects[i].name;
        let projectDesc = projects[i].desc;
        let projectImage = projects[i].image;
        let projectReact = projects[i].react;
        let projectVue = projects[i].vue;
        let projectAngular = projects[i].angular;
        let projectNode = projects[i].node;
        let projectDate = projects[i].postDate;
        let projectStart = projects[i].startDate;
        let projectEnd = projects[i].endDate;
        


        document.getElementById("test2").innerHTML += `
 
        <div class="crd_card" href="InProject.html">
        <a href="InProject.html">
            <div class="card_div">
                <div class="card_div1">
                    <img src="${projectImage}" alt="photo" class="card_div1-img">
                </div>
                <h1 class="card_h1">${projectName}</h1>
                <p class="card_p1">${projectStart} Sampai ${projectEnd}</p>
                <p class="card_p2">${projectDesc}</p>
                <div class="card_ic">
                    ${projectReact}
                    ${projectVue}
                    ${projectAngular}
                    ${projectNode}
                </div>

                <p>
                  ${hitungMundur(projectStart,projectEnd)}
                </p>
                <div class="card_btn1 py-5">
                    <button class="card_btn" >Edit</button>
                    <button class="card_btn" >Delet</button>
                </div>
            </div>
        </a>
    </div>`
    }
    
}



// Function buat saat Waktu sudah dipilih tidak bisa di pilih lagi
let startDateInput = document.getElementById("input-project-startdate");
let endDateInput = document.getElementById("input-project-enddate");

startDateInput.addEventListener("change", function() {
  endDateInput.min = startDateInput.value;
});



// saat di clcik gambarnya muncul nama
let imageInput = document.getElementById("input-blog-image");
let text3Element = document.querySelector(".text3");

imageInput.addEventListener("change", function() {
  let imageName = imageInput.files[0].name;
  text3Element.textContent = imageName;
});






//=========== WAKTU ===========
const Waktu = (jodi) =>{ // jodi = new Date()
  let date = new Date(jodi)

  const listBulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agus","Sep","Oct","Nov","Dec"]

  const menit = date.getMinutes()
  const jam = date.getHours()
  const tanggal = date.getDate()
  const bulan = listBulan[date.getMonth()];
  const tahun = date.getFullYear()

  if(menit<10){
    jam = "0" + jam
  }
  if(jam<10){
    jam = "0" + jam
  }


  return`${tanggal} ${bulan} ${tahun} ${jam}:${menit} WIB`

}

  const ItungWaktu = (jodi) => {
    let timeNow = new Date();
    let timePost = jodi

    let timeDistance = timeNow - timePost

    const Milisecond = 1000
    const detik = Milisecond * 60
    const menit = detik * 60
    const jam = menit * 60
    const hari = jam * 24
    const bulan = hari * 30
    const tahun = bulan * 12

    let Second = Math.floor(timeDistance / Milisecond) //itung perdetik 
    let Minutes = Math.floor(timeDistance / detik) 
    let Hours = Math.floor(timeDistance / jam) 
    let Day = Math.floor(timeDistance / hari) 
    let Month = Math.floor(timeDistance / bulan) 
    let Year = Math.floor(timeDistance / tahun) 

    if (Second >= 60) {
      return `${Minutes} menit yang lalu`
  } else if (Minutes >= 60) {
      return `${Hours} jam yang lalu`
  } else if (Hours >= 24) {
      return `${Day} hari yang lalu`
  } else if (Day >= 30) {
      return `${Month} bulan yang lalu`
  } else if (Month >= 12) {
      return `${Year} tahun yang lalu`
  }

  let SetTim = {
   Second
  }

    console.log(`${Second} Detik, ${Minutes} Menit`)
    return SetTim.Second;
  }


  function hitungMundur(startDate, endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
  
    // Menghitung selisih waktu antara startDate dan endDate
    const selisih = end - start;
  
    // Menghitung hari, minggu, dan bulan
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const minggu = Math.floor(hari / 7);
    const bulan = Math.floor(hari / 30);
  
    return `Tinggal ${hari} Hari ${minggu} Minggu ${bulan} Bulan`;
  }
  



  
// ============== Function Clear Button ==============
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", function () {
  // Clear input fields
  document.getElementById("input-porject-title").value = "";
  document.getElementById("input-description").value = "";
  document.getElementById("input-blog-image").value = "";
  document.getElementById("input-project-startdate").value = "";
  document.getElementById("input-project-enddate").value = "";
  document.getElementById("input-node").checked = false;
  document.getElementById("input-react").checked = false;
  document.getElementById("input-vue").checked = false;
  document.getElementById("input-angular").checked = false;
  document.getElementById("selected-image").src = "";
});








