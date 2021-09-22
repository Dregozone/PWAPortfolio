
//set up cache name and files to add to it
const CACHE_NAME = 'portfolio-v3';

const CACHE_URLS =  [
     'index.html'
    ,'experience.html'
    ,'skills.html'
    ,'contact.html'
    ,'hangman.html'
    ,'thinkofanumber.html'
    ,'favicon.ico'
    ,'favicon-16x16.png'
    ,'webmanifest.webmanifest'
    ,'android-chrome-192x192.png'
    ,'apple-touch-icon.png'
    ,'Logo.jpg'
    ,'Logo.webp'
    ,'styles/normalize.css'
    ,'styles/contact.css'
    ,'styles/experience.css'
    ,'styles/hangman.css'
    ,'styles/index.css'
    ,'styles/shared.css'
    ,'styles/skills.css'
    ,'styles/thinkofanumber.css'
    ,'scripts/contact.js'
    ,'scripts/hangman.js'
    ,'scripts/skills.js'
    ,'scripts/thinkofanumber.js'
    ,'images/css.jpg'
    ,'images/ExperiencePage.jpg'
    ,'images/facebook.jpg'
    ,'images/html.jpg'
    ,'images/instagram.jpg'
    ,'images/js.jpg'
    ,'images/linkedin.jpg'
    ,'images/mysql.jpg'
    ,'images/php.jpg'
    ,'images/tsql.jpg'
    ,'images/PlymouthLogo.jpg'
    ,'images/StaffordshireLogo.jpg'
    ,'images/ThinkOfANumberGame.jpg'
    ,'images/ThinkOfANumberGameThumb.jpg'
    ,'images/HangmanGame.jpg'
    ,'images/HangmanGameThumb.jpg'
    ,'images/snow.png'
    ,'images/hangman/0.jpg'
    ,'images/hangman/1.jpg'
    ,'images/hangman/2.jpg'
    ,'images/hangman/3.jpg'
    ,'images/hangman/4.jpg'
    ,'images/hangman/5.jpg'
    ,'images/hangman/6.jpg'
    ,'images/hangman/7.jpg'
    ,'images/hangman/8.jpg'
    ,'images/hangman/9.jpg'
    ,'images/hangman/10.jpg'
    ,'images/hangman/11.jpg'
    ,'images/hangman/12.jpg'
    ,'images/hero.webp'
    ,'styles/roboto.css'
];

//add all URLs to cache when installed
self.addEventListener("install", function(event){
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened");
                //add all URLs to cache
                return cache.addAll(CACHE_URLS);
            })
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName.startsWith('portfolio-') && CACHE_NAME !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});
