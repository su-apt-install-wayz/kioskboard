var FRKeyboard = [
    {
        "0": "A",
        "1": "Z",
        "2": "E",
        "3": "R",
        "4": "T",
        "5": "Y",
        "6": "U",
        "7": "I",
        "8": "O",
        "9": "P"
    },
    {
        "0": "Q",
        "1": "S",
        "2": "D",
        "3": "F",
        "4": "G",
        "5": "H",
        "6": "J",
        "7": "K",
        "8": "L",
        "9": "M"
    },
    {
        "0": "W",
        "1": "X",
        "2": "C",
        "3": "V",
        "4": "B",
        "5": "N"
    }
]
var specialChars = ["£", "-", "_", "'", "°", "%", "@", "."]

// Initialize KioskBoard (default/all options)
KioskBoard.init({
    /*!
    * Required
    * An Array of Objects has to be defined for the custom keys. Hint: Each object creates a row element (HTML) on the keyboard.
    * e.g. [{"key":"value"}, {"key":"value"}] => [{"0":"A","1":"B","2":"C"}, {"0":"D","1":"E","2":"F"}]
    */
    keysArrayOfObjects: FRKeyboard,
    /*!
    * Required only if "keysArrayOfObjects" is "null".
    * The path of the "kioskboard-keys-${langugage}.json" file must be set to the "keysJsonUrl" option. (XMLHttpRequest to get the keys from JSON file.)
    * e.g. '/Content/Plugins/KioskBoard/dist/kioskboard-keys-english.json'
    */
    keysJsonUrl: null,
    /*
    * Optional: An Array of Strings can be set to override the built-in special characters.
    * e.g. ["#", "$", "%", "+", "-", "*"]
    */
    keysSpecialCharsArrayOfStrings: specialChars,
    /*
    * Optional: An Array of Numbers can be set to override the built-in numpad keys. (From 0 to 9, in any order.)
    * e.g. [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    */
    keysNumpadArrayOfNumbers: null,
    // Optional: (Other Options)

    // Language Code (ISO 639-1) for custom keys (for language support) => e.g. "de" || "en" || "fr" || "hu" || "tr" etc...
    language: 'fr',
    // The theme of keyboard => "light" || "dark" || "flat" || "material" || "oldschool"
    theme: 'flat',
    // Uppercase or lowercase to start. Uppercased when "true"
    capsLockActive: true,
    /*
    * Allow or prevent real/physical keyboard usage. Prevented when "false"
    * In addition, the "allowMobileKeyboard" option must be "true" as well, if the real/physical keyboard has wanted to be used.
    */
    allowRealKeyboard: false,
    // Allow or prevent mobile keyboard usage. Prevented when "false"
    allowMobileKeyboard: false,
    // CSS animations for opening or closing the keyboard
    cssAnimations: true,
    // CSS animations duration as millisecond
    cssAnimationsDuration: 250,
    // CSS animations style for opening or closing the keyboard => "slide" || "fade"
    cssAnimationsStyle: 'slide',
    // Allow or deny Spacebar on the keyboard. The Spacebar will be passive when "false"
    keysAllowSpacebar: true,
    // Text of the space key (Spacebar). Without text => " "
    keysSpacebarText: '␣',
    // Font family of the keys
    keysFontFamily: 'sans-serif',
    // Font size of the keys
    keysFontSize: '22px',
    // Font weight of the keys
    keysFontWeight: 'normal',
    // Size of the icon keys
    keysIconSize: '25px',
    // Scrolls the document to the top of the input/textarea element. Prevented when "false"
    autoScroll: true,
    keysEnterText: '↩',
    keysEnterCallback: undefined,
    keysEnterCanClose: true,
});

KioskBoard.run('.js-kioskboard-input');

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("exampleInputPattern");

    input.addEventListener("input", function () {
        const value = input.value;
        console.log("Valeur actuelle :", value);

        if (value.length === 0) {
            // Affiche le clavier alphabétique pour le premier caractère
            input.setAttribute("data-kioskboard-type", "keyboard");
            console.log("Type de clavier : keyboard (aucun caractère saisi)");
        } else if (value.length === 1 && /^[A-Za-z]$/.test(value)) {
            // Si le premier caractère est une lettre, passe au pavé numérique
            input.setAttribute("data-kioskboard-type", "numpad");
            console.log("Type de clavier : numpad (premier caractère est une lettre)");
        } else if (value.length > 1 && /^[A-Za-z][0-9]{0,5}$/.test(value)) {
            // Continue d'utiliser le pavé numérique pour les caractères suivants
            input.setAttribute("data-kioskboard-type", "numpad");
            console.log("Type de clavier : numpad (lettre suivie de chiffres)");
        } else {
            // Réinitialise le type de clavier en cas d'entrée invalide
            input.setAttribute("data-kioskboard-type", "keyboard");
            console.log("Type de clavier : keyboard (entrée invalide)");
        }

        // Réinitialiser le clavier pour appliquer la nouvelle configuration
        KioskBoard.run('.js-kioskboard-input');
    });
});