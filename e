<style>
  * {
  	margin: 0;
  }
  body {
		width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
  }
  #container {
  	width: 350px;
    height: 350px;
    contain: strict;
    background-color: green;
  }
  #c {
    width: 150px;
    height: 300px;
    contain: strict;
    transform-origin: 0 0;
  }
  img {
  	margin-left: -150px;
    width: 300px;
    height: 300px;
  }
</style>
<body>
  <div id="container">
  	<div id="c">
  		<img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/200_Franc_coin_%28CFP%29%2C_obverse.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"/>
    </div>
  </div>
</body>
<script>
	const c = document.getElementById("c"),
        div = document.getElementById("container");
  
  const cutLine = (p0, v0, p1, v1) => {
		let t = ((p0[0]-p1[0])*v1[1]+(p1[1]-p0[1])*v1[0])/(v1[0]*v0[1]-v1[1]*v0[0]);
    return [p0[0]+v0[0]*t,p0[1]+v0[1]*t];
  };
  
  class Camera {
    pos = [];
    angle = 0;
    nVec = [];
    xVec = [];
    lVec = [];
    rVec = [];
    lSlope = 0;
    rSlope = 0;
    
    constructor(pos = [0,0,0], angle = 0) {
      this.pos = pos;
      this.angle = angle;
      this.nVec = [Math.cos(angle), Math.sin(angle)];
      this.xVec = [this.nVec[1], -this.nVec[0]];
      this.lVec = [this.nVec[0]-this.xVec[0], this.nVec[1]-this.xVec[1]];
      this.lVec = this.lVec.map(v => v / Math.sqrt(this.lVec[0]**2+this.lVec[1]**2));
      this.rVec = [this.nVec[0]+this.xVec[0], this.nVec[1]+this.xVec[1]];
      this.rVec = this.rVec.map(v => v / Math.sqrt(this.rVec[0]**2+this.rVec[1]**2));
      this.lSlope = Math.abs(this.lVec[1] / this.lVec[0]);
      this.rSlope = Math.abs(this.rVec[1] / this.rVec[0]);
    }
    
    draw(obj) {
    	let coords = obj.project(this.pos, this.nVec, this.xVec, this.lVec, this.rVec, this.lSlope, this.rSlope);
      if (coords == -1) {
        return;
      }
      
      coords = coords.map((v) => [v[0]*div.offsetWidth/2+div.offsetWidth/2,v[1]*div.offsetHeight/2+div.offsetHeight/2]); 
      console.log(coords);
      c.style.transform = transform([[0,c.offsetHeight],[c.offsetWidth,c.offsetHeight],[c.offsetWidth,0],[0,0]],coords);
      //c.style.left = Math.min(...coords.map(v => v[0])) + "px";
      //c.style.top = Math.min(...coords.map(v => v[1])) + "px";
      console.log(transform([[0,300],[300,300],[300,0],[0,0]],coords));
    	console.log(c.style.left);
    }
  }

  class Surface {
    corners = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
    dir = [0,0];
    
    constructor(x1, y1, x2, y2, h, z) {
      this.corners = [[x1,y1,z+h/2],[x2,y2,z+h/2],[x2,y2,z-h/2],[x1,y1,z-h/2]];
      this.dir = [x2-x1,y2-y1];
    }
    
    project(origin, nVec, xVec, lVec, rVec, lSlope, rSlope) {
      let nComps = [],
          xComps = [],
          quadrants = [],
          points = [this.corners[0].slice(0,2), this.corners[1].slice(0,2)],
          noRender = false;
      
      this.corners.slice(0,2).forEach((v, i) => {
        nComps.push((v[0]-origin[0])*nVec[0]+(v[1]-origin[1])*nVec[1]);
        xComps.push((v[0]-origin[0])*xVec[0]+(v[1]-origin[1])*xVec[1]);
        quadrants.push(2);
        
        if (nComps[i] <= 0 && xComps[i] < 0) {
          quadrants[i] = 3;
        } else if (nComps[i] > 0) {
          if (xComps[i] < 0) {
            if (Math.abs(nComps[i] / xComps[i]) >= lSlope)
              quadrants[i] = 5;
            else
              quadrants[i] = 4;
          } else {
            if (Math.abs(nComps[i] / xComps[i]) >= rSlope)
              quadrants[i] = 0;
            else
              quadrants[i] = 1;
          }
        }
      });
      
      for (let i = 0; i < 2; ++i) {
        let j = 1 - i;
        switch (quadrants[i]) {
          case 0:
            if (quadrants[j] == 1 || quadrants[j] == 2) {
              points[j] = cutLine(origin, rVec, points[0], this.dir);
            	break;
            } else if (quadrants[j] == 3 || quadrants[j] == 4) {
              points[j] = cutLine(origin, lVec, points[0], this.dir);
            	break;
            }
            break;
          case 1:
            if (quadrants[j] == 5) {
              points[i] = cutLine(origin, rVec, points[0], this.dir);
            	break;
            } else if (quadrants[j] == 4) {
              points[j] = cutLine(origin, lVec, points[0], this.dir);
              points[i] = cutLine(origin, rVec, points[0], this.dir);
            	break;
            } else if (quadrants[j] == 3) {
              if (nComps[j]-xComps[j]*(nComps[i]-nComps[j])/(xComps[i]-xComps[j]) > 0) {
                points[j] = cutLine(origin, lVec, points[0], this.dir);
                points[i] = cutLine(origin, rVec, points[0], this.dir);
              } else
                noRender = true;
            	break;
            } else if (quadrants[j] == 2) {
              noRender = true;
           		break;
            }
            break;
          case 2:
          	if (quadrants[j] == 5) {
              points[i] = cutLine(origin, rVec, points[0], this.dir);
            	break;
            } else if (quadrants[j] == 4) {
              if (nComps[j]-xComps[j]*(nComps[i]-nComps[j])/(xComps[i]-xComps[j]) > 0) {
                points[j] = cutLine(origin, lVec, points[0], this.dir);
                points[i] = cutLine(origin, rVec, points[0], this.dir);
            	} else
                noRender = true;
            	break;
            } else if (quadrants[j] == 3) {
              noRender = true;
            	break;
            }
            break;
          case 3:
          	if (quadrants[j] == 5) {
              points[i] = cutLine(origin, lVec, points[0], this.dir);
            	break;
            } else if (quadrants[j] == 4) {
              noRender = true;
            	break;
            }
            break;
          case 4:
          	if (quadrants[j] == 5) {
              points[i] = cutLine(origin, lVec, points[0], this.dir);
            	break;
            }
            break;
        }
      }
      
      if (noRender)
        return -1;
      
      points.forEach((v, i) => {
        nComps[i] = (v[0]-origin[0])*nVec[0]+(v[1]-origin[1])*nVec[1];
        xComps[i] = ((v[0]-origin[0])*xVec[0]+(v[1]-origin[1])*xVec[1])/nComps[i];
      });
      console.log([[xComps[0],this.corners[0][2]/nComps[0]],[xComps[1],this.corners[1][2]/nComps[1]],[xComps[1],this.corners[2][2]/nComps[1]],[xComps[0],this.corners[3][2]/nComps[0]]]);
      return [[xComps[0],this.corners[0][2]/nComps[0]],[xComps[1],this.corners[1][2]/nComps[1]],[xComps[1],this.corners[2][2]/nComps[1]],[xComps[0],this.corners[3][2]/nComps[0]]];
    }
  }
  
  const adj = m => [[m[1][1]*m[2][2]-m[1][2]*m[2][1],m[0][2]*m[2][1]-m[0][1]*m[2][2],m[0][1]*m[1][2]-m[0][2]*m[1][1]],[m[2][0]*m[1][2]-m[1][0]*m[2][2],m[0][0]*m[2][2]-m[0][2]*m[2][0],m[0][2]*m[1][0]-m[0][0]*m[1][2]],[m[1][0]*m[2][1]-m[1][1]*m[2][0],m[0][1]*m[2][0]-m[0][0]*m[2][1],m[0][0]*m[1][1]-m[0][1]*m[1][0]]],
        dot = (v1, v2) => v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2],
  			mTimesV = (m, v) => [dot(m[0],v),dot(m[1],v),dot(m[2],v)],
        mTimesM = (m1, m2) => [[dot(m1[0],[m2[0][0],m2[1][0],m2[2][0]]),dot(m1[0],[m2[0][1],m2[1][1],m2[2][1]]),dot(m1[0],[m2[0][2],m2[1][2],m2[2][2]])],[dot(m1[1],[m2[0][0],m2[1][0],m2[2][0]]),dot(m1[1],[m2[0][1],m2[1][1],m2[2][1]]),dot(m1[1],[m2[0][2],m2[1][2],m2[2][2]])],[dot(m1[2],[m2[0][0],m2[1][0],m2[2][0]]),dot(m1[2],[m2[0][1],m2[1][1],m2[2][1]]),dot(m1[2],[m2[0][2],m2[1][2],m2[2][2]])]];
        
  const transform = (points1, points2) => {
    let pointM1 = [[points1[0][0],points1[1][0],points1[2][0]],[points1[0][1],points1[1][1],points1[2][1]],[1,1,1]],
        pointM2 = [[points2[0][0],points2[1][0],points2[2][0]],[points2[0][1],points2[1][1],points2[2][1]],[1,1,1]],
        A = mTimesM(pointM1, mTimesV(adj(pointM1),[points1[3][0],points1[3][1],1]).map((v,i) => [0,0,0].toSpliced(i,1,v))),
        B = mTimesM(pointM2, mTimesV(adj(pointM2),[points2[3][0],points2[3][1],1]).map((v,i) => [0,0,0].toSpliced(i,1,v))),
  			C = mTimesM(B, adj(A));
    for (let i = 0; i < C.length; ++i)
      for (let j = 0; j < C[i].length; ++j)
        C[i][j] /= C[2][2];
    console.log(C);
   
    return "matrix3d("+[C[0][0],C[1][0],0,C[2][0],C[0][1],C[1][1],0,C[2][1],0,0,1,0,C[0][2],C[1][2],0,C[2][2]].join(",")+")";
  };
  
  const obj = new Surface(10, 10, 10, -10, 20, 0),
        cam = new Camera([0, 0, 0]);
  
  cam.draw(obj);
</script>
