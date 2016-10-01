/*
1 flag
6 bombs
1 spy
8 scouts
5 miners
4 sergeants
4 lieutenants
4 captains
3 majors
2 colonels
1 general
1 marshall
*/

var numPieces = [1, 6, 1, 8, 5, 4, 4, 4, 3, 2, 1, 1];
var pieceNames = ["Flag", "Bomb", "Spy", "Scout", 
				"Miner", "Sergeant", "Lieutenant", "Captain", "Major",
 				"Colonel", "General", "Marshal"];
var selectedPiece = null;
var playerGallery =[[],[],[],[],[]];
var Player1;

function newGame(){
	console.log("New Game Initiated");	
    var myPieces = createPieces(1);
    Player1 = new Player(1, myPieces); 

}

function createPieces(player){
	var table = document.getElementById('playerpieces');
	table.setAttribute('style','visibility:visible');
	var rows = 5;
	var cols = 8;
	var pieceCounter = 0;
	var imageURL="";
	var tempName="";
	var temRank;
	var tempCoords = [0,0];
	var tempPieces = [];


	var piecesToAdd = [];
	for (i=0;i<numPieces.length;i++){
		for (j=0;j<numPieces[i];j++){
			piecesToAdd.push(pieceNames[i])
		}
	}
	piecesToAdd=[piecesToAdd.slice(0,8),
				piecesToAdd.slice(8,16),
				piecesToAdd.slice(16,24),
				piecesToAdd.slice(24,32),
				piecesToAdd.slice(32,40)];

	for (i=0; i<rows; i++){
		current_row_cells = table.rows.item(i).cells;
		for (j=0; j<cols; j++){
				switch(piecesToAdd[i][j]){
					case "Flag":
						imageURL = "images/f.png";
						tempRank = -1;
						break;
					case "Bomb":
						imageURL = "images/0-Bomb.png";
						tempRank = 0;
						break;
					case "Spy":
						imageURL = "images/1-Spy.png";
						tempRank = 1;
						break;
					case "Scout":
						imageURL = "images/2-Scout.png";
						temRank = 2;
						break;
					case "Miner":
						imageURL = "images/3-Miner.png";
						tempRank = 3;
						break;
					case "Sergeant":
						imageURL = "images/4-Sergeant.png";
						tempRank = 4;
						break;
					case "Lieutenant":
						imageURL = "images/5-Lieutenant.png";
						tempRank = 5
						break;
					case "Captain":
						imageURL = "images/6-Captain.png";
						tempRank = 6;
						break;
					case "Major":
						imageURL = "images/7-Major.png";
						tempRank = 7;
						break;
					case "Colonel":
						imageURL = "images/8-Colonel.png";
						tempRank = 8;
						break;
					case "General":
						imageURL = "images/9-General.png";
						tempRank = 9;
						break;
					case "Marshal":
						imageURL = "images/10-Marshal.png";
						tempRank = 10;
						break;
				}
				current_row_cells[j].setAttribute('style','background-image:'+imageURL);
				playerGallery[i].push(current_row_cells[j]);
				current_row_cells[j].addEventListener('click',function(){selectFromOffboard(this.parentNode.rowIndex, this.cellIndex)});
				tempPieces.push(new Piece(piecesToAdd[i],tempRank, player, 
					'alive', 'offboard', new Array(tempCoords[0],tempCoords[1]), imageURL, current_row_cells[j]));
				tempCoords.splice(1, 1, tempCoords[1]+1);
		}
		tempCoords.splice(0,1, tempCoords[0]+1);
		tempCoords.splice(1,1, 0);
	}
	return tempPieces;
}

function selectFromOffboard(r,c){
	selectedCoords = new Array(r,c);
	//un-highlight previously selected cell
	if (selectedPiece != null){
		selectedPiece.galleryLocation.setAttribute('style','border:0px');
	}
	//store new selected cell
	for (var b=0; b<Player1.pieces.length; b++){
		if (Player1.pieces[b].grid == "offboard" & Player1.pieces[b].coords.toString() == selectedCoords.toString()){
			selectedPiece = Player1.pieces[b];
		}
	}
	//highlight new selected cell

	selectedPiece.galleryLocation.setAttribute('style','border: 1px solid red');
}

function Player(num, pieces){
	this.num = num;
	this.pieces = pieces;
}

function Piece(name, rank, player, state, grid, coords, img, galleryLocation){
	this.name = name;
	this.rank = rank;
	this.player = player;
	this.state = state;
	this.grid = grid;
	this.coords = coords;
	this.img = img;
	this.galleryLocation = galleryLocation;
}