let ytPlayers = [];
let currentIndex = 0;

/**
 * Load YouTube API
 */
export function loadYoutubeAPI() {
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API Ready');
        initYoutubePlayers();
    };
}

/**
 * Inisialisasi semua iframe di carousel jadi YouTube Player
 */
export function initYoutubePlayers() {
    ytPlayers = [];
    currentIndex = 0;

    $('#mockup-carousel-inner iframe').each(function (index, iframe) {
        ytPlayers[index] = new YT.Player(iframe, {
            events: {
                onReady: (event) => {
                    // kalau ini video pertama → langsung play
                    if (index === 0) {
                        console.log('First player ready → autoplay');
                        event.target.mute();
                        event.target.playVideo();
                    }
                },
                onStateChange: onPlayerStateChange
            }
        });
    });
}

/**
 * Event handler state YouTube
 */
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        currentIndex++;
        console.log('Video selesai → next');
        console.log(currentIndex);
        console.log(ytPlayers.length);
        if (currentIndex >= ytPlayers.length) {
            currentIndex = 0;
            $('#mockup-carousel').carousel(0);
            ytPlayers[currentIndex]?.playVideo();
        } else {
            $('#mockup-carousel').carousel('next');
            setTimeout(() => {
                ytPlayers[currentIndex]?.playVideo();
            }, 800);
        }
    }

    if (event.data === YT.PlayerState.PLAYING) {
        $('#mockup-carousel').carousel('pause');
    }
}
