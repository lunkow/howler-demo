import {Howl, Howler} from 'howler';

import cafe from '../audio/cafe-ambience-9263.mp3';
import childSurprised from '../audio/surprised-child-voice-sound-113127.mp3';
import childLaugth from '../audio/child-laughing-113112.mp3';



const data = {
    cafe: {
        src: cafe,
        howl: false,
    },
    childSurprised: {
        src: childSurprised,
        howl: false,
    },
    childLaugth: {
        src: childLaugth,
        howl: false,
    },
}

const CONTROL_ID_CAFE = 'playCafe';
const CONTROL_ID_LAUGH = 'playLaugh';
const CONTROL_ID_SURPRISE = 'playSurprise';

const SOUND_CONTROL_CLASS_STOPPED = 'sound--stopped';
const SOUND_CONTROL_CLASS_PLAYING = 'sound--playing';

const SOUND_CONTROL_LABEL_CLASS = 'sound-controller-label';
const SOUND_CONTROL_PROGRESS_CLASS = 'sound-controller-progress';

function initCharacterPlay(buttonID, howlData) {
    
    const buttonPlay = document.getElementById(buttonID);

    buttonPlay.setStateStopped = function() {
        this.querySelector('.' + SOUND_CONTROL_LABEL_CLASS).innerHTML = this.dataset.labelPlay;
        this.classList.remove(SOUND_CONTROL_CLASS_PLAYING);
        this.classList.add(SOUND_CONTROL_CLASS_STOPPED);
    };

    buttonPlay.setStatePlaying = function() {
        this.querySelector('.' + SOUND_CONTROL_LABEL_CLASS).innerHTML = this.dataset.labelPlaying;
        this.classList.remove(SOUND_CONTROL_CLASS_STOPPED);
        this.classList.add(SOUND_CONTROL_CLASS_PLAYING);
    };

    buttonPlay.updateProgress = function(percentage) {
        this.querySelector('.' + SOUND_CONTROL_PROGRESS_CLASS).style.width = `${percentage}%`;
    };

    buttonPlay.resetProgress = function() {
        let progressElememt = this.querySelector('.' + SOUND_CONTROL_PROGRESS_CLASS);

        // first timeout - for short fixation of 100%-fulled progressbar 
        setTimeout(() => {
            progressElememt.style.opacity = 0;
            
            // second timeout - for reseting syles after reset animation ends (check css transition time)
            setTimeout(() => {
                progressElememt.style.width = null;
                progressElememt.style.opacity = null;
            }, 200);
        }, 300);

    };

    buttonPlay.setStateStopped();

    howlData.howl = new Howl({
        src: howlData.src,
        preload: true,
        html5: true,
        onplay: function() {
            this.isAfterEndEvent = false; // reset flag
            buttonPlay.setStatePlaying();
            setProgressTimer(this);

            function setProgressTimer(thisSound) {
                setTimeout( () => {
                    let currentProgressPercents = (100 * thisSound.seek() / thisSound.duration()).toFixed(2);

                    if (!thisSound.isAfterEndEvent) {
                        buttonPlay.updateProgress(currentProgressPercents);
                        setProgressTimer(thisSound);
                    } else {
                        // nothing
                        // we do not create timer for next iteration
                    }
                }, 1000 / 60);
            }
        },
        onend: function() {
            this.isAfterEndEvent = true;
            buttonPlay.setStateStopped();
            buttonPlay.updateProgress(100);
            buttonPlay.resetProgress();
        },
    });

    buttonPlay.addEventListener('click', (event) => {
        const sound = howlData.howl;

        if (sound.playing()) {
            //nothing
        } else {
            sound.play();
        }
    });
}

function initCharactersSound() {
    initCharacterPlay(CONTROL_ID_CAFE, data.cafe);
    initCharacterPlay(CONTROL_ID_LAUGH, data.childLaugth);
    initCharacterPlay(CONTROL_ID_SURPRISE, data.childSurprised);
}

export { initCharactersSound };

