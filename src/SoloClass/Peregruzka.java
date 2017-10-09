package SoloClass;

/*
Перегрузка - полиморфизм времени компиляции.
Because the bompiler knows in advance which method is to be called during the program execution i.e
it is known at compile time whereas in overiding the compiler make the decision at the time of execution
i.e it is run time.
 */

public class Peregruzka {
    static double max(double a, double b) {
        if(a>b){
            return a;
        }
        else{
            return b;
        }
    }
    static int max(int a,int b) { // перегрузка метода. теперь он принимает еще и переменные типа int
        if(a>b){
            return a;
        }
        else{
            return b;
        }
    }

    public static void main(String[] args){

        System.out.println(max(8, 17));
        System.out.println(max(3.14, 7.68));
    }
}
