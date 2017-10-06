package SoloClass;

public class ABC {
    public ABC() {
        System.out.println("New A");
    }

    public void ABC() {
        System.out.println("New B");
    }
}

class CAB {
    public static void main(String [] args) {
        ABC obj = new ABC();
    }
}
// output New A - создается объект класса, метод конструтора класса автоматически выполняется (no void)
// void - no output