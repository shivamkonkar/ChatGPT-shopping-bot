
let jsonString = ""
// Load questions from JSON
let questions = [];
fetch('/json/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        displayQuestion(0);
    });


// Initialize answers array
let answers = [];
let optionsArray = []
let sentence1Array = []
let sentence2Array = []
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsForm = document.getElementById('options-form');
const submitBtn = document.getElementById('submit')

// Display a question
function displayQuestion(index) {
    if (index < questions.length) {
        questionElement.textContent = questions[index].question;
        optionsForm.innerHTML = '';
        sentence1Array = questions[index].Sentence1
        console.log(sentence1Array)
        sentence2Array = questions[index].Sentence2
        console.log(sentence2Array)
        optionsArray = questions[index].options
        console.log(optionsArray)
        questions[index].options.forEach((option, optionIndex) => {
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'answer';
            radioInput.value = option;
            radioInput.id = `option${optionIndex}`;
            const label = document.createElement('label');
            const br = document.createElement('br')
            label.id = `option${optionIndex}`;
            label.textContent = option;
            optionsForm.appendChild(radioInput);
            optionsForm.appendChild(label);
            optionsForm.appendChild(br)
            optionsForm.appendChild(submitBtn)
        });
    } else {
        questionContainer.innerHTML = '<p>Thank you for completing the questionnaire!</p> <br> <a href="/gpt" id="submit">chatbot</a>';
        
    }
}

//Handle form submission
optionsForm.addEventListener('change', () => {
    submitBtn.disabled = false;
});

let finalKeywords = [];

optionsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    console.log(selectedOption.value)
    var selectedIndex = optionsArray.indexOf(selectedOption.value);
    if (selectedOption) {
        if(selectedIndex == 0){
            answers.push({ question: questionElement.textContent, answer: selectedOption.value, keywords: sentence1Array });
        }
        else{
            answers.push({ question: questionElement.textContent, answer: selectedOption.value, keywords: sentence2Array });
        }
        
        console.log(answers)
        if (answers.length > 0) {
            // const finalKeywords = [];
            answers.forEach((dict) => {
                if (dict.hasOwnProperty('keywords')) {
                    finalKeywords.push(...dict.keywords);
                }
            });

            console.log(finalKeywords);

            if (answers.length === questions.length) {
                sendDataToBackend(finalKeywords);
              }

            // const filePath = '/json/keywords.json';
            // const jsonData = JSON.stringify(finalKeywords, null, 2);
            // fs.writeFileSync(filePath, jsonData, 'utf-8');
            // console.log(`JSON file saved at ${filePath}`);
        }
        displayQuestion(answers.length);
    }
});

// fetch('/save-question-data', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(finalKeywords)
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });

async function sendDataToBackend(data) {
    const resp = await fetch('/save-question-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    // //   .then(response => response.json())
    //   .then(responseData => {
    //     console.log('Data sent to backend:', responseData);
    //   })
    //   .catch(error => {
    //     console.error('Error sending data to backend:', error);
    //   });
  }