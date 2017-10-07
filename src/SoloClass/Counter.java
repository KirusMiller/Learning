package SoloClass;

public class Counter {
    public static int COUNT = 0; // переменная COUNT будет разделена всеми объектами этого класса
    Counter() {
        COUNT++;
    }
}

/* переменная или метод с ключевым словом static принадлежит классу, а не объекту */
/* Т.Е. существует только один экземпляр static */
