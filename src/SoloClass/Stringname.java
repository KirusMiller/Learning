package SoloClass;

public class Stringname {
    static void sayHello(String name) { // метод принимает параметр типа String имя name
        System.out.println("Hello " + name);
    }

    public static void main(String[] args) {
        sayHello("David");
        sayHello("Amy");
    }
}
