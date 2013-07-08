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
