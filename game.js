var canvas = document.getElementById("canvas")
var cx = canvas.getContext("2d")
turn=ps[0]
var pa=false
function checkerboard(){
	var c1="#d3fbd8"
	var c2="#b5fbb5"
	for(var r=0;r<rows;r++){
		for(var c=0; c<cols;c++){
			var x=r*tile_size
			var y=c*tile_size
			if(c%2==r%2){
				cx.fillStyle=c1
			}
			if (c%2!=r%2){
				cx.fillStyle=c2
			}
			cx.fillRect(x,y,tile_size,tile_size)
		}
	}
}
var thisTime=true
function click(x,y,h,w,mx,my){
	if (x<=mx && x+w>=mx && y<=my && y+h>=my){
		console.log("click")
		return true
	}
	else{
		return false
	}
}
var nx=0
var ny=0
function place(i,x,y){
	pa=true
	console.log("place")
	ny=y 
	nx=x
	if (i.type!=ro){
		n=new Ci (i.other[0],nx,ny,ps[0])
		console.log(i.other, "othhhheer")
	}
}
function roll(){
	n=Math.random()*rn.length
	var hn=parseInt(n)
	mn=rn[hn]
			for (var x=0;x<ps.length;x++){
				for (var y=0;y<ps[x].prop.length;y++){
					for (var z=0;z<ps[x].prop[y].near.length;z++){
						if (ps[x].prop[y].near[z].num==mn){
						if (ps[x].prop[y].near[z].type==wf){
							ps[x].wheat=ps[x].wheat+ps[x].prop[y].yield()
						}
						if (ps[x].prop[y].near[z].type==sf){
							ps[x].sheep=ps[x].sheep+ps[x].prop[y].yield()
						}
						if (ps[x].prop[y].near[z].type==forest){
							ps[x].wood=ps[x].wood+ps[x].prop[y].yield()
						}
						if (ps[x].prop[y].near[z].type==bq){
							ps[x].brick=ps[x].brick+ps[x].prop[y].yield()
						}
						if (ps[x].prop[y].near[z].type==quarry){
							ps[x].stone=ps[x].stone+ps[x].prop[y].yield()
						}
					}
					}
				}
			}
	console.log(ps[0])
	return mn
}
function checkeach(mx,my){
	pa=false
	for (var c=0;c<ca.length;c++){
		var a=click(ca[c].x,ca[c].y,ca[c].h,ca[c].w,mx,my)
		if (a==true){
			console.log("hi")
			if (ca[c].img==d){
				console.log(roll())
				console.log("rollll")
			}
			if (ca[c].img==mi){
				mselect=true
				thisTime=true
				console.log(mselect)
			}
			console.log(ca[c].img,"this is c ",d)
			if (ca[c].img==co || ca[c].img==ho || ca[c].img==to||ca[c].img==ro &&mselect==true){
				console.log(ca[c].img.check(ps[0]))
				if (ca[c].img.check(ps[0])==true){
					console.log("You have enough!")
					place(ca[c])
				}
				else{
					console.log("Absolutely not.")
				}
			}
		}
		if (click(mi.x,mi.y,mi.h,mi.w,mx,my)==false&&thisTime==false){
				mselect=false
			}

	}
}
thisTime=false
canvas.addEventListener("click",function(click){
	var rect=canvas.getBoundingClientRect()
	var mx=click.clientX-rect.left
	var my=click.clientY-rect.top
	checkeach(mx,my)})
function draw(){
	//(x,y,width,height)
	cx.clearRect(0,0,canvas.width,canvas.height)
	checkerboard()
	cx.drawImage(tree,0,0,tile_size,tile_size)
	for(var r=0;r<5;r++){
		for(var c=0; c<5;c++){
			cx.drawImage(rs[r][c].type,rs[r][c].x,rs[r][c].y,tile_size*16,tile_size*16)
			cx.fillStyle="black"
			cx.font="30px Arial"
			cx.fillText(rs[r][c].num,rs[r][c].x+100,rs[r][c].y+100)
		}
	}
	cx.drawImage(nr.direct,nr.x,nr.y,nr.w,nr.h)
	cx.drawImage(d,0,0,75,75)
	cx.drawImage(mi,100,0,75,75)
	if (mselect==true){
		cx.drawImage(hi,100,80,30,30)
		cx.drawImage(ti,100,115,30,30)
		cx.drawImage(ci,100,150,30,30)
		cx.drawImage(ri,100,185,30,30)
	}
	if (pa==true){
		cx.fillText("Choose an intersection to place your building.",200,200)
		cx.fillText("If it is a road, click on a road space instead.",200,220)
	}
	for (var qp=0;qp<cil.length;qp++){
		console.log(cil[qp].type)
		cx.drawImage(cil[qp].type,cil[qp].x,cil[qp].y,tile_size,tile_size)
	}
	thisTime=false
	requestAnimationFrame(draw)//makes repeat
}
draw()