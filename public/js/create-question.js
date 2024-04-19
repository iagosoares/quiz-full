import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {firebaseConfig} from "./firebase.js";

      

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)



const dbQuestion = ref(database, 'question')


const inputAnswers = document.getElementById("input-answers")
const btnAddAnswers = document.getElementById("add-answers");
const btnRemoveAnswer = document.getElementById("btn-respostas-excluir");


btnAddAnswers.addEventListener('click', function(){
   
    createSelect();
    
});

btnRemoveAnswer.addEventListener('click', function(){
    let select = document.getElementById('selectAlternativaCorreta');
    let selectedValue = select.selectedIndex;

    let option = document.querySelectorAll('option')

    if(selectedValue <= 0)
        return;    

    deletarSelect();
});


const buttonAdd = document.getElementById("add-button")

buttonAdd.addEventListener('click', function(){

    const inputQuestion = document.getElementById("input-question")
    let answer = document.querySelectorAll('option')
    let arrayAnswer = [];

    let select = document.getElementById('selectAlternativaCorreta');

    
    let selectedValue = select.selectedIndex - 1;
    

    answer.forEach(item => {
        if(item.classList.contains('item-answer')){
            arrayAnswer.push(item.value)

        }
    })

    const json = {

        pergunta: inputQuestion.value,
        respostas: arrayAnswer,
        alternativaCorreta: selectedValue,


    };
    
    push(dbQuestion, json)
    inputQuestion.value = ""
    limpaInputs();
    
});


 function getData(){
            onValue(dbQuestion, (snapshot)=>{
                let values = Object.values(snapshot.val())
                let id = Object.entries(snapshot.val());

                //values.forEach(item => {console.log(item)});

                id.forEach(item => {console.log(item)});
                
               
            });
        }


function createSelect(){
    let select = document.getElementById('selectAlternativaCorreta');
    let option = document.createElement('option');

    option.text = inputAnswers.value;
    option.className = "item-answer"
    select.add(option);

    inputAnswers.value = '';

}

function deletarSelect(){
    let select = document.getElementById('selectAlternativaCorreta');
    let selectedValue = select.selectedIndex;

    select.remove(selectedValue);

    console.log("item "+selectedValue + '\nfoi removido')
}

function limpaInputs(){
    let inputs = document.querySelectorAll('input');
    
    inputs.forEach(item => {
        item.value = '';
    })

    let select = document.getElementsByClassName('item-answer')
    
    Array.from(select).forEach(item => {
        item.remove();
    });

}

function verificaECriaNodoQuestion() {
    const dbQuestionRef = ref(database, 'question');
    onValue(dbQuestionRef, (snapshot) => {
        if (!snapshot.exists()) {
            // Nó 'question' não existe, então criamos ele com um valor inicial vazio
            set(dbQuestionRef, {});
        }
    });
}


