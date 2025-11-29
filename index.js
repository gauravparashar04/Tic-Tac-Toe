let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset-btn');
let newbtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let count = 0;
let turnO = true;
const winPatterns = [[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8]
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableboxes();
    msgContainer.classList.add('hide');
}



boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("box is clicked");
        if(turnO){
            box.innerText = "O";
            box.classList.add('o-color');
        }else{
            box.innerText = "X";
            box.classList.add('x-color');
        }
        box.disabled = true;
        turnO = !turnO;
        count++;
        let winner = checkWinner();
        
        if(count === 9 && !winner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableboxes();
};

const disableboxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableboxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove('x-color');
        box.classList.remove('o-color');
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} has won the game.`;
    msgContainer.classList.remove('hide');
    disableboxes();
}
const checkWinner = () => {
    for(let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, 
        // boxes[pattern[2]].innertext);
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                // console.log(`${pos1} is the winner`);
                // alert(`${pos1} is the winner`);

                showWinner(pos1);
            }
        }

    }
};

newbtn.addEventListener('click', resetGame);
resetbtn.addEventListener('click', resetGame);
