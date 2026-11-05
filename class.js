pw=100
pf=100
ps=100
pb=100
po=100
mselect=false
var hi=new Image()
hi.src="hi.png"
var ti=new Image()
ti.src="ti.png"
var ci=new Image()
ci.src="ci.png"
var ri=new Image ()
ri.src="ri.webp"
var tree= new Image()
tree.src="tree.jpeg"
var forest= new Image()
forest.src="forest.jpeg"
var wf= new Image()
wf.src="wheatfield.jpeg"
var sf = new Image ()
sf.src="sheepfield.jpeg"
var desert=new Image()
desert.src="desert.jpeg"
var quarry = new Image()
quarry.src="quarry.jpeg"
var bq=new Image()
bq.src="redquarry.jpeg"
var factory=new Image()
factory.src="factory.jpeg"
var vr=new Image()
vr.src="verticalroad.webp"
var hr=new Image()
hr.src="horizontalroad.webp"
var h=new Image()
h.src="house.jpeg"
var t=new Image()
t.src="town.webp"
var c=new Image()
c.src="city.webp"
var d=new Image()
d.src="dice.png"
var mi=new Image()
mi.src="hammer.png"
class Resource{
	constructor(type,x,y,num){
		this.type=type
		this.x=x*tile_size*rows/5
		this.y=y*tile_size*cols/5
		this.num=num
	}
}
const rl=[wf,forest,sf,bq,quarry]
const rs=[[],[],[],[],[]]
const rnn=[2,2,12,12,3,3,4,4,4,5,5,5,6,6,6,8,8,8,9,9,9,10,10,11,11]
for(var r=0;r<5;r++){
		for(var c=0; c<5;c++){
			var n=parseInt(Math.random()*rnn.length)
			var mn=rnn[n]
			rnn.splice(n,1)
			var m=parseInt(Math.random()*5)
			var v=new Resource(rl[m],r,c,mn)
			rs[r].push(v)
		}
}
const rn=[2,12,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11]
class Road{
	constructor(direct,x,y,pc){
		this.direct=direct
		this.x=x*tile_size
		this.y=y*tile_size
		this.pc=pc
		if (this.direct==hr){
			this.w=tile_size*8
			this.h=tile_size
		}
		if (this.direct==vr){
			this.h=tile_size*8
			this.w=tile_size
		}
	}
}
var nr= new Road(hr,16,16)
const ca=[]
class Clickable{
	constructor(img,x,y,w,h,other){
		this.img=img
		this.x=x
		this.y=y
		this.w=w
		this.h=h
		this.other=other
		ca.push(this)
		console.log(this.x,"thisx")
	}
}
var dice=new Clickable(d,0,0,75,75,[])
var menu=new Clickable(mi,100,0,75,75,[])

const mil=[]
class Menu{
	constructor(t,wn,sn,bn,on,fn){
		this.t=t
		this.wn=wn
		this.sn=sn
		this.bn=bn
		this.on=on
		this.fn=fn
		mil.push(this)
	}
	check(p){
		if (this.wn<=p.wheat && this.on<=p.stone && this.sn<=p.sheep && this.bn<=p.brick &&this.fn<=p.wood){
			return true
		}
		else{
			console.log("Not enough materials")
		}
	}
}
var ho=new Menu (hi,1,1,1,0,1)
var to=new Menu (ti,1,1,0,1,0)
var co=new Menu (ci,2,2,0,1,1)
var ro=new Menu (ri,0,0,1,0,1)
var hic=new Clickable(h,100,80,30,30,[h])//way to access icons
var tic=new Clickable (t,100,115,30,30,[to])
var cic=new Clickable(c,100,150,30,30,[c])
var ric=new Clickable(ro,100,185,30,30,[vr,hr])
console.log(mil)
const cil=[]
class Ci{
	//pc=which player it belongs to
	constructor(type,x,y,pc){
		this.type=type
		this.x=x
		this.y=y
		this.near=[]
		this.pc=pc
		cil.push(this)
		pc.prop.push(this)
	}
	yield(){
		if (this.type==h){
			y=parseInt(Math.random()*10)
			if(y%3==0){
				return 1
			}
		}
		if (this.type==t){
			return 1
		}
		if (this.type==c){
			return 2
		}
	}
	nearr(){
		for(var r=0;r<5;r++){
			for(var c=0; c<5;c++){
				if (rs[r][c].x==this.x-tile_size*16 && rs[r][c].y==this.y-tile_size*16){
					near.push(rs[r][c])
				}
				if (rs[r][c].x==this.x+tile_size*16 && rs[r][c].y==this.y+tile_size*16){
					near.push(rs[r][c])
				}
				if (rs[r][c].x==this.x-tile_size*16 && rs[r][c].y==this.y+tile_size*16){
					near.push(rs[r][c])
				}
				if (rs[r][c].x==this.x+tile_size*16 && rs[r][c].y==this.y-tile_size*16){
					near.push(rs[r][c])
				}
			}
		}
	}
}
ps=[]
class Player{
	constructor(wheat,stone,brick,wood,sheep,prop,roads,c){
		this.wheat=wheat
		this.stone=stone
		this.brick=brick
		this.wood=wood
		this.sheep=sheep
		this.prop=prop
		this.roads=roads
		this.points=0
		this.c=c
		ps.push(this)
	}
}
var p1=new Player(100,100,100,100,100,[],[])