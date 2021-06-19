const numAnswerDict = {
    1 : "I like action.",
    2 : "I deal with problems in a systematic way.",
    3 : "I believe that teams are more effective than individuals.",
    4 : "I enjoy motivation very much.",
    5 : "I am more interested in the future than in the past.",
    6 : "I enjoy working with people.",
    7 : "I like to attend well organized group meetings.",
    8 : "Deadlines are very important for me.",
    9 : "I cannot stand procrastination.",
    10 : "I believe that new ideas have to be tested before being used.",
    11 : "I enjoy the stimulation of interaction with others.",
    12 : "I am always looking for new possibilities.",
    13 : "I want to set up my own objectives.",
    14 : "When I start something, I go through until the end.",
    15 : "I basically try to understand other people's emotions.",
    16 : "I do challenge people around me.",
    17 : "I look forward to receiving feedback on my performance.",
    18 : "I find the step-by-step approach very effective.",
    19 : "I think I am good at reading people.",
    20 : "I like creative problem-solving.",
    21 : "I extrapolate and project all the time.",
    22 : "I am sensitive to others' needs.",
    23 : "Planning is the key to success.",
    24 : "I become impatient with long deliberations.",
    25 : "I am cool under pressure.",
    26 : "I value experience very much.",
    27 : "I listen to people.",
    28 : "People say that I am a fast thinker.",
    29 : "Cooperation is a key word for me.",
    30 : "I use logical methods to test alternatives.",
    31 : "I like to handle several projects at the same time.",
    32 : "I always question myself.",
    33 : "I learn by doing.",
    34 : "I believe that my head rules my heart.",
    35 : "I can predict how others may react to a certain action.",
    36 : "I do not like details.",
    37 : "Analysis should always precede action.",
    38 : "I am able to assess the climate of a group.",
    39 : "I have a tendency to start things and not finish them.",
    40 : "I perceive myself as decisive.",
    41 : "I search for challenging tasks.",
    42 : "I rely on observation and data.",
    43 : "I can express my feelings openly.",
    44 : "I like to design new projects.",
    45 : "I enjoy reading very much.",
    46 : "I perceive myself as a facilitator.",
    47 : "I like to focus on one issue at a time.",
    48 : "I like to achieve.",
    49 : "I enjoy learning about others.",
    50 : "I like variety.",
    51 : "Facts speak for themselves.",
    52 : "I use my imagination as much as possible.",
    53 : "I am impatient with long, slow assignments.",
    54 : "My mind never stops working.",
    55 : "Key decisions have to be made in a cautious way.",
    56 : "I strongly believe that people need each other to get work done.",
    57 : "I usually make decisions without thinking too much.",
    58 : "Emotions create problems.",
    59 : "I like to be liked by others.",
    60 : "I can put two and two together very quickly.",
    61 : "I try out my new ideas on people.",
    62 : "I believe in the scientific approach.",
    63 : "I like to get things done.",
    64 : "Good relationships are essential.",
    65 : "I am impulsive.",
    66 : "I accept differences in people.",
    67 : "Communicating with people is an end in itself.",
    68 : "I like to be intellectually stimulated",
    69 : "I like to organize.",
    70 : "I usually jump from one task to another.",
    71 : "Talking and working with people is a creative act.",
    72 : "Self-actualization is a key word for me.",
    73 : "I enjoy playing with ideas.",
    74 : "I dislike to waste time.",
    75 : "I enjoy doing what I am good at.",
    76 : "I learn by interacting with others.",
    77 : "I find abstractions interesting and enjoyable.",
    78 : "I am patient with details.",
    79 : "I like brief, to the point statements.",
    80 : "I feel confident in myself."
}

const actionNums = [1,8,9,13,17,24,26,31,33,40,41,48,50,53,57,63,65,70,74,79];

const processNums = [2,7,10,14,18,23,25,30,34,37,42,47,51,55,58,62,66,69,75,78];

const peopleNums = [3,6,11,15,19,22,27,29,35,38,43,46,49,56,59,64,67,71,76,80];

