package SoloClass;

public class CountTaker {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        System.out.println(Counter.COUNT);
        System.out.println(Counter.COUNT);
        Counter c3 = new Counter();
        System.out.println(Counter.COUNT);
    }
}
/*output 2,2,3*/
/*Переменная COUNT статическая, и инкременируется на единицу при каждом СОЗДАНИИ объекта класса Counter*/
