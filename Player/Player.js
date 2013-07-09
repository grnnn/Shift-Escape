var Selector = function(x, y, scene){
	this.x = (x-1);
	this.y = (y-1);
	
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
	this.y++;
}

Selector.prototype.shiftDown = function(){
	this.cube.position.z -= 55;
	this.y--;
}

Selector.prototype.shiftLeft = function(){
	this.cube.position.x += 55;
	this.x++;
}

Selector.prototype.shiftRight = function(){
	this.cube.position.x -= 55;
	this.x--;
}

Selector.prototype.canMove = function(dir){
	if(dir === "up"){
		if(this.y > 5) return false;
	}
	if(dir === "down"){
		if(this.y < 0) return false;
	}
	if(dir === "left"){
		if(this.x > 5) return false;
	}
	if(dir === "right"){
		if(this.x < 0) return false;
	}
	return true;
}
