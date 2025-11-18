const terminal = document.getElementById("terminal");
    const hiddenInput = document.getElementById("hiddenInput");
    const promptText = "C:\\Users\\vt323>";
    const asciiArts = [
    "(•_•)",
    "(ง'̀-'́)ง",
    "¯\\_(ツ)_/¯",
    "(>_<)",
    "(づ｡◕‿‿◕｡)づ",
    "ʕ•ᴥ•ʔ"
    ];
const quotes = [
    "“Talk is cheap. Show me the code.” – Linus Torvalds",
    "“Programs must be written for people to read.” – Harold Abelson",
    "“First, solve the problem. Then, write the code.” – John Johnson",
    "“Code is like humor. When you have to explain it, it’s bad.” – Cory House"
    ];

let i = 0;

// Number guessing game
let gameActive = false;
let gameTarget = 0;
let gameTries = 0;

function startGame() {
    gameActive = true;
    gameTries = 4;
    gameTarget = Math.floor(Math.random() * 50) + 1;
    const el = document.createElement('div');
    el.classList.add('output');
    el.textContent = `Game started! Guess a number between 1 and 50. You have ${gameTries} tries. Type 'quit' to stop.`;
    terminal.appendChild(el);
    terminal.scrollTop = terminal.scrollHeight;
}

function endGame() {
    gameActive = false;
    gameTarget = 0;
    gameTries = 0;
}

function createInputLine({ emptyPrompt = false } = {}) {
    const inputLine = document.createElement("div");
    inputLine.classList.add("input-line");

    const prompt = document.createElement("span");
    prompt.classList.add("prompt");
    prompt.textContent = emptyPrompt ? "" : promptText;

    const fakeInput = document.createElement("span");
    fakeInput.classList.add("fake-input");

    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    cursor.textContent = "_";

    inputLine.appendChild(prompt);
    inputLine.appendChild(fakeInput);
    inputLine.appendChild(cursor);
    terminal.appendChild(inputLine);

    terminal.scrollTop = terminal.scrollHeight;

    hiddenInput.value = "";
    hiddenInput.focus();

    hiddenInput.oninput = () => {
        const lastFake = terminal.querySelector('.input-line:last-child .fake-input');
        if (lastFake) lastFake.textContent = hiddenInput.value;
    };

    hiddenInput.onkeydown = (e) => {
        if (e.key === "Enter") {
            const command = hiddenInput.value.trim();
            processCommand(command);
            hiddenInput.value = "";
            const lastFake = terminal.querySelector('.input-line:last-child .fake-input');
            if (lastFake) lastFake.textContent = "";
        }
    };

    document.body.onclick = () => hiddenInput.focus();
}

function typePrompt() {
    const currentPrompt = terminal.querySelector('.input-line:last-child .prompt');
    if (!currentPrompt) return;

    if (i < promptText.length) {
        currentPrompt.textContent += promptText.charAt(i);
        i++;
        setTimeout(typePrompt, 60);
        terminal.scrollTop = terminal.scrollHeight;
    } else {
        hiddenInput.focus();
        terminal.scrollTop = terminal.scrollHeight;
    }
}

