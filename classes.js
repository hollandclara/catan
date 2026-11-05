class Dog{
	constructor(name,breed){
		this.name=name
		this.breed=breed
	}
	bark(){
		console.log(this.name+":woof!") 
	}
	wag(){
		times=parseInt(Math.random()*10)
		return times
	}
}

var d=new Dog("Greta","German Shepherd")
d.bark()
var tail=d.wag
console.log(tail)
console.log(d.name)