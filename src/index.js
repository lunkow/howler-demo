import 'reset-css';
import './styles.scss';

import { disableLoader} from './components/loader/loader';
import { initLayoutFullpage } from './components/layout-fullpage/layoutFullpage';
import { initCharactersSound } from './js/soundControl';


// // import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// import Swiper JS
// import Swiper, { Navigation, Pagination } from 'swiper';

document.addEventListener('DOMContentLoaded', () => {
    initLayoutFullpage();

    initCharactersSound();

    setTimeout(() => {
        disableLoader();
    }, 1000);
});

