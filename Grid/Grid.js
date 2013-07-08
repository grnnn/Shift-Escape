var Tile = function(scene){
	this.cube = this.litCube = new THREE.Mesh(
        		new THREE.CubeGeometry(50, 15, 50),
        		new THREE.MeshLambertMaterial({color: 0xC4CDD1}));
        		
    this.cube.position.y = 0;
    
    this.state = "empty";
    
    scene.add(this.cube);
	
}

Tile.prototype.fill = function(){
	
}


var Grid = function(size, scene){
	this.size = size;
	this.scene = scene;
	
	this.array = new Array();
	
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
