const bttn = document.getElementById('button');
const input = document.getElementById('input');
const question = document.getElementById('question');
const reset = document.getElementById('reset');

    function checkInput() {
        const inputTrim = input.value.trim();

        if (!isNaN(inputTrim) && inputTrim !== '') {
           
            bttn.disabled = false;

        } else {
           
            bttn.disabled = true;
        }
    };


    input.addEventListener('input', checkInput);
    checkInput()



bttn.addEventListener('click', () => {
const count = input.value;

    fetch(`http://jservice.io/api/random?count=${count}`)
        .then(response => response.json())
        .then(data => { 
            question.textContent = '';
            
            data.forEach(element => {
                const questionBox=document.createElement("div");
                questionBox.setAttribute('id', 'card');
                questionBox.innerHTML = `<p id="textQuestion">${element.question} : ${element.answer}</p>`;

                const answer = document.createElement("input");
                answer.setAttribute('id', 'answer');

                const check = document.createElement("button");
                check.setAttribute('id', 'check');
                check.innerHTML = 'check';
                
                questionBox.appendChild(answer);
                questionBox.appendChild(check);
                question.appendChild(questionBox);

                const answerLowerCase = element.answer.toLowerCase();

                function checkTheAnswer() {
                    const userAnswer = answer.value.toLowerCase();
                    if (userAnswer === answerLowerCase) {
                        questionBox.style.backgroundColor = "green";
                        questionBox.style.color = "white";

                        const correctAnswerElement = document.createElement("p");
                        correctAnswerElement.textContent = `YOU COOL !!!`;
                        correctAnswerElement.setAttribute('id', 'youCool');

                        questionBox.appendChild(correctAnswerElement);
                    } else {
                        questionBox.style.backgroundColor = "red";
                        questionBox.style.color = "white";

                        const correctAnswerElement = document.createElement("p");
                        correctAnswerElement.textContent = `Correct Answer : ${element.answer}`;
                        correctAnswerElement.setAttribute('id', 'notCool')

                        questionBox.appendChild(correctAnswerElement);
                    }
                };
                

                check.addEventListener('click',() => {
                    checkTheAnswer()
                })
                
                });
         })
        .catch(function (e) {
            console.log("error: ", e)
        })
});

reset.addEventListener('click',() => {
    question.textContent = '';
})