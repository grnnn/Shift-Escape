var vertexShaderText = $('#cube-vertex-shader').text();
var fragmentShaderText = $('#cube-fragment-shader').text();

var BlockerMaterial = new THREE.ShaderMaterial({
    uniforms: { 
      'uBeatTime': { type: 'f', value: 0.0 },
      'ran1': { type: 'f', value: 0.0 },
      'ran2': { type: 'f', value: 0.0 },
      'ran3': { type: 'f', value: 0.0 },
    },
    vertexShader: vertexShaderText,
    fragmentShader: fragmentShaderText
});

var Tile = function(scene){
	this.cube = new THREE.Mesh(
        		new THREE.CubeGeometry(50, 15, 50),
        		new THREE.MeshLambertMaterial({color: 0xC4CDD1}));
        		
    this.cube.position.y = 0;
    
    this.state = "empty";
    
    scene.add(this.cube);
	
	this.newBlockerMaterial;
	
	this.scene = scene;
}

Tile.prototype.block = function(){
	this.state = "filled";
	
	this.newBlockerMaterial = BlockerMaterial.clone();
	this.newBlockerMaterial.uniforms['ran1'].value = Math.random();
	this.newBlockerMaterial.uniforms['ran2'].value = Math.random();
	this.newBlockerMaterial.uniforms['ran3'].value = Math.random();
	
	this.fill = new THREE.Mesh(
        		new THREE.CubeGeometry(30, 40, 30),
        		this.newBlockerMaterial);
        		
    this.fill.position.x = this.cube.position.x;
    this.fill.position.z = this.cube.position.z;
    this.fill.position.y = 20;
    
    
    
    this.scene.add(this.fill);
}

Tile.prototype.empty = function(){
	this.state = "empty";
	
	this.scene.remove(this.fill);
	
	this.fill = null;
}

Tile.prototype.updateBeat = function(beat){
	this.newBlockerMaterial.uniforms['uBeatTime'].value = beat;
}

var Grid = function(size, scene){
	this.size = size;
	this.scene = scene;
	
	this.array = new Array();
	
	this.selector = new Selector(1, 1, this.scene);
	
	this.shiftType = "h";
	
	this.player = new Player(5, 1, this.scene);
	
	this.count = 0;
	
	this.init();
	
}

Grid.prototype.init = function(){
	var scene = this.scene;
	for(var i = 0; i < this.size; i++){
		
		this.array.push(new Array());
		
		for(var j = 0; j < this.size; j++){
			this.array[i].push(new Tile(scene));
			
			this.array[i][j].cube.position.x = i*55;
			this.array[i][j].cube.position.z = j*55;
			
		}
	}
	
	
}

Grid.prototype.fillTile = function(x, y){	
	this.array[x-1][y-1].block();
}

Grid.prototype.canShift = function(dir){
	if(dir === "horizontal"){
		if(this.selector.y === this.player.y || this.count === 0) return false;
	}
	if(dir === "vertical"){
		if(this.selector.x === this.player.x || this.count === 0) return false;
	}
	return true;
}

Grid.prototype.horizontalShift = function(){
	this.shiftType = "horizontal";
	
	var vertPos = this.selector.y;
	
	var temp = this.array[0][vertPos];
	
	for(var i = 0; i < this.size - 1; i++){
		this.array[i][vertPos] = this.array[i+1][vertPos];
	}
	this.array[this.size-1][vertPos] = temp;
	
	this.count--;
}

Grid.prototype.verticalShift = function(){
	this.shiftType = "vertical";
	
	var horPos = this.selector.x;
	
	var temp = this.array[horPos][0];
	
	for(var i = 0; i < this.size - 1; i++){
		this.array[horPos][i] = this.array[horPos][i+1];
	}
	this.array[horPos][this.size - 1] = temp;
	
	this.count--;
}

Grid.prototype.animate = function(){
	var bool = true;
	
	if(this.shiftType === "horizontal") bool = this.animateh();
	if(this.shiftType === "vertical") bool = this.animatev(); 
	if(this.shiftType === "up") bool = this.player.moveUp();
	if(this.shiftType === "down") bool = this.player.moveDown();
	if(this.shiftType === "left") bool = this.player.moveLeft();
	if(this.shiftType === "right") bool = this.player.moveRight();
	
	return bool;
}

