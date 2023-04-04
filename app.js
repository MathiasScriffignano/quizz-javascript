// on s'éléctionne le formulaire
const form = document.querySelector('.form-quizz');
let tableauResultat = [];
// ajout des réponse dans un tableau
const reponse = ['c','a','b','a','c'];
const emojis = ['✔️','✨','👀','😭','👎'];
const titreResultat = document.querySelector('.resultats h2');
const noteResultat = document.querySelector('.note');
const aideResultat = document.querySelector('.aide');
const toutesLesQuestions = document.querySelectorAll('.question-block');
let verifTableau = [];

// on ecouter l'éventement avec le bouton submit
form.addEventListener('submit', (e) => {
    // previen le comportement par défault ( ici empeche d'actualiser la page)
    e.preventDefault()
    // on récupere les données en local
    
    // quand on va soumettre le formulaire on va récup le premier input 
    // console.log(document.querySelector('input[name="q1"]:checked').value);

    // on créer une boucle recupérer le résultat de tout les input
    for(i=1; i < 6; i++){
        // on intégre les résultat dans un tableau 
        tableauResultat.push(document.querySelector(`input[name="q${i}"]:checked`).value);
    } 
    // console.log(tableauResultat);
    verifFunc(tableauResultat);
    // renitialise notre tableau a zero a chaque fois que les reponse ce valider
    tableauResultat = [];
}) 
// pour comparé les résultat des réponse séléctionné et les vrais réponses
function verifFunc (tabResultats){
    // on créer la boucle pour vérifier tout les réponse 
    for(let a = 0; a < 5; a++){
        //  si la réponse de la question séléctionner est égale a la vrais réponse alors on envoie true
        if(tabResultats[a] === reponse[a]){
            verifTableau.push(true);
        }else{
            verifTableau.push(false);
        }
    }

    // console.log(verifTableau);
    afficherResultat(verifTableau);
    // pour les couleur bonne réponse et mauvaise réponse 
    couleurFonction(verifTableau);
    verifTableau = []; 
}



// on affiche les résultat a la fin du questionnaires 
function afficherResultat(tabCheck){
    // On affiche le nbr de faute de l'utilisateur en filtrant un tableau et en créant un nouveau avec el qui affichera que les fautes 
    const nbFautes = tabCheck.filter(el => el !== true).length;
    // console.log(nbFautes);
    // on utilise la fonction switch pour afficher un message différent celon le nombre de faute 
    switch(nbFautes){
        // Quand le nbr de faute est = a 0 ect ect
        case 0 :
            titreResultat.innerText = `${emojis[0]} Bravo, c'est un sans faute !${emojis[0]} `;
            aideResultat.innerText = '';
            noteResultat.innerText = '5/5';
        break;
        case 1 :
            titreResultat.innerText = `${emojis[1]} Vous y êtes presque !${emojis[1]} `;
            aideResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
            noteResultat.innerText = '4/5';
        break;
        case 2 :
            titreResultat.innerText = `${emojis[1]} Encore un effort ...${emojis[2]} `;
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '3/5';
        break;
        case 3 :
            titreResultat.innerText = `${emojis[2]} Il reste quelques erreurs.${emojis[3]} `;
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '2/5';
        break;
        case 4 :
            titreResultat.innerText = `${emojis[3]} Peux mieux faire !${emojis[3]} `;
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '1/5';
        break;
        case 5 :
            titreResultat.innerText = `${emojis[4]}Peux mieux faire !${emojis[4]} `;
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '0/5';
        break;
        default : 
        'Wops, cas innatendu';
    }
}

// fonction pour afficher une couleur si on a faut ou juste 

function couleurFonction(tabValBool){

    for ( let j = 0 ; j < tabValBool.length; j++){
        // SI toute les réponse sont vrais alors le fond vert apparait 
        if(tabValBool[j] === true){
            toutesLesQuestions[j].style.background = 'lightgreen'; 
        }else{  // si les réponse sont fausse alors mais un fond rouge et appelle l'animation 
            toutesLesQuestions[j].style.background = '#ffb8b8';
            toutesLesQuestions[j].classList.add('echec');
            // pour répéter l'animation
            setTimeout(() => {
                toutesLesQuestions[j].classList.remove('echec');
            }, 500 )
        }
    }
}

// quand on retente reset les couleurs ( foraech va exectuer une fonction sur chaque élément du tableau )

toutesLesQuestions.forEach(item => {
    item.addEventListener ('click', () => {
        item.style.background = "white"; 
    })
})
