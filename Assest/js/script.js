function submitData(event){
    event.preventDefault(); //agar tidak reload

    //masukin data
    let name = document.getElementById("input-name").value
    let email = document.getElementById("input-email").value
    let number = document.getElementById("input-number").value
    let subject = document.getElementById("input-subject").value
    let message = document.getElementById("input-message").value
    
            //if else kalau data tidak terisi
            if(name === ""){
                return alert("Name harus di isi")
            }else if (email === ""){
                return alert("Email harus diisi")
            }else if (number === ""){
                return alert("Number harus di isi")
            }else if (subject === ""){
                return alert("Subject harus di isi")
            }else if (message === ""){
                return alert("Subject harus di isi")
            }
            
            //di tampilkan
            alert(`list data: \n
            nama: ${name}       \n 
            email: ${email}     \n1
            number: ${number}   \n
            subject: ${subject} \n
            message: ${message}     `)


            //bikin agar bisa langsung ke email
            const emailReceiver = "setiawan.jodi38@gmail.com"
            let a = document.createElement('a')
            a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo nama saya ${name},\n${message}, silahkan kontak saya di nomor berikut : ${number}`
            a.click()
}



