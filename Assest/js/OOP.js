// class✅
// object ✅
// inheritance ✅
// polymorphism ✅
// abstraction ✅
// encapsulation ✅

class Main {
    #quote = ""
    #image = ""

    constructor(quote, image) {
        this.#quote = quote
        this.#image = image
    }

    get quote() {
        return this.#quote
    }

    get image() {
        return this.#image
    }

    get user() {
        throw new Error('there is must be user to make testimonials')
    }

    get testimonialHTML() {
        return `<div class="crd_grid flex">
        <div class="crd_card" id="hid">
            <a href="InProject.html">
                <div class="card_div">
                    <div class="card_div1">
                        <img src="${this.#image}" alt="photo" class="card_div1-img">
                    </div>
                    <h1 class="text-xl">${this.#quote}</h1>
                    <h1 class="crd_div2">${this.user}</h1>
                </div>
            </a>
        </div>
    </div>
        `
    }
}

class Userx extends Main {
    #user = ""

    constructor(user, quote, image) {
        super(quote, image)
        this.#user = user
    }

    get user() {
        return this.#user
    }
}

class Companyx extends Main {
    #company = ""

    constructor(company, quote, image) {
        super(quote, image)
        this.#company = company
    }

    get user() {
        return this.#company
    }
}

const testimonial1 = new Userx("Soekarno Hata", "Pelopor Bangsa", "image/oop1.jpg")
const testimonial2 = new Userx("Soeharto", "Mantap Jiwa", "image/oop2.jpeg")
const testimonial3 = new Companyx("Megawati", "Penjual Pulau", "image/oop3.jpeg")


let testimonialData = [testimonial1, testimonial2, testimonial3]
let testimonialHTML = ""

for (let i = 0; i < testimonialData.length; i++) {
    testimonialHTML += testimonialData[i].testimonialHTML
}

document.getElementById("text2").innerHTML = testimonialHTML


