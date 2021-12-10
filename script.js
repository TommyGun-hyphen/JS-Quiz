function Section(title){
    this.title = title;
    this.questions = []
}
function Question(id, title){
    this.id = id;
    this.title = title;
    this.reponses = [];
}
function Reponse(id, title, value){
    this.id = id;
    this.title = title;
    this.value = value;
}

Question.prototype.ajouterReponse = function(title, value = false){
    if(typeof title == 'Reponse'){
        this.reponses.push(reponse);
    }else{
        this.reponses.push(new Reponse(this.reponses.length, title, value));
    }
}
Question.prototype.reponseCorrecte = function(){
    return this.reponses.findIndex(e=>e.value == true);
}

Section.prototype.lastQuestion = function(){
    return this.questions[this.questions.length-1];
}
Section.prototype.ajouterQuestion = function(title){
    this.questions.push(new Question(this.questions.length, title));
}
Section.prototype.ajouterQuestion = function(title){
    if(typeof title == 'Question'){
        this.questions.push(title);
    }else{
        this.questions.push(new Question(this.questions.length, title));
    }
}
let sections = [];

let html = new Section('HTML');
html.ajouterQuestion('le role du HTML est de');
html.lastQuestion().ajouterReponse('mettre en forme du texte');
html.lastQuestion().ajouterReponse('ordonner du contenu', true);
html.lastQuestion().ajouterReponse('creer des sites e-commerce');

html.ajouterQuestion('Pour definir un titre dans une page HTML on utilise');

html.lastQuestion().ajouterReponse("l'element title", true);
html.lastQuestion().ajouterReponse("l'element head");
html.lastQuestion().ajouterReponse("un element h1, h2... h6");

let css = new Section('CSS');
css.ajouterQuestion('question 1 css');

css.lastQuestion().ajouterReponse('reponse fausse')
css.lastQuestion().ajouterReponse('reponse vraie', true)
css.lastQuestion().ajouterReponse('reponse fausse')

css.ajouterQuestion('question 2 css')

css.lastQuestion().ajouterReponse('reponse fausse')
css.lastQuestion().ajouterReponse('reponse fausse')
css.lastQuestion().ajouterReponse('reponse vraie', true)

let js = new Section('JAVASCRIPT');
js.ajouterQuestion('question 1 JS');
js.lastQuestion().ajouterReponse('reponse vraie', true);
js.lastQuestion().ajouterReponse('reponse fausse');
js.lastQuestion().ajouterReponse('reponse fausse');

js.ajouterQuestion('question 2 JS');

js.lastQuestion().ajouterReponse('reponse vraie', true);
js.lastQuestion().ajouterReponse('reponse fausse');
js.lastQuestion().ajouterReponse('reponse fausse');

//ajouter les sections a la liste;

sections.push(html);

sections.push(css);

sections.push(js);

function loadQuiz(){
    for(section of sections){
        let sec = document.createElement('details');
        sec.className = 'section';
        sec.innerHTML = '<summary>'+section.title+'</summary><ul class="questions"></ul>'
        for(question of section.questions){
            let li = document.createElement('li');
            li.className = 'question';
            li.id = section.title+'-question-'+question.id;
            li.innerHTML = '<h3>Question numero ' + (question.id+1) +'</h3>';
            li.innerHTML += '<p>'+question.title+'</p>'
            for(reponse of question.reponses){
                let inp = document.createElement('input');
                inp.type = 'radio';
                inp.name = section.title+'-question-'+question.id;
                inp.value = reponse.id;
                inp.id = section.title+'-question-'+question.id+'-reponse-'+reponse.id;

                let lbl = document.createElement('label');
                lbl.htmlFor = section.title+'-question-'+question.id+'-reponse-'+reponse.id;
                lbl.innerHTML = reponse.title;

                li.appendChild(inp);
                li.appendChild(lbl);
                li.appendChild(document.createElement('br'));
            }
            let btnSolution = document.createElement('button');
            btnSolution.innerHTML = 'Solution';
            // btnSolution.onclick = solution(${section.title},${question.id},${reponse.id}`;
            btnSolution.setAttribute('onclick', `solution("${section.title}",${question.id})`);
            li.appendChild(btnSolution);
            sec.getElementsByClassName('questions')[0].appendChild(li);
        }
        document.getElementById('sections').appendChild(sec);
    }
}

function solution(section, question){
    let li = document.getElementById(section+'-question-'+question);
    for(inp of li.getElementsByTagName('input') ){
        inp.checked = false;
        inp.disabled = true;
        
    }
    let sec = sections.find(e=>e.title.toUpperCase() == section.toUpperCase());
    let ques = sec.questions.find(e=>e.id==question);
    let rep = Array.from(document.getElementsByTagName('label')).find(e=>e.htmlFor==section+'-question-'+question+'-reponse-'+ques.reponseCorrecte());
    rep.style.backgroundColor = "green";
}

function valider(){
    let nbQuestions = 0;
    let score = 0;

    for(section of sections){
        for(question of section.questions){
            nbQuestions++;
            if(document.getElementById(section.title+'-question-'+question.id+'-reponse-'+question.reponseCorrecte()).checked){
                score++;
            }else{
                Array.from(document.getElementsByTagName('label')).find(e=>e.htmlFor==section.title+'-question-'+question.id+'-reponse-'+question.reponseCorrecte()).style.backgroundColor = "green";
            }

        }
    }
    Array.from(document.getElementsByTagName('input')).forEach(e=>e.disabled = false);

    document.getElementById('score').innerHTML = score + '/' + nbQuestions;
}