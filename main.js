window.addEventListener('load', () => {
    const container = document.createElement('div');
    container.id = 'container';

    const h1 = document.createElement('h1');
    h1.innerHTML = 'base16-viewer-js';

    const form = generateForm();

    container.appendChild(h1);
    container.appendChild(form);

    render(container);

    update('');
});

function render(body) {
    document
        .getElementById('app').appendChild(body);
}

function update(keyword) {
    const container = document.getElementById('container');

    const newPreviewContainer = document.createElement('div');
    newPreviewContainer.id = 'container-preview';

    const searchedThemeList = (() => {
        const themeList = window.themes;

        if (!keyword) {
            return themeList;
        }
        return themeList.filter((el) => {
            return el.includes(keyword);
        })
    })();
    console.log(keyword);

    const previewList = generatePreviewList(searchedThemeList);

    previewList.forEach((el) => {
        newPreviewContainer.appendChild(el);
    });

    const oldPreviewContainer = document.getElementById('container-preview');
    if (oldPreviewContainer) {
        container.removeChild(oldPreviewContainer)
    };

    container.appendChild(newPreviewContainer);
}

function generatePreviewList(themeList) {
    return themeList.map((themeName) => {
        const div = document.createElement('div');
        div.className = 'preview';

        const h2 = document.createElement('h2');
        h2.innerHTML = themeName

        const previewFrame = document.createElement('iframe');
        previewFrame.src = `./base16-html-previews/previews/base16-${themeName}.html`;

        const scriptFrame = document.createElement('iframe');
        scriptFrame.src = `./base16-crosh/colors/base16-${themeName}.js`;

        const showDiv = document.createElement('div');
        showDiv.style.padding = '0.7em 0 0.7em 0';

        const showButton = document.createElement('button');
        showButton.innerHTML = 'show';
        showButton.style.width = '100%';
        showButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (showButton.innerHTML === 'show') {
                div.appendChild(scriptFrame);
                showButton.innerHTML = 'hide';
            } else {
                div.removeChild(scriptFrame);
                showButton.innerHTML = 'show';
            }
        });
        showDiv.appendChild(showButton);

        div.appendChild(h2);
        div.appendChild(previewFrame);

        div.appendChild(showDiv);

        return div;
    })
}

function getKeyword() {
    return new URLSearchParams(window.location.search).get('keyword');
}

function generateForm() {
    const div = document.createElement('div');

    const form = document.createElement('form');

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'keyword';
    input.addEventListener('keyup', ()=>{
        update(input.value);
    });

    form.appendChild(input);
    div.appendChild(form);

    return div;
}