function processCommand(cmd) {
const lastLine = terminal.lastElementChild;
    if (lastLine) {
        const cursor = lastLine.querySelector(".cursor");
        if (cursor) cursor.remove();
    }

    if (gameActive) {
        const raw = cmd.trim();
        const lraw = raw.toLowerCase();
        const resp = document.createElement('div');
        resp.classList.add('output');

        if (lraw === 'quit' || lraw === 'exit') {
            resp.textContent = 'Game aborted.';
            terminal.appendChild(resp);
            endGame();
            terminal.scrollTop = terminal.scrollHeight;
            addInputLine();
            return;
        }

        const guess = parseInt(raw, 10);
        if (Number.isNaN(guess)) {
            resp.textContent = 'Please enter a number between 1 and 50, or type "quit" to stop.';
            terminal.appendChild(resp);
            terminal.scrollTop = terminal.scrollHeight;
            addInputLine();
            return;
        }

        if (guess < 1 || guess > 50) {
            resp.textContent = 'Your guess must be between 1 and 50.';
            terminal.appendChild(resp);
            terminal.scrollTop = terminal.scrollHeight;
            addInputLine();
            return;
        }
        gameTries--;

        if (guess === gameTarget) {
            resp.textContent = `Correct! ${guess} is the number. You win!`;
            terminal.appendChild(resp);
            endGame();
            terminal.scrollTop = terminal.scrollHeight;
            addInputLine();
            return;
        }

        if (gameTries > 0) {
            resp.textContent = (guess < gameTarget ? 'Higher.' : 'Lower.') + ` You have ${gameTries} ${gameTries === 1 ? 'try' : 'tries'} left.`;
            terminal.appendChild(resp);
            terminal.scrollTop = terminal.scrollHeight;
            addInputLine();
            return;
        }


        resp.textContent = `Out of tries — the number was ${gameTarget}.`;
        terminal.appendChild(resp);
        endGame();
        terminal.scrollTop = terminal.scrollHeight;
        addInputLine();
        return;
    }

let output = document.createElement("div");
output.classList.add("output");

switch (cmd.toLowerCase()) {
    case "help":
        output.textContent = "Available commands: help, art, quote, info, game";
    break;
    case "game":
        startGame();
        output = null;
    break;
    case "art":
        output.textContent = asciiArts[Math.floor(Math.random() * asciiArts.length)];
    break;
    case "quote":
        output.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    break;
    case "":
        output.textContent = "";
    break;
    case "info":
        const infoLines = [
            "Website Created by Andriy Zynyuk",
            "Font: VT323",
            "Creator: Peter Hull",
            "Creator page: https://luc.devroye.org/fonts-56825.html",
            "Description: VT323 is a monospaced, pixel-style font inspired by classic DEC terminals.",
            "Its blocky, high-contrast characters give a retro computing vibe, perfect for a PC terminal themed website.",
            "The monospaced design reinforces the look of authentic command-line output while remaining readable."
        ];
        infoLines.forEach(line => {
        const el = document.createElement('div');
        el.classList.add('output');
        el.textContent = line;
        terminal.appendChild(el);
        });
        output = null;
    break;
    default:
        output.textContent = `Unknown command: ${cmd}`;
}

if (output) terminal.appendChild(output);
    terminal.scrollTop = terminal.scrollHeight;
    addInputLine();
}

function addInputLine() {
    createInputLine({ emptyPrompt: false });
}

function showWelcome() {
    const text = 'Welcome to the vt323 terminal\nEnter "help" for help';
    const lastPrompt = terminal.querySelector('.input-line:last-child .prompt');
    const welcome = document.createElement('div');
    welcome.classList.add('output');

    const insertBeforeEl = terminal.querySelector('.input-line:last-child');
    if (insertBeforeEl) terminal.insertBefore(welcome, insertBeforeEl);
    else terminal.appendChild(welcome);

    if (lastPrompt) {
        const gap = 6;
        welcome.style.marginLeft = (lastPrompt.offsetWidth + gap) + 'px';
    }

    terminal.scrollTop = terminal.scrollHeight;

    return new Promise((resolve) => {
        let idx = 0;
        function step() {
            if (!document.body.contains(welcome)) {
                resolve();
                return;
            }
            if (idx < text.length) {
                welcome.textContent += text.charAt(idx);
                idx++;
                terminal.scrollTop = terminal.scrollHeight;
                setTimeout(step, 30);
            } else {
                resolve();
            }
        }
        step();
    });
}

let pcPowered = false;
const screenEl = document.querySelector('.screen');
const screenControls = document.querySelector('.screen-controls');
const buttonBack = document.getElementById('ButtonBack');
const onOffEl = document.getElementById('onOff');

function initTerminal() {
    i = 0;
    terminal.innerHTML = '';
    createInputLine({ emptyPrompt: true });
    showWelcome().then(() => {
        if (pcPowered) typePrompt();
    });
}

function setPower(on) {
    pcPowered = !!on;
    try { sessionStorage.setItem('pcPowered', pcPowered ? 'true' : 'false'); } catch (e) {}
    if (pcPowered) {
        screenEl.classList.remove('off');
        if (onOffEl) onOffEl.setAttribute('fill', '#00ff66');
        if (screenControls) screenControls.style.display = 'flex';
        terminal.style.display = 'block';
        initTerminal();
        hiddenInput.focus();
    } else {
        screenEl.classList.add('off');
        if (onOffEl) onOffEl.setAttribute('fill', '#D12020');
        if (screenControls) screenControls.style.display = 'none';
        terminal.style.display = 'none';
        terminal.innerHTML = '';
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

document.addEventListener('pointerup', () => {
    const img = document.getElementById('powerImg');
    if (img) img.classList.remove('pressed');
});

const _saved = sessionStorage.getItem('pcPowered');
if (_saved === 'true') setPower(true);
else setPower(false);