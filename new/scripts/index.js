var titleElement = document.getElementById('aboutTitle');
var titleText = document.getElementById('jacktext');

const aboutMeText = [
    "Hello there!",
    "👋 Hey there,",
    "Welcome to my website!",
    "Jack Spencer here,",
    "Probably not the best website you've ever seen,",
    "If this shows up, something went wrong. :/",
    "About Me:",
    "Aaaand that's all I've got.",
    "I'm not very good at this.",
    "Uhh...",
    "You need to enable JavaScript to view this page. :/",
    "And.... We're Back!!!!!",
    "Back in Black!",
    "Here we go again...!"
];

const jackpageText = [
    "Jack's Page",
    "Jack's Corner",
    "Colack's Page",
    "Colack's Corner",
    "Colack's Dev Blog",
    "VarSite Browser",
    "VarSite",
    "Celia Project",
    "Not a Rickroll",
    "If you see this, something went wrong. :/",
    "Watermelon Katana",
    "Watermelon Katana 2",
    "My Website",
    "index.html",
    "Now with 100% more JavaScript!",
    "Free bugs, no charge!",
    "This is a website.",
    "This is a website. (with JavaScript)"
];

let jackpageTextIndex = 0;

titleElement.innerText = aboutMeText[Math.floor(Math.random() * aboutMeText.length)];

// If the user presses shift+enter, it will generate a random color.
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'Enter':
            if (event.shiftKey) {
                // set the text color to a random color
                titleElement.style.color = getRandomColor();
            } else {
                // set the text color to white
                titleElement.style.color = 'white';
            }
            break;
        case 'Shift':
            if (event.key == 'Shift' && event.code == 'ShiftRight') {
                jackpageTextIndex++;
                if (jackpageTextIndex >= jackpageText.length) {
                    jackpageTextIndex = 0;
                }
                titleText.innerText = jackpageText[jackpageTextIndex];
            }
            break;
        case 'Control':
            if (event.key == 'Control' && event.code == 'ControlRight') {
                document.title = "Stop looking in the console. :/";
            }
            break;
    }
});

// This function generates a random color.
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
