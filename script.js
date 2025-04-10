const bubbleContainer = document.querySelector('.bubble_container')     //hm getElementbyClassName k through b call kr sakte the but phr hmain . lagane ki zarorat ni thi
const timerDisplay = document.getElementById('timer')        // similarly isko hm queryselector se b call kr sakte the but phr start main # lagane ki zarorat hoti hai. 
const targetDisplay = document.getElementById('target')
const scoreDisplay = document.getElementById('score')
const originalTiming = 10;
let leftTime = 10;
let score = 0;
let bubbleCount = 100;

function createBubbles () {
    bubbleContainer.innerHTML = ''      //ye step hmne is liye kia q k game reset krne k bad append child ki wja se "reset btn + gameover" bubbles k andr show ho rhe the so hmne bubble container ko khali kia with inner.HTML before reset. append child jitne steps hogy hn unke bad append krta hai.
    for (let i=1; i<=bubbleCount; i++){
        const bubble = document.createElement('div')    //ye hm ne document k andr rounded bubbles divs create krne k liye bnaya
        bubble.classList.add("bubble");   //same html wala process hai yahan se: k hm ek div bnate phr class dete so yahan bracket main bubble class di hai q k isi name se css main styling b ki hai. r phr koi text lete jese k neche.
        bubble.textContent = Math.floor(Math.random()*10);  //phr html main hm jese hm koi text dalte div main yahan hm text dal rhe but in a diffrent way.
        bubbleContainer.appendChild(bubble)        //ye step bta rha hai k bubble ko yani child ko parent yani bubble_container main dalna hai.
    }
}

function generateTarget() {            //Math.floor hmain 0-9 tk values deta r wo b starting r lowest value deta yani 6.9899 hai to ye 6 hi dega na
    const target = Math.floor(Math.random()*10)   // k 7 bna kr dega. jbke agr hm Math.seal krte to phr highest value ati jese k 6.9 , would be 7 then. r ek bat 9.9 ho to M.seal main 1 dega na k 10 q k range 0-9 hai + agr 0.1 hoto 1 tobhi 1 integer dega. ye bat wese samjh ni i..
    targetDisplay.textContent = target;   // yahan pe hm targetDisplay k var main apna textContent dal rhe jo k math.floor se arha.
 }             //agr sirf text dalna hai to textContent use hota lakin agr pora ka pora html yani div dalna hai to inner.HTML use hota.

 function startTimer() {
    const timeInterval = setInterval(() => {       //setInterval is a buil-in function used to execute until stopped using clearInterval.
        // console.log("hello bhaiya");
        leftTime--;        
        timerDisplay.textContent = leftTime;   //ye screen pe left side pe jo left time reh gya wo show krne k liye banaya.
        if(leftTime === 0){               //leftTime minus main b chal rha tha so isko stop krne clearInterval ka func lagaya.
            clearInterval(timeInterval);  //clearInterval ki value setInterval main store krane k liye hm ne const timeInterval bnaya upr taky timer ruk jay. 
//gameOver hone k bad hme jo screen dekhani uske liye hmne neche wale div & btn bnaye in backticks`.            
            bubbleContainer.innerHTML = `   
            <div class = "append_container">
            <div class="game_over">Game Over</div>
            <div class="final_score">Score: ${score}</div>    
            <button class="reset_btn" onclick="resetGame()">Restart</button>
         </div>
         `        
        }
    }, 1000)   // 1sec = 1000milisec
 }

 function startGame() {    //reset krne k bad jb game dobara start hogi to uske liye func banana parha q k bubbles show ni ho rhe the after reset.
    createBubbles();
    generateTarget();
    startTimer();
 }

 function resetGame (){
  leftTime = originalTiming;
  score = 0;
  timerDisplay.textContent = leftTime;
  scoreDisplay.textContent = 0;
  startGame();
 }

//Agr 100 bubbles hain to kia sbpe seperatly loop kr k eventListener lagayn ge ? ni q us se site bht slow hojay ga. So isi liye hmne event delegation 
//ka concept use kia jis main parent pe eventListener lagaya r wo khud bakhud child pr event ko catch kr le ga q k jb child yani bubble pe click kre ga koi to event bubbleup hoke parent k pas jayga. 
 bubbleContainer.addEventListener('click',(event)=>{    ///hm chahte hain k bubble ko click karain to score update ho so is k liye click event lagaya parent yani bubble-container pe. 
    if(event.target.classList.contains('bubble')){    //yahan event.target ek property hai na k upr wala "const=target2. jo bta rha k event yani click 
// kis ne trigger kia. classList ye btata k click bubble pe ho rha ya ni ? ('bubble') k sath '.' ni lagayn ge q k classList likha hai so no need.
//(bubble) k agy ek 's' lagaya hua tha, to na hi target update horha tha r na hi score. pora ghanta lga k s ki mistake nazar i halanke 10 bar code tally kr chuki thi.
      if(event.target.textContent === targetDisplay.textContent){   // ye step bta rha k jo target game de rhi hai agr usi bubble pe click ho rha hai to score + ni to - hojay.
        score += 10;
      }else{
        score -= 5;
      }
      scoreDisplay.textContent = score;
      generateTarget();
      createBubbles();

    }
 })


createBubbles();  //ye upr 2nd num pe hm ne jo createBubble wala function bnaya tha yahan pr hm ab usko call kr rhe hain.
generateTarget();
startTimer();