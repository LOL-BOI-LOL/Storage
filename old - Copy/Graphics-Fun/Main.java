import javax.swing.*;

class Main {
  public static void main(String[] args) {
    JFrame f = new JFrame("test");
    JPanel p = new JPanel();
    JLabel l = new JLabel("Hello World!");
    p.add(l);
    f.add(p);
    f.setSize(200, 200);
    f.setVisible(true);
  }
}