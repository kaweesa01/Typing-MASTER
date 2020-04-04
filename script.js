var ReUseableVariables = (function () {
    return {
        skip: '#skip',
        start: '#start',
        stop: '#stop',
        timerLabel: '#timer-label',
        scoreLabel: '#score-label',
        difficulty: '.difficulty',
        Okbtn: '#ok-btn',
        wordContainer: '#word',
        displayer: '#displayer',
        gameOverContainer: '.gameOver',
        gameMsg: '.game-msg',
        tryBtn: '.try-btn',
        passedWords: '.passed-words',
        failedWords: '.failed-words',
        time: '#time',
        grade: '#grade',
        tryAgain: '.try-btn'
    }

})()


/*Data storage*/
var DataStore = (function () {

    return {
        wordBank: function () {
            return {
                words: [
                    'boy', 'Perplexed', 'Bewilderment', 'confide', 'Intervane', 'intrude','metabolism','methodical','matrimony','cabaret',
                    'car', 'jelly', 'English', 'absurd', 'castaway', 'weather', 'revolve', 'java','isolated','irrevocable','irreplaceable',
                    'book', 'Python', 'Ranger', 'cloak', 'Kaweesa', 'flew', 'fancy', 'lunatic', 'asylum','hellish','heatwave','Hebrew',
                    'jet', 'fungus', 'guide', 'Abdominal', 'abominable', 'Abroad', 'Amphioxus', 'amylase','bustling','bureaucracy','Burkinabe',
                    'scHOol', 'flummoxed', 'audicious', 'throng', 'conspiracy', 'turnish', 'INTENSITY', 'GOD', 'RAVEN','Burundian','bustling',
                    'mama', 'Moses', 'mesmERized', 'merge', 'mandate', 'MandaTOrY', 'Tattoo', 'raindeer', 'lioness','milestone','cacophony',
                    'looP', 'Elder', 'mangroove', 'incus', 'lucus', 'LocomOte', 'Predator', 'ToNg', 'NODE JS', 'debug','misdemeanour','captivating',
                    'javaScript', 'paGnacious', 'luguburious', 'ringLEader', 'Precious', 'PremaTure', 'Preoccupied','mischief','camouflage',
                    'ruBY', 'absolomn', 'presumtuousness', 'rash', 'temARious', 'corona virus', 'glorious', 'inflation', 'pride','carjacking',
                    'aCCurate', 'ContrAdict', 'contrary', 'Intimidate', 'ajar', 'CORBON', 'SyNthetic', 'syncronus', 'womanhood','brussel sprout',
                    'gymnasium','assiduously','atheism','zodiac','zealously','xenophobia','wreckage','workaholic','whooping cough','Midwestern',
                    'masculinity','Margaret','Luxembourger','rhinoceros','retrospectively','reverberate','righteousness','chandelier','chaperone'
                ]

            }
        },
        scoreStore: [],
        wordCheck: function (answer, word, passed, failed) {

            var Innerhtml;

            if (answer === word && word.length > 0) {

                Innerhtml = ` <h2 id="passed">${answer}</h2>`
                passed.insertAdjacentHTML('afterend', Innerhtml)

                this.scoreStore.push(2)
            } else {

                if (word.length < 1) {
                    Innerhtml = ` <h2 id="passed">skipped</h2>`

                } else {
                    Innerhtml = ` 
                    <h2 id="failed">
                    <span>${answer}</span>
                    <span>${word}</span>
                 </h2>`
                }
                failed.insertAdjacentHTML('afterend', Innerhtml)

                this.scoreStore.shift(1)
            }

        }
    }
})();


