const menuIcon = document.querySelector('.menu_icon');
const navMenu = document.querySelector('.header nav');

const departureInput = document.getElementById('departure');
const returnInput = document.getElementById('returnDate');







// ОТКРЫТИЕ-ЗАКРЫТИЕ ВЫПАДАЮЩЕГО МЕНЮ
menuIcon.addEventListener('click', () => {
  navMenu.classList.toggle('menu_active')
})

// DATE PICKER
const picker = flatpickr(departureInput, {
    mode: "range",
    showMonths: 2,
    locale: "ru",
    dateFormat: "d.m.Y",
    closeOnSelect: false,   // не закрываем сразу — закрытие по кнопке Apply
    minDate: "today",

    onOpen: function () {
      departureInput.classList.add('active');
      returnInput.classList.add('active');
    },
    onClose: function () {
      departureInput.classList.remove('active');
      returnInput.classList.remove('active');
    },

    // Главное: при любом изменении выбора — раскладываем даты по двум полям
    onChange: function (selectedDates, dateStr, instance) {
      departureInput.value = selectedDates[0]
        ? instance.formatDate(selectedDates[0], "d.m.Y")
        : "";
      returnInput.value = selectedDates[1]
        ? instance.formatDate(selectedDates[1], "d.m.Y")
        : "";
    },

    onReady: function (selectedDates, dateStr, instance) {
      addFooter(instance);
    }
});

// Клик по "Return" открывает тот же календарь, что и "Departure"
returnInput.addEventListener("click", () => picker.open());

function addFooter(instance) {
    const footer = document.createElement("div");
    footer.className = "fp-footer";

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "fp-reset";
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      instance.clear();
      departureInput.value = "";
      returnInput.value = "";
    });

    const applyBtn = document.createElement("button");
    applyBtn.type = "button";
    applyBtn.className = "fp-apply";
    applyBtn.textContent = "Apply";
    applyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      instance.close();
    });

    footer.appendChild(resetBtn);
    footer.appendChild(applyBtn);
    instance.calendarContainer.appendChild(footer);
}






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
