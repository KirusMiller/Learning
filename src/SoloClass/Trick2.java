package SoloClass;

public class Trick2 {
    public static void main(String[] args) {
        int x = 4;
        square(x);
        System.out.println(x);
    }
    static void square(int x){// не виляет на main
        x = x*x;
    }
}
//output 4