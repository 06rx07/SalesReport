const stateKey = ['abcCont', 'defCont'];
const abcDiv = document.querySelector('#contABC');
const defDiv = document.querySelector('#contDEF');
const buttons = document.querySelectorAll('button');
Array.from(buttons).forEach(btn => btn.addEventListener('click', btnCLickHandler));
window.addEventListener('hashchange', showButtonContent);

function getStateFromHash() {
    const hash = location.hash.substring(1).split('&&');
    const result = {};
    for (let i = 0; i < stateKey.length; i++) {
        result[stateKey[i]] = (hash[i]) ? hash[i].split('=')[1] : '';
    }
    return result;
}

function showButtonContent(event) {
    const hashResult = getStateFromHash();
    abcDiv.innerHTML = hashResult[stateKey[0]];
    defDiv.innerHTML = hashResult[stateKey[1]];
}

function saveHash(result) {
    let hashString = '';
    for (let key in result) {
        hashString += key + '=' + result[key] + '&&';
    }
    location.hash = hashString.substring(0, hashString.length - 2);
}

function btnCLickHandler(event) {
    const result = getStateFromHash();
    switch (event.target.parentNode.id) {
        case 'btnABC':
            result[stateKey[0]] = event.target.innerHTML;
            break;
        case 'btnDEF':
            result[stateKey[1]] = event.target.innerHTML;
            break;
    }
    saveHash(result);
}

showButtonContent();