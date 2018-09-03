window.onload = () => {
	for (let i = 1; i <= 9; i++) {
		document.getElementById('TicTac').innerHTML += `<div class="cell" data-cell="${i}"></div>`;
	}

	let 
	  cells = document.getElementsByClassName("cell"),
	  reset = document.getElementById("reset"),
	  message = document.getElementById("message"),
	  stepCounter  = 0,
	  dataX = [],
	  dataO = [],
	  player = "X";
	const winCombs = [
	    [1, 2, 3],
	    [1, 4, 7],
	    [1, 5, 9],
	    [2, 5, 8],
	    [3, 6, 9],
	    [3, 5, 7],
	    [4, 5, 6],
	    [7, 8, 9]
	];


	for (let i = 0; i < cells.length; i++) {
	  cells[i].addEventListener("click", currentStep);
	}

	function currentStep() {
	  let numberOfCell = +this.getAttribute("data-cell");
	  if (!this.textContent) {
	    this.innerText = player;
	    player === "X" ? dataX.push(numberOfCell) && this.classList.add("x") : dataO.push(numberOfCell) && this.classList.add("o");
	    if ((dataO.length > 2 || dataX.length > 2) &&(checkWin(dataO, numberOfCell) || checkWin(dataX, numberOfCell))) {
	      for (let i = 0; i < cells.length; i++) {
	        cells[i].removeEventListener("click", currentStep);
	      }

	      return (message.innerText = `Победил игрок ${player}`);
	    }
	    changePlayer();
	    stepCounter ++;
	    if (stepCounter  === 9)
	       message.innerText = "Ничья!";
	  }
	}

	function changePlayer() {
	  player === "X" ? (player = "O") : (player = "X");
	}

	function checkWin(arr, currentAmountOfCells) {
	  for (let j = 0; j < winCombs.length; j++) {
	    let winArray = winCombs[j],
	      count = 0;
	    if (winArray.indexOf(currentAmountOfCells) !== -1) {
	      for (let k = 0; k < winArray.length; k++) {
	        if (arr.indexOf(winArray[k]) !== -1) {
	          count++;
	          if (count === 3) {

	            return true;
	          }
	        }
	      }
	      count = 0;
	    }
	  }
	}

	reset.addEventListener("click", () => {
	  for (let i = 0; i < cells.length; i++) {
	    cells[i].innerText = "";
	  }
	  dataO = [];
	  dataX = [];
	  player = "X";
	  stepCounter  = 0;
	  message.innerText = "";

	  for (let i = 0; i < cells.length; i++) {
	    cells[i].addEventListener("click", currentStep);
	    cells[i].classList.remove("x", "o");
	  }
	});

}