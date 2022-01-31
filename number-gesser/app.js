(() => {
    const guesser = document.querySelector('.card-body');
    const guesserInput = guesser.querySelector('#guess-input');
    const guesserBtn = guesser.querySelector('.btn');
    const outputComponent = guesser.querySelector('.message');
    const numberMin = guesser.querySelector('.number-min');
    const numberMax = guesser.querySelector('.number-max');

    const minimum = 3;
    const maximum = 15;

    const rightAnswer = Math.floor(Math.random()*(maximum - minimum + 1) + minimum);
    let retries = 3;
    let savedBoarderColor;

    numberMin.textContent = minimum.toString();
    numberMax.textContent = maximum.toString();

    const isValid = (guess) => !isNaN(guess) && guess >= minimum && guess <= maximum;
    const printOutMessage = (success = true, message) => {
        const color = success ? 'green' : 'red';
        outputComponent.textContent = message;
        outputComponent.style.color = color;
        savedBoarderColor = guesserInput.style.borderColor;
        guesserInput.style.borderColor = color;
    }

    const callForRetry = () => {
        guesserInput.disabled = true;
        guesserBtn.textContent = `Play Again`;
        guesserBtn.className += ' restart-game'
        guesserBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if(-1 !== guesserBtn.className.indexOf('restart-game')){
                document.location.reload();
            }
        });
    }

    guesserBtn.addEventListener('click', (e) => {

        const guessed = parseInt(guesserInput.value.trim());
        if(!isValid(guessed)) {
            printOutMessage(false, `Please enter a number between ${minimum} and ${maximum}`)
        } else if(guessed === rightAnswer) {
            printOutMessage(true, `Congratulations! ${guessed} is the correct Answer.`)
            callForRetry();
        } else {
            retries--;
            if(0 === retries) {
                printOutMessage(false,`Sorry You Lost! The answer was ${rightAnswer}`)
                callForRetry();
            } else {
                printOutMessage(false, `${guessed} is not correct. You have ${retries} attempt left.`)
            }
        }
        e.preventDefault();
    });

    guesserInput.addEventListener('focus', (e) => {
        guesserInput.style.borderColor = savedBoarderColor;
        guesserInput.value = '';
        ///outputComponent.textContent = '';
        e.preventDefault();
    })

})();