package SoloClass;

public class ReturnT2 {
    public static int myFunc(int x) {
        return x*3;
    }
    public static void main(String[] args) {
        int x = 10;
        int y = myFunc(x);
        System.out.println(y);
    }
}
