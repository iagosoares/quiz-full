import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {firebaseConfig} from "./firebase.js";

//comentar e entender o que cada linha está fazendo, para poder continuar para o edit.
      

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
//inicialização do realtime database.

const id = localStorage.getItem("id-edit");

const dbQuestion = ref(database, 'question')
//referenciando o banco de dados desejado, nesse caso "question".

const referencia = ref(database, 'question/' + id);





const btnAddAnswers = document.getElementById("add-answers");
//botão para [+] adicionar resposta.

const btnRemoveAnswer = document.getElementById("btn-respostas-excluir");
//botão para [-] remover uma resposta.

const buttonSalve = document.getElementById("add-button")
//botão de salvar 


btnAddAnswers.addEventListener('click', function(){createSelect()});

btnRemoveAnswer.addEventListener('click', function(){deletarSelect()});



console.log("id selecionado: " + id)



getData();


buttonSalve.addEventListener('click', function(){

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

    console.log(json)

    update(referencia, json)
    
    window.location.href = '../paginas/gerenciarQuestoes.html';
    
    
});

   


 function getData(){
            onValue(referencia, (snapshot)=>{
                let values = Object.values(snapshot.val())
                //let id = Object.entries(snapshot.val());

                let inputQuestion = document.getElementById("input-question").value = values[1]

                //values.forEach(item => {console.log(item)});
                //let dados =  snapshot.val();
                //id.forEach(item => {console.log(item)});
                console.log(values)

                selectFill(values[2])
               
                
               
            });
        }


        function selectFill(array){
            let select = document.getElementById('selectAlternativaCorreta');
            
            array.forEach(item => {
                let option = document.createElement('option');
                option.text = item;
                option.className = "item-answer";
                select.add(option);

            })
        }


function createSelect(){

    let inputAnswers = document.getElementById("input-answers");
    //toda vez que clicarem no botão vai pegar o input do momento

    if(inputAnswers.value.trim().length === 0)
    return;
    //caso o input esteja vazio e o botão é clicado, não faz absutamente nada, n vai adicionar valor vazio no option do select.


    let select = document.getElementById('selectAlternativaCorreta');
    //depois da validação do input não estar vazio, acessamos o elemento select

    let option = document.createElement('option');
    //cria um elemento option


    option.text = inputAnswers.value;
    option.className = "item-answer";
    select.add(option);

    inputAnswers.value = '';

}

function deletarSelect(){
    let select = document.getElementById('selectAlternativaCorreta');
    let selectedValue = select.selectedIndex;
    //-1 quando nao é selecionado nenhum item, 1 quando tem apenas um item

    if(selectedValue === -1)
        return;
    //caso não tenha nenhum item no select ele não faz nada  

    select.remove(selectedValue);
    console.log("item "+selectedValue + ' foi removido')
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


