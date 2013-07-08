var Selector = function(x, y, scene){
	this.x = x;
	this.y = y;
	
	this.cube = new THREE.Mesh(
        		new THREE.CubeGeometry(53, 18, 53),
        		new THREE.MeshLambertMaterial({color: 0xE1F30C}));
        		
    this.cube.position.x = x*55;
    this.cube.position.y = 0;
    this.cube.position.z = y*55 - 2;
    
    this.scene = scene;
    this.scene.add(this.cube); 
	
}

Selector.prototype.shiftUp = function(){
	this.cube.position.z += 55;
}

Selector.prototype.shiftDown = function(){
	this.cube.position.z -= 55;
}

Selector.prototype.shiftLeft = function(){
	this.cube.position.x += 55;
}

Selector.prototype.shiftRight = function(){
	this.cube.position.x -= 55;
}
