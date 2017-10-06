package SoloClass;

public class John2 {
    public static void main(String[] args) {
        Person p = new Person("John");
        p.setAge(25);
        change(p);
        System.out.println(p.getAge());
    }
    static void change(Person p) {
        p.setAge(10);
    }
}