/*UI controller*/
var UIcontroller = (function () {

    return {

        BackGround: function () {
            return {
                gameover: document.querySelector(ReUseableVariables.gameOverContainer)
            }
        },

        Reports: function () {
            return {
                failed: document.querySelector(ReUseableVariables.failedWords),
                passed: document.querySelector(ReUseableVariables.passedWords),
                totalTime: document.querySelector(ReUseableVariables.time),
                grade: document.querySelector(ReUseableVariables.grade)
            }
        }, ////

        UIlabels: function () {
            return {
                TimerLabel: document.querySelector(ReUseableVariables.timerLabel),
                scoreLabel: document.querySelector(ReUseableVariables.scoreLabel)
            }
        },

        InputFields: function () {
            return {
                ///Level returns ..Easy Medium Hard
              //  level: document.querySelector(ReUseableVariables.difficulty).value,
                Answer: document.querySelector(ReUseableVariables.wordContainer),
                wordDisplay: document.querySelector(ReUseableVariables.displayer),
            }
        },
        wordTimer: function (timer, ms) {
            ///calling the timer first
            timer();

            //setting intervals for it
            return setInterval(timer, ms)
        },

    }
})();


/*App Controller*/
var AppController = (function (variables, data, UIctr) {

    var totalTime = 0

    function Robot() {
        totalTime++;
        UIctr.Reports().totalTime.textContent = totalTime + 's';
    }

    CleartotalTime = setInterval(Robot, 1000)

    var stopFunction = function () {

        var total = 0
        data.scoreStore.forEach(function (cur) {
            total = total + cur
        })

        var grading = ''

        if (total <= 25) {
            grading = 'F - Unranked';
        } else if (total <= 50) {
            grading = 'D - Begginer';
        } else if (total <= 60) {
            grading = 'c - Junior';
        } else if (total <= 70) {
            grading = 'B - Senior';
        } else if (total >= 150) {
            grading = 'A - Master';
        }

        UIctr.Reports().grade.textContent = grading
        UIctr.BackGround().gameover.classList.remove('bgVisisbility')

        clearInterval(CleartotalTime)
    }



    var count = parseInt(UIctr.UIlabels().TimerLabel.textContent)

    var startBtn = function () {
        ///start the timer     

        function stopwatch() {
            count--
            if (count === 0) {
                count = 10

                stopFunction()
                UIctr.BackGround().gameover.classList.remove('bgVisisbility')

            }

            document.addEventListener('keypress', function (cur) {
                if (cur.keyCode === 13) {
                    count = 10
                }
            })

            UIctr.UIlabels().TimerLabel.textContent = count + 's'
        }

        var index = -1

        function timing() {
            index++

            document.addEventListener('keypress', function (cur) {
                if (cur.keyCode === 13) {
                    index++
                    UIctr.InputFields().wordDisplay.value = data.wordBank().words[index]
                    console.log(data.wordBank().words.length)
                }
            })

            UIctr.InputFields().wordDisplay.value = data.wordBank().words[index]
        }

        timing();
        UIctr.wordTimer(stopwatch, 1000)
        var answer = UIctr.InputFields().Answer
        answer.focus();

    }


    var Okfunc = function () {

        UIctr.UIlabels().TimerLabel.textContent = '10'

        var answer = UIctr.InputFields().Answer

        var WordDisplayer = UIctr.InputFields().wordDisplay

        var pass = UIctr.Reports().passed

        var fail = UIctr.Reports().failed

        data.wordCheck(WordDisplayer.value, answer.value, pass, fail)

        answer.value = ''

        var total = 0
        data.scoreStore.forEach(function (cur) {
            total = total + cur
        })
        UIctr.UIlabels().scoreLabel.textContent = total
    }
    var ActionEvents = function () {
        document.querySelector(variables.start).addEventListener('click', startBtn)
        document.querySelector(variables.stop).addEventListener('click', stopFunction)
       // document.querySelector(variables.Okbtn).addEventListener('click', Okfunc)
        document.querySelector(variables.tryAgain).addEventListener('click', tryAgain)
        document.addEventListener('keypress', function (cur) {
            if (cur.keyCode === 13) {
                Okfunc()
            }
        })
    }
    var tryAgain = function () {
     location.reload();
    }

    return {
        init: function () {
            ActionEvents();
        }
    }

})(ReUseableVariables, DataStore, UIcontroller);


///starting the app
AppController.init();