let config = {
  rotation: 0,
  position: new Point(100, 50),

  rotate(change) {
    this.rotation += change;

    if (this.rotation > 180)
      this.rotation = this.rotation - 360;
    else if (this.rotation <= -180)
      this.rotation = this.rotation + 360;
  }
}

config.rotation