const focusBtn = document.getElementById('workbutton');
const breakBtn = document.getElementById('breakbutton');
const minutesEl = document.getElementById('minutes');
const secondEl = document.getElementById('seconds');
let minute = 25;
let second = 0;
let isStart = false;
let isFocusTime = true;
let intervalId;

const focusTimeInput = document.getElementById('focusTimeInput');
const breakTimeInput = document.getElementById('breakTimeInput');

const focusBtnClick = () => {
    if (!isFocusTime) {
        isStart = false;
        isFocusTime = true;
        clearInterval(intervalId);
        breakBtn.classList.remove('activeBtn');
        focusBtn.classList.add('activeBtn');
        minutesEl.innerText = padNumber(focusTimeInput.value);
        second = 0;
        secondEl.innerText = '00';
        minute = Number(focusTimeInput.value);
    }
};

focusBtn.addEventListener('click', focusBtnClick);

const breakBtnClick = () => {
    if (isFocusTime) {
        isStart = false;
        isFocusTime = false;
        clearInterval(intervalId);
        focusBtn.classList.remove('activeBtn');
        breakBtn.classList.add('activeBtn');
        minutesEl.innerText = padNumber(breakTimeInput.value);
        second = 0;
        secondEl.innerText = '00';
        minute = Number(breakTimeInput.value);
    }
};

breakBtn.addEventListener('click', breakBtnClick);

const timer = () => {
    if (second === 0) {
        minute--;
        second = 60;
    }
    if (second !== 0) {
        second--;
    }
    if (isFocusTime && !minute && !second) {
        showNotification('Your working time is complete. It\'s break time now!');
        breakBtnClick();
        startAndStop();
    }

    if (!isFocusTime && !minute && !second) {
        showNotification('Your break time is complete. It\'s working time now!');
        focusBtnClick();
        startAndStop();
    }

    minutesEl.innerText = padNumber(minute);
    secondEl.innerText = padNumber(second);
};

const startAndStopBtn = document.getElementById('startAndStopBtn');
const startAndStop = () => {
    if (!isStart) {
        isStart = true;
        intervalId = setInterval(timer, 1000);
        startAndStopBtn.className = 'fa-solid fa-pause';
    } else {
        isStart = false;
        clearInterval(intervalId);
        startAndStopBtn.className = 'fa-solid fa-play';
    }
};

startAndStopBtn.addEventListener('click', startAndStop);

document.getElementById('resetTime').addEventListener('click', () => {
    if (isFocusTime) {
        minute = focusTimeInput.value;
    } else {
        minute = breakTimeInput.value;
    }
    isStart = false;
    second = 0;
    clearInterval(intervalId);
    startAndStopBtn.className = 'fa-solid fa-play';
    minutesEl.innerText = padNumber(minute);
    secondEl.innerText = '00';
});

focusTimeInput.value = 25;
breakTimeInput.value = 5;

const increment_focusInputVal = () => {
    focusTimeInput.value = String(Number(focusTimeInput.value) + 1);
};

document.getElementById('focusTimeInc').addEventListener('click', increment_focusInputVal);

const increment_breakInputVal = () => {
    breakTimeInput.value = String(Number(breakTimeInput.value) + 1);
};

document.getElementById('breakTimeInc').addEventListener('click', increment_breakInputVal);

const decrement_focusInputVal = () => {
    let focusInputVal = Number(focusTimeInput.value);
    if (focusInputVal > 1) {
        focusInputVal -= 1;
    }
    focusTimeInput.value = String(focusInputVal);
};

document.getElementById('focusTimeDec').addEventListener('click', decrement_focusInputVal);

const decrement_breakInputVal = () => {
    let breakInputVal = Number(breakTimeInput.value);
    if (breakInputVal > 1) {
        breakInputVal -= 1;
    }
    breakTimeInput.value = String(breakInputVal);
};

document.getElementById('breakTimeDec').addEventListener('click', decrement_breakInputVal);

const timeChng = () => {
    if (isFocusTime) {
        minute = Number(focusTimeInput.value);
        minutesEl.innerText = padNumber(minute);
    } else {
        minute = Number(breakTimeInput.value);
        minutesEl.innerText = padNumber(minute);
    }
    second = 0;
    secondEl.innerText = '00';
    isStart = true;
    startAndStop();
};

document.getElementById('savingoption').addEventListener('click', timeChng);

document.getElementById('resetoption').addEventListener('click', () => {
    isStart = true;
    startAndStop();
    focusTimeInput.value = 25;
    breakTimeInput.value = 5;
    if (isFocusTime) {
        minute = 25;
        minutesEl.innerText = padNumber(focusTimeInput.value);
    } else {
        minute = 5;
        minutesEl.innerText = padNumber(breakTimeInput.value);
    }
    second = 0;
    secondEl.innerText = '00';
});

function showNotification(message) {
    Swal.fire({ text: message, timer: 5000 });
}

function padNumber(number) {
    return number < 10 ? `0${number}` : `${number}`;
}
const settingsButton = document.getElementById('Settingbutton');
const settingsBox = document.querySelector('.settings');
const closeBtn = document.querySelector('.settings .closebtn');

settingsButton.addEventListener('click', () => {
    settingsBox.classList.toggle('active');
    const resetBox = document.getElementById('resetTimeChnge');
    resetBox.style.display = 'none'; 

    if (settingsBox.classList.contains('active')) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const boxWidth = settingsBox.offsetWidth;
        const boxHeight = settingsBox.offsetHeight;

        const leftPosition = (screenWidth - boxWidth) / 2;
        const topPosition = (screenHeight - boxHeight) / 2;

        settingsBox.style.left = `${leftPosition}px`;
        settingsBox.style.top = `${topPosition}px`;
    }
});

closeBtn.addEventListener('click', () => {
    settingsBox.classList.remove('active');
    settingsBox.style.left = '';
    settingsBox.style.top = ''; 
});
