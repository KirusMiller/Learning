package SoloClass;

public class Trick {
    public static void main(String[] args) {
        int x = 5;
        addOneTo(x);
        System.out.println(x);
    }

    static void addOneTo(int num) { //не влияет на main
        num = num + 1;
    }
}
// Output 5