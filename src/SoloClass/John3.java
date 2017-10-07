package SoloClass;

class Person2 {
    private String name;
    private int age;

    Person2 (String n) {
        this.name = n;
    }
    public int getAge() {
        return age;
    }
    public  void setAge(int a) {
        this.age = a;
    }
}

public class John3 {

<<<<<<< HEAD
    static void change(Person v) {
        System.out.println(v.getAge());
=======
    /*Ссылочные переменные не содержат данных, они отправляют на место в коде. Объявляются Имя_класса переменная*/
    /*Person g ниже - ссылка на класс- а не на объект*/


    static void c(Person c){// принимает объект Person в качествве параметра, и инкрементирует его атрибут
        c.setAge(c.getAge()+10);
    }
    public static void main(String[] args) {
        Person j = new Person("John");
        Person I = new Person("Alex");
        j.setAge(20);
        I.setAge(20);

        // из-за того, что переменная j имеет ссылочный тип, метод действует на сам объект
        // и способен изменить действительное значение его атрибута
        System.out.println(j.getAge());
        c(j);
        System.out.println(j.getAge());
        c(j);
        System.out.println(j.getAge());
        System.out.println(I.getAge());
        c(I);
        System.out.println(I.getAge());
        c(I);
        System.out.println(I.getAge());

// 30,40,20
>>>>>>> 80ea28cb48452a4c8b0a11740f6963f1f6fe0e29
    }
}
