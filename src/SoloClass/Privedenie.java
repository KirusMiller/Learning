package SoloClass;

/*
Приведение типов с помощью типа в () перед значением
 */

public class Privedenie {
    public static void main(String[] args){
        int a = (int) 3.14;
            System.out.println(a);

        double b = 42.571;
        int c = (int) b;
            System.out.println(c);

        double x = 1.5;
        double y = 2.65;
        sum((int)x, (int)y);

    }

    static void sum(int x, int y){
        System.out.println(x+y);
    }
}