const ideaNums = [4,5,12,16,20,21,28,32,36,39,44,45,52,54,60,61,68,72,73,77];

class Answer {


    constructor(num, ans)
    {
        this.number = num;
        this.answer = ans;

        this.style = "";

        if (actionNums.includes(this.number))
            this.style = "action";

        else if (processNums.includes(this.number))
            this.style = "process";

        else if (peopleNums.includes(this.number))
            this.style = "people";

        else if (ideaNums.includes(this.number))
            this.style = "idea";
    }


}

var answers = [];

for (var n in numAnswerDict)
{
    let currentAnswer = new Answer(parseInt(n), numAnswerDict[n]);
    answers.push(currentAnswer);
}


var actionTally = 0;
var processTally = 0;
var peopleTally = 0;
var ideaTally = 0;

var userStyle = "";
var stylePercentages = [0, 0, 0, 0]

var answerIndex = 0;

function renderPair()
{
    document.getElementById('first-label').innerHTML = answers[answerIndex].answer;
    document.getElementById('second-label').innerHTML = answers[answerIndex+1].answer;
}
function submitAnswer(form)
{
    if (form.elements[0].checked)
    {
        console.log(answers[answerIndex].style);
        addStyle(answers[answerIndex]);

        form.elements[0].checked = false;
    }
    else if (form.elements[1].checked)
    {
        console.log(answers[answerIndex+1].style);
        addStyle(answers[answerIndex+1]);

        form.elements[1].checked = false;
    }

    answerIndex +=2;

    // End reached
    if (answerIndex >= answers.length)
    {
        userStyle = getUserStyle();
        console.log("END" + userStyle);

        //setPercentages();
        goToStylePage();

    }
    else
    {
        renderPair();
    }

}

function addStyle(answer)
{

    switch(answer.style)
    {
        case "action":
            actionTally++;
            break;
        case "process":
            processTally++;
            break;
        case "people":
            peopleTally++;
            break;
        case "idea":
            ideaTally++;
            break;
    }
    console.log("Action:" + actionTally);
    console.log("Process:" + processTally);
    console.log("People:" + peopleTally);
    console.log("Idea:" + ideaTally);
}



function getUserStyle()
{
    let tallyArr = [actionTally, processTally, peopleTally, ideaTally]
    let maxStyleNum = Math.max(...tallyArr);
    s = "";
    switch (maxStyleNum)
    {
        case actionTally:
            s = "action"
            break;
        case processTally:
            s = "process"
            break;
        case peopleTally:
            s = "people"
            break;
        case ideaTally:
            s = "idea"
            break;
    }
    return s;
}

function hidePercentages()
{
    document.getElementById("percentages").style.display = "none";
}

function setPercentages()
{
    document.getElementById("percentages").style.display = "block";
    document.getElementById("radioDiv").style.display = "none";
    stylePercentages[0] = Math.round((actionTally/answers.length) * 100) * 2
    stylePercentages[1] = Math.round((processTally/answers.length) * 100) * 2
    stylePercentages[2] = Math.round((peopleTally/answers.length) * 100) * 2
    stylePercentages[3] = Math.round((ideaTally/answers.length) * 100) * 2

    document.getElementById('action-p').innerHTML = "<b>ACTION:</b> " + stylePercentages[0] + "%";
    document.getElementById('process-p').innerHTML = "<b>PROCESS:</b> " + stylePercentages[1] + "%";
    document.getElementById('people-p').innerHTML = "<b>PEOPLE:</b> " + stylePercentages[2] + "%";
    document.getElementById('idea-p').innerHTML = "<b>IDEA:</b> " + stylePercentages[3] + "%";
}

function goToStylePage()
{
        switch (userStyle)
        {
            case "action":
                location.replace("action.html");
                break;
            case "process":
                location.replace("process.html");
                break;
            case "people":
                location.replace("people.html");
                break;
            case "idea":
                location.replace("idea.html");
                break;
        }
}