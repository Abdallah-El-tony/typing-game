let title = document.querySelector('.title')
let level = document.querySelector('.level')
let second = document.querySelector('.second')
startbtn = document.querySelector('.startbtn')
theword = document.querySelector('.theword')
input = document.getElementById('input')
upcomingwords = document.querySelector('.upcomingwords')
spansecond = document.getElementById('span1')
score = document.querySelector('.score span')
finish = document.querySelector('.finish')
length = document.querySelector('.lenght')
let selectLevel = document.querySelectorAll('.selectlevel input')


let words=["hellow","world","linked","framwork","linking","programming","desructring","langrage",
"coding","company","article"]
//  "coding","similaraty",
//  "markup","style","sheet",
//  "javascript","html","matlab",
//  "science","country","work"
//  ,"word","working","intertainment",
//  "computer","thinking",
// "second","minutes",
// "hourse","editor",

           let levels = {
            "easy":5,
            "normal":3,
            "hard":2
           }
            let defaultsecond=levels["normal"];
           if(sessionStorage.word){
            words=JSON.parse(sessionStorage.word)
           }
           selectLevel.forEach((lvl)=>{
            lvl.addEventListener('input',function(){
                selectLevel.forEach((lv)=>{
                    lv.checked = false

                })
                this.checked = true
            defaultlvl = this.getAttribute('id')
            defaultsecond = levels[defaultlvl]
           level.innerHTML=defaultlvl;
           second.innerHTML=defaultsecond
           spansecond.innerHTML=defaultsecond;
                
            })
           })
         
           
           length.innerHTML=words.length;
           let random;
           

           startbtn.onclick = function(){
          this.remove();
          input.focus();
          genwords()
           }
           function genwords(){
            random= words[Math.floor(Math.random()*words.length)]
            let index = words.indexOf(random)
            words.splice(index,1)
            theword.innerHTML=random;
            upcomingwords.innerHTML=''
            for(let i=0; i<words.length; i++)
            {
              upcomingwords.innerHTML+=`
              <p class="items">${words[i]}</p>
              `
            }
            startplay()
           }
           function startplay(){
            spansecond.innerHTML=defaultsecond;
            let startcount = setInterval(function(){
                spansecond.innerHTML--;
                if(spansecond.innerHTML==="0"){
                clearInterval(startcount)
                if(theword.innerHTML.toLowerCase()===input.value.toLowerCase()){
                    input.value=''
                    score.innerHTML++;
                    if(words.length > 0){
                        genwords()
                    }
                    else {
                        finish.style.color='green'
                        finish.innerHTML='Congratulation'
                        upcomingwords.innerHTML=''
                        theword.remove()
                        input.disabled=true
                        document.getElementById('good').play()
                        setTimeout(function(){
                            location.reload()
                        },2500)
                        
                    }
                    

                }
                else {
                    document.getElementById('fail').play();
                    finish.style.color='red'
                    finish.innerHTML='Game Over'
                    input.disabled=true
                    setTimeout(function(){
                        location.reload()
                    },3000)
                }
            }
            },1000)
        
           }

           sessionStorage.setItem('word',JSON.stringify(words))

           