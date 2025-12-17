const addGameBtn = document.getElementById('add-game-btn');
const romUpload = document.getElementById('rom-upload');
const statusMsg = document.getElementById('status-message');
const fileInfo = document.getElementById('file-info');
const fileNameDisplay = document.getElementById('filename-display');
const uiLayer = document.getElementById('ui-layer');
const gameContainer = document.getElementById('game-container');
const closeBtn = document.getElementById('close-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');

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

fullscreenBtn.addEventListener('click', () => {
    toggleFullScreen();
});

function iniciarJogo(file) {
    
    const menuLayer = document.getElementById('ui-layer');
    if (menuLayer) menuLayer.style.display = 'none'; 
    
    closeBtn.classList.remove('hidden');
    fullscreenBtn.classList.remove('hidden');
    
    
    const fileURL = URL.createObjectURL(file);
    const core = detectarCore(file.name);

    console.log(`Mobile Mode: ${file.name} | Core: ${core}`);

    
    window.EJS_player = '#game-container';
    window.EJS_core = core;
    window.EJS_gameUrl = fileURL;
    window.EJS_pathtodata = 'https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs@main/data/';
    window.EJS_startOnLoaded = true;
    window.EJS_biosUrl = ''; 
    
    
    window.EJS_threads = false; 
    
    window.EJS_defaultOptions = {
        'nocrt': true, 
    };

    
    window.EJS_onGameExit = function() {
        resetarEmulador();
    };
    
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs@main/data/loader.js';
    document.body.appendChild(script)
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

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erro ao tentar tela cheia: ${err.message}`);
        });
    } else {
        
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

/**
 * emuHARD Web System
 * Desenvolvido por: Hardjackers
 * Versão: 1.0 (2025)
 * GitHub: https://github.com/Hardjackers
 * * Este projeto é pessoal e protegido por direitos de autoria.
 */
