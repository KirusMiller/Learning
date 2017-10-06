package SoloClass;

class Person {
    private String name;
    private int age;

    Person (String n) {
        this.name = n;
    }
    public int getAge() {
        return age;
    }
    public  void setAge(int a) {
        this.age = a;
    }
}

public class John {

    /*Ссылочные переменные не содержат данных, они отправляют на место в коде. Объявляются Имя_класса переменная*/
    /*Person g ниже - ссылка на класс- а не на объект*/


    static void celebrateBirthday(Person g){// принимает объект Person в качествве параметра, и инкрементирует его атрибут
        g.setAge(g.getAge()+1);
    }
    public static void main(String[] args) {
        Person j = new Person("John");
        j.setAge(20);
        // из-за того, что переменная j имеет ссылочный тип, метод действует на сам объект
        // и способен изменить действительное значение его атрибута
        celebrateBirthday(j);
        System.out.println(j.getAge());

    }
}
