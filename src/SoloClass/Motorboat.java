package SoloClass;

public class Motorboat {
    private String colour;
    Motorboat(){                //конструктор класса, при создании объекта атрибут colour будет установлен на "Red".
        colour = "Red";
    }
    private String name;
    Motorboat(String n){             //конструктор может принимать параметры для инициализации атрибутов.
        name = n;
    }
    private int age;
    Motorboat(int myage){           // объявляет параметр age, принимает параметр myage, задает параметр age = myage
        age = myage;
    }
    public static void main(String[] args){
        Motorboat m1 = new Motorboat("Anna");
        Motorboat m2 = new Motorboat (25);
        Motorboat m3 = new Motorboat();
        System.out.println(m1.name);
        System.out.println(m2.age);
        System.out.println(m3.colour);
    }
}
