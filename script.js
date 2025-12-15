const addGameBtn = document.getElementById('add-game-btn');
const romUpload = document.getElementById('rom-upload');
const statusMsg = document.getElementById('status-message');
const fileInfo = document.getElementById('file-info');
const fileNameDisplay = document.getElementById('filename-display');
const uiLayer = document.getElementById('ui-layer');
const gameContainer = document.getElementById('game-container');
const closeBtn = document.getElementById('close-btn');



addGameBtn.addEventListener('click', () => {
    romUpload.click();
});

closeBtn.addEventListener('click', () => {
    resetarEmulador();
});

romUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        statusMsg.innerText = "Carregando...";
        fileNameDisplay.innerText = file.name;
        fileInfo.style.display = "block";
        
        setTimeout(() => {
            iniciarJogo(file);
        }, 800);
    }
});



function iniciarJogo(file) {
    uiLayer.classList.add('ui-hidden');
    closeBtn.classList.remove('hidden');
    
    const fileURL = URL.createObjectURL(file);
    const core = detectarCore(file.name);

    console.log(`Iniciando: ${file.name} | Core: ${core}`);

    
    window.EJS_onGameExit = function() {
        resetarEmulador();
    };
    
    
    const script = document.createElement('script');
    script.innerHTML = `
        EJS_player = '#game-container';
        EJS_core = '${core}'; 
        EJS_gameUrl = '${fileURL}';
        EJS_pathtodata = 'https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs@main/data/';
        EJS_startOnLoaded = true;
        EJS_biosUrl = ''; 
    `;
    gameContainer.appendChild(script);
    
    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs@main/data/loader.js';
    gameContainer.appendChild(loaderScript);
}


function resetarEmulador() {
    
    window.location.reload();
}

function detectarCore(filename) {
    const ext = filename.split('.').pop().toLowerCase();

    switch(ext) {
        case 'gba': return 'gba';
        case 'nes': return 'nes';
        case 'snes': 
        case 'smc':  
        case 'sfc': return 'snes';
        
        
        case 'zip':  
        case '7z': return 'fbneo'; 
        
        case 'n64': 
        case 'z64': return 'n64';
        case 'nds': return 'nds';
        case 'gen':
        case 'md': return 'segaMD';
        default: return 'gba';
    }
}