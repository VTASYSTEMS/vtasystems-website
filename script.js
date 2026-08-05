/* ==========================
   VTA SYSTEMS
   SCRIPT.JS
========================== */


/* ==========================
   SMOOTH SCROLL
========================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const target = document.querySelector(
            this.getAttribute("href")
        );


        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});



/* ==========================
   PRODUCT CARD ANIMATION
========================== */


const cards = document.querySelectorAll(
    ".product-card, .tech-item, .spec-card"
);


const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";


        }


    });


},

{

    threshold:0.15

}

);



cards.forEach(card=>{


    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    card.style.transition=
    "all .7s ease";


    observer.observe(card);


});



/* ==========================
   HEADER SHADOW WHEN SCROLL
========================== */


const header =
document.querySelector("header");


window.addEventListener(
"scroll",
()=>{


    if(window.scrollY > 50){


        header.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.5)";


    }

    else{


        header.style.boxShadow =
        "none";


    }


});



/* ==========================
   YEAR AUTO UPDATE
========================== */


const year =
document.querySelector(".copyright");


if(year){


    const date =
    new Date();


    year.innerHTML =
    "© " +
    date.getFullYear() +
    " VTA SYSTEMS. All Rights Reserved.";


}
