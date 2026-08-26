import java.util.Scanner;
import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    ArrayList<String> info = new ArrayList<String>(); 
    System.out.print("What is the student's name: ");
    info.add(scan.nextLine());
    System.out.print("What is the student's id: ");
    info.add(scan.nextLine());
    System.out.print("What is the student's class: ");
    info.add(scan.nextLine());
    System.out.print("What is the student's block: ");
    info.add(scan.nextLine());
    System.out.print("What is the student's bus: ");
    info.add(scan.nextLine());
  }
}