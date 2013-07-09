var Tile = function(scene){
	this.cube = new THREE.Mesh(
        		new THREE.CubeGeometry(50, 15, 50),
        		new THREE.MeshLambertMaterial({color: 0xC4CDD1}));
        		
    this.cube.position.y = 0;
    
    this.state = "empty";
    
    scene.add(this.cube);
	
	this.scene = scene;
}

Tile.prototype.fill = function(){
	this.state = "filled";
	
	this.fill = new THREE.Mesh(
        		new THREE.CubeGeometry(30, 40, 30),
        		new THREE.MeshLambertMaterial({color: 0xC7162B}));
        		
    this.fill.position.x = this.cube.position.x;
    this.fill.position.z = this.cube.position.z;
    this.fill.position.y = 20;
    
    this.scene.add(this.fill);
}


var Grid = function(size, scene){
	this.size = size;
	this.scene = scene;
	
	this.array = new Array();
	
	this.selector = new Selector(0, 0, this.scene);
	
	this.shiftType = "h";
	
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
	this.array[x-1][y-1].fill();
}

Grid.prototype.horizontalShift = function(){
	this.shiftType = "horizontal";
	
	var vertPos = this.selector.y + 1;
	
	var temp = this.array[0][vertPos];
	
	for(var i = 0; i < this.size - 1; i++){
		this.array[i][vertPos] = this.array[i+1][vertPos];
	}
	this.array[this.size-1][vertPos] = temp;
}

Grid.prototype.verticalShift = function(){
	this.shiftType = "vertical";
	
	var horPos = this.selector.x + 1;
	
	var temp = this.array[horPos][0];
	
	for(var i = 0; i < this.size - 1; i++){
		this.array[horPos][i] = this.array[horPos][i+1];
	}
	this.array[horPos][this.size - 1] = temp;
}

Grid.prototype.animate = function(){
	var bool = true;
	
	if(this.shiftType === "horizontal") bool = this.animateh();
	if(this.shiftType === "vertical") bool = this.animatev(); 
	
	return bool;
}

Grid.prototype.tracker = 55;
Grid.prototype.aToggle = false;

Grid.prototype.animateh = function(){
	
	var vertPos = this.selector.y + 1;
	
	
	if(this.tracker !== 0){
		for(var i = 0; i < this.size; i++){
			this.array[i][vertPos].cube.position.x -= 1;	
			
		}
		this.tracker -= 1;
	}
	
	if(this.tracker === 0){
		this.array[this.size-1][vertPos].cube.position.y -= 10;
	}
	
	if(this.array[this.size-1][vertPos].cube.position.y < -500){
		this.array[this.size-1][vertPos].cube.position.y = 500;
		this.array[this.size-1][vertPos].cube.position.x = 55*(this.size-1);
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
	var horPos = this.selector.x + 1;
	
	
	if(this.tracker !== 0){
		for(var i = 0; i < this.size; i++){
			this.array[horPos][i].cube.position.z -= 1;
		}
		this.tracker -= 1;
	}
	
	if(this.tracker === 0){
		this.array[horPos][this.size-1].cube.position.y -= 10;
	}
	
	if(this.array[horPos][this.size-1].cube.position.y < -500){
		this.array[horPos][this.size-1].cube.position.y = 500;
		this.array[horPos][this.size-1].cube.position.z = 55*(this.size-1);
		this.aToggle = true;
	}
	
	if(this.aToggle && this.array[horPos][this.size-1].cube.position.y === 0){
		this.tracker = 55;
		this.aToggle = false;
		return false;
	}
	
	return true;
}
