import java.awt.*;

class Main {
  public static void main(String[] args) {
    Canvas c = new Canvas();
    c.setSize(300, 300);
    c.setBackground(Color.black);
    Graphics g = c.getGraphics();
    g.setColor(Color.red);
    g.drawLine(0, 0, 30, 30);
    c.paint(g);
    c.show();
  }
}