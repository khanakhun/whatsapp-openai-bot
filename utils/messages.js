const linkify = require('linkifyjs');

let wordsToFilter = [
    "Krieg",
    "Soldat",
    "Militär",
    "Arbeit",
    "Arbeitsplatz",
    "Arbeiter",
    "Mitarbeiter",
    "Beruf",
    "Job",
    "Jobs",
    "88",
    "Goldminen",
    "Machinery Operator" ,
    "Construction",
    "Tractor Driving" ,
    "Kuhfarm",
    "Pferdefarm",
    "Unternehmen",
    "Jobplattformen",
    "Jobbörse",
    "Arbeiter",
    "Arbeitgeber",
    "Arbeitnehmer",
    "Stablehand",
    "Bauernhof",
    "Landarbeit",
    "Agriculture",
    "Hospitality",
    "Waiter",
    "Studfarm",
    "Fruitpicking",
    "Fruit picker" ,
    "Cattlehand",
    "Cattle station" ,
    "Horse rider" ,
    "Barkeeper",
    "Reitjobs",
    "Pferdefarm",
    "Pferdehof",
    "Reitstall",
    "Dairyfarm",
    "Gardening",
    "Labourer",
    "Constructionjobs",
    "Karriere",
    "Beruf",
    "Beschäftigung",
    "Tätigkeit",
    "Arbeit",
    "Position",
    "Stellenangebot",
    "Anstellung",
    "Arbeitsplatz",
    "Verantwortung",
    "Aufgabe",
    "Pflicht",
    "Tätigkeitsfeld",
    "Tätigkeitsbereich",
    "Arbeitsfeld",
    "Arbeitsgebiet",
    "Jobbörse",
    "Farmhand",
    "Farmwork",
    "Work",
    "Farm",
    "Horticulture",
    "Laborer",
    "Gärtner",
    "Lebenslauf",
    "Jobtasks",
    "Introduction",
    "Resume",
    "Tätigkeiten",
    "CV",
    "Cover letter" ,
    "Application",
    "Mine",
    "Miningjob",
    "Minen",
    "Minenarbeit",
    "Internetseite"
        
];


exports.USER_LIMIT_MESSAGE = `G´day Mate,

Leider hast du heute schon 2 Fragen gestellt. Das ist die momentan
maximale Anzahl an einem Tag. Wir arbeiten aber daran noch mehr
Koalas anzustellen um dir baldig einen noch besseren Support zu
gewährleisten.

Have a lovely Day Buddy :)

Schaue dich gerne auf unserer Website um, um noch mehr Tipps zu bekommen:
www.workandtravelguide.org
 `;

exports.NOT_ALLOWED_MESSAGE = `G´day Mate,

Bitte beachte, dass wir bestimmte Regeln beachten und deiner
Anfrage nicht stattgegeben werden kann. Bei weiteren Verstoßen
sehen wir uns gezwungen dich aus unseren Gruppen zu entfernen
und als Kunde oder möglichen Kunden zu entfernen.

Schaue dazu bitte auf www.workandtravelguide.org/ ki-koala-agbs vorbei um dich über die Regeln zu informieren.

Cheers Mate!`;

exports.BOT_DAILY_LIMIT_MESSAGE = `G´day Mate,,

Leider habe ich heute schon über 150 Fragen beantwortet. Das ist 
momentan meine maximale Arbeitsleistung. Work-Life-Balance ist 
wichtig! – Ich bin jetzt surfen... :)

Have a lovely Day Buddy :)

Schaue dich gerne auf unserer Website um, um noch mehr Tipps zu bekommen:
www.workandtravelguide.org
`

exports.STARTING_TEXT = `"G´day Mate,"`;

exports.ENDING_TEXT = `
Schaue gern auf unserer Website vorbei: www.workandtravelguide.org. ✨🐨🌴
"`


exports.checkPrompt = (prompt) => {
    let badWordExists = false;
    // check for links 
    let urls = linkify.find(prompt)
    if(urls.length > 0) {
        return true
    }
    wordsToFilter.forEach((word) => {
        if(prompt.includes(word)){
            badWordExists= true;
        }
    })
    return badWordExists
}



