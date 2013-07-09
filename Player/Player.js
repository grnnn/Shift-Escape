var Selector = function(x, y, scene){
	this.x = (x-1);
	this.y = (y-1);
	
	this.cube = new THREE.Mesh(
        		new THREE.CubeGeometry(53, 18, 53),
        		new THREE.MeshLambertMaterial({color: 0xE1F30C}));
        		
    this.cube.position.x = this.x*55;
    this.cube.position.y = 0;
    this.cube.position.z = this.y*55 - 2;
    
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
		if(this.y > 6) return false;
	}
	if(dir === "down"){
		if(this.y < 1) return false;
	}
	if(dir === "left"){
		if(this.x > 6) return false;
	}
	if(dir === "right"){
		if(this.x < 1) return false;
	}
	return true;
}

var Player = function(x, y, scene){
	this.x = (x-1);
	this.y = (y-1);
	
	this.sphere = new THREE.Mesh(
        		new THREE.SphereGeometry(20, 20, 20),
        		new THREE.MeshPhongMaterial({color: 0x419DFE}));
        		
    this.sphere.position.x = this.x*55;
    this.sphere.position.y = 20;
    this.sphere.position.z = this.y*55;
    
    this.scene = scene;
    this.scene.add(this.sphere); 
    
    this.tracker = 55;
	
}

Player.prototype.moveUp = function(){
	if(this.tracker !== 0){
		this.sphere.position.z += 5;
		this.tracker -= 5;
	} else{
		this.y++;
		this.tracker = 55;
		return false;
	}
	return true;
}

Player.prototype.moveDown = function(){
	if(this.tracker !== 0){
		this.sphere.position.z -= 5;
		this.tracker -= 5;
	} else{
		this.y--;
		this.tracker = 55;
		return false;
	}
	return true;
}

Player.prototype.moveLeft = function(){
	if(this.tracker !== 0){
		this.sphere.position.x += 5;
		this.tracker -= 5;
	} else{
		this.x++;
		this.tracker = 55;
		return false;
	}
	return true;
}

Player.prototype.moveRight = function(){
	if(this.tracker !== 0){
		this.sphere.position.x -= 5;
		this.tracker -= 5;
	} else{
		this.x--;
		this.tracker = 55;
		return false;
	}
	return true;
}



