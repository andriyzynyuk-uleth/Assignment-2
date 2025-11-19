
let pcPowered = false;
const screenEl = document.querySelector('.screen');
const screenControls = document.querySelector('.screen-controls');
const buttonBack = document.getElementById('ButtonBack');
const onOffEl = document.getElementById('onOff');

function setPower(on) {
    pcPowered = !!on;
    try { sessionStorage.setItem('pcPowered', pcPowered ? 'true' : 'false'); } catch (e) {}
    if (pcPowered) {
        if (screenEl) screenEl.classList.remove('off');
        if (onOffEl) onOffEl.setAttribute('fill', '#00ff66');
        if (screenControls) screenControls.style.display = 'flex';
    } else {
        if (screenEl) screenEl.classList.add('off');
        if (onOffEl) onOffEl.setAttribute('fill', '#D12020');
        if (screenControls) screenControls.style.display = 'none';
    }
}

if (buttonBack) {
    buttonBack.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPower(!pcPowered);
    });
    buttonBack.addEventListener('pointerdown', (e) => {
        const img = document.getElementById('powerImg');
        if (img) img.classList.add('pressed');
    });
    buttonBack.addEventListener('pointerup', (e) => {
        const img = document.getElementById('powerImg');
        if (img) img.classList.remove('pressed');
    });
    buttonBack.addEventListener('pointerleave', (e) => {
        const img = document.getElementById('powerImg');
        if (img) img.classList.remove('pressed');
    });
}
const buttonBackHit = document.getElementById('ButtonBackHit');
if (buttonBackHit) {
    buttonBackHit.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPower(!pcPowered);
    });
    buttonBackHit.addEventListener('pointerdown', (e) => {
        const img = document.getElementById('powerImg');
        if (img) img.classList.add('pressed');
    });
    buttonBackHit.addEventListener('pointerup', (e) => {
        const img = document.getElementById('powerImg');
        if (img) img.classList.remove('pressed');
    });
    buttonBackHit.addEventListener('pointerleave', (e) => {
        const img = document.getElementById('powerImg');
        if (img) img.classList.remove('pressed');
    });
}

const _saved = sessionStorage.getItem('pcPowered');
if (_saved === 'true') setPower(true);
else setPower(false);

document.addEventListener('pointerup', () => {
    const img = document.getElementById('powerImg');
    if (img) img.classList.remove('pressed');
});
(function(){
    const images = ['images/Lion.png','images/Smiley.png','images/star.png'];
    let idx = 0;
    const slideImg = document.getElementById('slideImg');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function filenameToAlt(path) {
        const parts = path.split('/');
        const name = parts[parts.length-1];
        return name.replace(/\.png$/i,'');
    }

    function update() {
        if (!slideImg) return;
        slideImg.src = images[idx];
        slideImg.alt = filenameToAlt(images[idx]);
    }

    function prev() {
        idx = (idx - 1 + images.length) % images.length;
        update();
    }

    function next() {
        idx = (idx + 1) % images.length;
        update();
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    update();
})();