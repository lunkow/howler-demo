import './loader.scss';

export {initLoader, disableLoader}

// initLoader - для создания лоадера через js
// также можно сразу добавить в шаблон .loader>.loader__processing

function initLoader() {
   
    const   loader = document.createElement('div'),
            loaderInner = document.createElement('div');

    loader.classList.add('loader');
    loaderInner.classList.add('loader__processing');
    
    loader.appendChild(loaderInner);
    window.loader = loader;
    document.body.prepend(loader);
}


function disableLoader() {
    const loader = document.querySelector('.loader');
     
    try {
        loader.classList.add('loader--hiding');

        setTimeout(function () {
            loader.classList.remove('loader--hiding');
            loader.classList.add('loader--disabled');
        }, 500);
    }

    catch(error) {
        console.error('Loader Error\n' + error.message);
    }
}