Grid.prototype.tracker = 55;
Grid.prototype.aToggle = false;

Grid.prototype.animateh = function(){
	
	var vertPos = this.selector.y;
	
	
	if(this.tracker !== 0){
		for(var i = 0; i < this.size; i++){
			this.array[i][vertPos].cube.position.x -= 1;	
			if(this.array[i][vertPos].state === "filled"){
				this.array[i][vertPos].fill.position.x -= 1;
			}
		}
		this.tracker -= 1;
	}
	
	if(this.tracker === 0){
		this.array[this.size-1][vertPos].cube.position.y -= 10;
		if(this.array[this.size-1][vertPos].state === "filled"){
			this.array[this.size-1][vertPos].fill.position.y -= 10;
		}
	}
	
	if(this.array[this.size-1][vertPos].cube.position.y < -500){
		this.array[this.size-1][vertPos].cube.position.y = 500;
		this.array[this.size-1][vertPos].cube.position.x = 55*(this.size-1);
		if(this.array[this.size-1][vertPos].state === "filled"){
			this.array[this.size-1][vertPos].fill.position.y = 520;
			this.array[this.size-1][vertPos].fill.position.x = 55*(this.size-1);
		}
		this.aToggle = true;
	}
	
	if(this.aToggle && this.array[this.size-1][vertPos].cube.position.y === 0){
		this.tracker = 55;
		this.aToggle = false;
		return false;
	}
	
	return true;
}

Grid.prototype.animatev = function(){
	var horPos = this.selector.x;
	
	
	if(this.tracker !== 0){
		for(var i = 0; i < this.size; i++){
			this.array[horPos][i].cube.position.z -= 1;
			if(this.array[horPos][i].state === "filled"){
				this.array[horPos][i].fill.position.z -= 1;
			}
		}
		this.tracker -= 1;
	}
	
	if(this.tracker === 0){
		this.array[horPos][this.size-1].cube.position.y -= 10;
		if(this.array[horPos][this.size-1].state === "filled"){
			this.array[horPos][this.size-1].fill.position.y -= 10;
		}
	}
	
	if(this.array[horPos][this.size-1].cube.position.y < -500){
		this.array[horPos][this.size-1].cube.position.y = 500;
		this.array[horPos][this.size-1].cube.position.z = 55*(this.size-1);
		if(this.array[horPos][this.size-1].state === "filled"){
			this.array[horPos][this.size-1].fill.position.y = 520;
			this.array[horPos][this.size-1].fill.position.z = 55*(this.size-1);
		}
		this.aToggle = true;
	}
	
	if(this.aToggle && this.array[horPos][this.size-1].cube.position.y === 0){
		this.tracker = 55;
		this.aToggle = false;
		return false;
	}
	
	return true;
}

Grid.prototype.canMove = function(dir){
	if(dir === "up"){
		if(this.player.y > 6 || this.array[this.player.x][this.player.y + 1].state === "filled") return false;
	}
	if(dir === "down"){
		if(this.player.y < 1 || this.array[this.player.x][this.player.y - 1].state === "filled") return false;
	}
	if(dir === "left"){
		if(this.player.x > 6 || this.array[this.player.x + 1][this.player.y].state === "filled") return false;
	}
	if(dir === "right"){
		if(this.player.x < 1 || this.array[this.player.x - 1][this.player.y].state === "filled") return false;
	}
	return true;
}

Grid.prototype.setAnimation = function(dir){
	this.shiftType = dir;
}

Grid.prototype.clear = function(){
	for(var i = 0; i < this.size; i++){
		for(var j = 0; j < this.size; j++){
			if(this.array[i][j].state === "filled") this.array[i][j].empty();
		}
	}
	this.player.returnToStart();
}

Grid.prototype.checkWin = function(){
	if(this.player.y === 7) return true;
	return false;
}

Grid.prototype.updateBeats = function(beat){
	for(var i = 0; i < this.size; i++){
		for(var j = 0; j < this.size; j++){
			if(this.array[i][j].state === "filled") this.array[i][j].updateBeat(beat);
		}
	}
}
