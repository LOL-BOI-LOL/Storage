const castRay = (x, y, angle) => {
  let pos = new Point(x, y);
  let xi = 0.5 * Math.cos(angle.rad);
  let yi = 0.5 * Math.sin(angle.rad);
  while(!colliding(pos) && pos.distance(playerPosition) <= config.renderDist) {
    pos.x += xi;
    pos.y += yi;
  }
  while(colliding(pos) && pos.distance(playerPosition) <= config.renderDist) {
    pos.x -= xi * 0.1;
    pos.y -= yi * 0.1;
  }
  if(pos.distance(playerPosition) > config.renderDist) {
    return null;
  }
  pos.x += xi * 0.1;
  pos.y += yi * 0.1;
  return pos.distance(new Point(x, y));
}