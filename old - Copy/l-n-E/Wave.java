import java.lang.Math;
import java.text.DecimalFormat;

public class Wave {
  private static DecimalFormat sciFormat = new DecimalFormat("0.00E00");
  private static DecimalFormat decFormat = new DecimalFormat("#.00");
  private double waveLength;
  private double frequency;
  private double energy;
  public Wave(double val, String type) {
    switch (type) {
      case "nm" :
        waveLength = Double.parseDouble(decFormat.format(val));
        calcF();
        calcE();
        break;
      case "s^-1" :
        frequency = Double.parseDouble(sciFormat.format(val));
        calcW();
        calcE();
        break;
      case "J" :
        energy = Double.parseDouble(sciFormat.format(val));
        calcW();
        calcF();
        break;
    };
  }
  public void calcW() {
    if (frequency == 0.0) {
      calcF();
    }
    waveLength = Double.parseDouble(decFormat.format(3 * Math.pow(10, 17) / frequency));
  }
  public void calcF() {
    if (waveLength != 0.0) {
      frequency = Double.parseDouble(sciFormat.format(3 * Math.pow(10, 17) / waveLength));
    } else {
      frequency = Double.parseDouble(sciFormat.format(energy / (6.626 * Math.pow(10, -34))));
    }
  }
  public void calcE() {
    if (frequency == 0.0) {
      calcF();
    }
    energy = Double.parseDouble(sciFormat.format(6.626 * Math.pow(10, -34) * frequency));
  }
  public String[] getVal() {
    return new String[] {waveLength + "nm", frequency + "s^-1", energy + "J"};
  }
}