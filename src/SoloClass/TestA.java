package SoloClass;

public class TestA {
    public void test() {
        System.out.println("Hi");
    }
}
class B {
    public static void main(String[] args) {
        TestA obj = new TestA();
        obj.test();
    }
}
