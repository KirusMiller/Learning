package SoloClass;

public class MotorGG {
    public static void main(String[] args) {
        //colour will be "Red"
        MotorFin v1 = new MotorFin();

        //colour will be "Green"
        MotorFin v2 = new MotorFin("Green");

        System.out.println(v2.getColour());
    }
}
