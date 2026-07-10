const menuIcon = document.querySelector('.menu_icon');
const navMenu = document.querySelector('.header nav');

// navMenu.style.display = 'none'; // скрывает меню

// menuIcon.addEventListener('click', () => {
//     // navMenu.computedStyleMap.display = 'none' ? navMenu.computedStyleMap.display = 'block' : navMenu.computedStyleMap.display = 'none'
//     // navMenu.style.display = navMenu.style.display === 'none' ? 'block' : 'none';

//     if (navMenu.style.display === 'none') {
//        navMenu.style.display = 'block' 
//     } else {
//         navMenu.style.display = 'none'
//     }
// })

// надо разобраться с логикой - у меня display: 'none' не совпадает с кодом Нелли!!!!! + .menu_icon у меня вообще отсутствует + c 41-ой минуты выяснилось, что накосясили и начали исправлять!!! 

// FAQs

// Представим, что мы получили данные с сервера...

const faqs = [
    {
        question: "Alpine Bus Journeys?",
        answer: "Forget crowded cities! Alpine Bus Journeys are your comfy seat with panoramic windows to breathtaking mountain vistas, charming villages, and air so fresh it might make you yodel (please don't, unless you're outside). It's transportation with a side of unparalleled scenery (and maybe a hairpin turn)."
    },
        {
        question: "What about seating options?",
        answer: "Generally, you'll find comfy standard seats (great views, great value, maybe great new friends) and perhaps slightly better seats with extra legroom. All offer a front-row seat to the greatest show on Earth – the Alps!"
    },
    {
        question: "What is the Alpine Wallet?",
        answer: "It's your digital stash of cash that makes booking bus tickets smoother than a perfectly paved mountain road. Load it up and watch your travel dreams become reality faster than a bus goes downhill."
    },
    {
        question: "My Altitude Score?",
        answer: "Your loyalty points for cruising the mountain roads! Higher scores might get you priority boarding (less elbowing for the best window seat!) or maybe just bragging rights among fellow peak-passengers who prefer four wheels."
    },
    {
        question: "Why a Bus Station Fee?",
        answer: "A small contribution to ensure the station is clean, has reasonably fresh mountain air (filtered from bus fumes), and enough signs pointing you towards your bus, not away from it. Sometimes covers the cost of moving rogue bicycles."
    },
    {
        question: "Why are buses late?",
        answer: "Sometimes it's the weather (snow happens!), sometimes a sudden flock of particularly slow-moving sheep on the road, and sometimes the driver just had to stop for a photo of that view. Or maybe they got stuck behind a tractor. Welcome to \"Mountain Road Time\"!"
    },
     {
        question: "Peak Season Surcharge?",
        answer: "SIt's the little extra you pay to enjoy the authentic experience of sharing breathtaking views with a lot of your closest friends (who you haven't met yet) while strategically placing your bag in the overhead compartment. Guarantees a vibrant, energetic journey!"
    },
]

const faqsContainer = document.querySelector('.faqs_container');

faqs.forEach(({ question, answer }) => {
    const detailsElem = document.createElement('details');
    const summaryElem = document.createElement('summary');
    const pElem = document.createElement('p');

    summaryElem.innerText = question;
    pElem.innerText = answer;

    detailsElem.append(summaryElem, pElem);
    faqsContainer.append(detailsElem);
})

const allDetailsItems = document.querySelectorAll('.faqs_container details');

allDetailsItems.forEach(item => {
    item.addEventListener('toggle', () => {
        if(item.open) {
            allDetailsItems.forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.open = false
                }
            })
        }
    })
});
// item - это один конкретный <details>
// На каждый <details> вешаем слушатель события toggle