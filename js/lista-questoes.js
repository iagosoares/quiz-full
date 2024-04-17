import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {firebaseConfig} from "./firebase.js"


const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const dbQuestion = ref(database, 'question')



const  tabela = document.getElementById('tabela')
const tbody = document.querySelector('tbody')

preeencheCard()
setInterval(removeCard(), 1000)


document.addEventListener('click', (event) => {
    // Quando um item for clicado, exiba seu texto
    console.log(event.target.tagName + ': ' + event.target.textContent);
});


onValue(dbQuestion, (snapshot)=>{
  
    let values = Object.values(snapshot.val())
    //values não traz o id;
    const dados = Object.entries(snapshot.val());
    
   
    //console.log(dados)
  
    tbody.innerHTML = '';

    




    dados.forEach(item => {

        let tdButton = document.createElement('td');
        let btnDelete = document.createElement('button');
        let btnEdit = document.createElement('button');
        btnDelete.textContent = 'x';
        btnDelete.type = "button";
        btnEdit.type = "button";
        btnEdit.textContent = 'edit';
        btnDelete.classList.add("btn","btn-danger", "m-1", "btn-sm")
        btnEdit.classList.add("btn","btn-warning", "m-1", "btn-sm")


        btnDelete.addEventListener('click', function(){
            let row = this.closest('tr');
            row.remove()
            removeItem(row.childNodes[0].innerText)
            //console.log(row.childNodes[0].innerText)
        })

        btnEdit.addEventListener('click', function(){
            let row = this.closest('tr');
            
            localStorage.setItem("id-edit", row.childNodes[0].innerText);

            // onValue(item, (snapshot)=>{
            //     let dados = Object.entries(snapshot.val());
            //     console.log(dados)

            // })
            //console.log(row.childNodes[0].innerText)
            //console.log(item)
            window.location.href = 'edit-question.html';
        })




          // Criar uma nova linha para cada item
          let tr = document.createElement('tr');

          // Criar o cabeçalho da linha com o ID do item
          let th = document.createElement('th');
          //th.setAttribute('scope', 'row');
        
         // th.textContent = item[0]; // ID do item
  
          // Criar a célula da pergunta
          let td = document.createElement('td');
          let td_quantidade = document.createElement('td');
          td.textContent = item[1].pergunta;
          td_quantidade.textContent = item[1].respostas.length;

          tdButton.appendChild(btnEdit)
          tdButton.appendChild(btnDelete)
          
         
  
          // Adicionar o cabeçalho e a célula à linha
          //tr.appendChild(th);
          tr.appendChild(td);
          tr.appendChild(td_quantidade);
          tr.appendChild(tdButton)
         
  
          // Adicionar a linha à tabela
          tbody.appendChild(tr);

    })

   
});



// function verificaECriaNodoQuestion() {
//     const dbQuestionRef = ref(database, 'question');
//     onValue(dbQuestionRef, (snapshot) => {
//         if (!snapshot.exists()) {
//             // Nó 'question' não existe, então criamos ele com um valor inicial vazio
//             set(dbQuestionRef, {});
//         }
//     });
// }







function arrayAleatorio(arrayDeArrays){
    //recebe um array de arrays e retorna um array montado aleatoriamente.
    let array = arrayDeArrays;
    let newArray = [];

    const indiceAleatorio = Math.floor(Math.random() * array.length);

    while(array.length > 0){
        const indiceAleatorio = Math.floor(Math.random() * array.length);
        newArray.push(array[indiceAleatorio]);
        array.splice(indiceAleatorio, 1)

    }   

    return newArray;

}


function removeItem(id){

    let itemRef = ref(database, `question/${id}`)

     remove(itemRef);
     //função para remover um item do realtime, funcionando

}


function preeencheCard(){
  



    


    onValue(dbQuestion, (snapshot)=>{
        let values = Object.values(snapshot.val())
        //values não traz o id;
        const dados = Object.entries(snapshot.val());

        const arrayAux = arrayAleatorio(dados)

       
        

        for(let i = 0; i < 2; i++){

          let divModelo = document.getElementById('div-modelo')
    
          let card = document.createElement('div')
          console.log(arrayAux[i + 1][1])

          let arrayRespostas = arrayAux[i + 1][1].respostas
          let respostas = '';
          arrayRespostas.forEach(item =>{respostas = respostas + `<button class="btn btn-outline-light m-1">${item}</button> `})
          
          card.innerHTML = 

    `
    <div class="container w-75 border rounded-3 text-light card-exibicao mt-3 my-card" style="background-color: #314a30;">

    <div class="row">
      <div class="col-3 text-start">
          1 / 10
      </div>

      <div class="col-6 text-center">

        <p>Educacao financeira</p>
        
      </div>

      <div class="col-3 text-end">
        <p>470</p>
      </div>
    </div>


    <div class="row">

      <h5>${arrayAux[i + 1][1].pergunta} </h5>
    </div>

    
    <div class="row p-3">` + 
    
    `${respostas}` + `    
      
    </div>        
    

  </div>`


  divModelo.appendChild(card);

          
        }
      
        tbody.innerHTML = '';
    
        //dados.forEach(item => {console.log(item)})
    
    
        dados.forEach(item => {
    
    
    
    //console.log(item[1].pergunta)
    //console.log("aqui")
    //organizar para rodar apenas duas vezes e trazer questoes aleatorias
             
    
        })
    
       
    });

    
   


}

function removeCard() {
  let cards = document.getElementsByClassName("my-card");

  // Itera sobre os elementos selecionados e remove cada um deles
  for (let card of cards) {
    card.remove();
  }
}





