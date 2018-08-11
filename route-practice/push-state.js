const stateKey = ['abcCont', 'defCont'];
const abcDiv = document.querySelector('#contABC');
const defDiv = document.querySelector('#contDEF');
const buttons = document.querySelectorAll('button');
Array.from(buttons).forEach(btn => btn.addEventListener('click', btnCLickHandler));
window.addEventListener('popstate', showButtonContent);

function getState() {
    return history.state || {};
}

function showButtonContent() {
    const stateResult = getState();
    abcDiv.innerHTML = stateResult[stateKey[0]] || '';
    defDiv.innerHTML = stateResult[stateKey[1]] || '';
}

function saveState(result) {
    history.pushState(result, null);
    showButtonContent();
}

function btnCLickHandler(event) {
    const result = getState();
    switch (event.target.parentNode.id) {
        case 'btnABC':
            result[stateKey[0]] = event.target.innerHTML;
            break;
        case 'btnDEF':
            result[stateKey[1]] = event.target.innerHTML;
            break;
    }
    saveState(result);
}

showButtonContent();