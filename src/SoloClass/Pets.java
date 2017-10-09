package SoloClass;

/* В кратце, полиморфизм - это один метод с разными реализациями
Polymorphism is just the ability for something to behave in different ways depending on which object it refers to */

class Pets {
    public void makeSound(){
        System.out.println("Gr...");
    }
}

//Классы Cat и Doggy имеют собственную реализацию метода makeSound(),

class Cat extends Pets{
    public void makeSound(){
        System.out.println("Meow");
    }
}

class Doggy extends Pets{
    public void makeSound(){
        System.out.println("Woof");
    }
}

/*Так как все объекты классов Cat  и Doggy являются объектами класса Pets, мы можем сделать следующее:
создать две ссылочные переменные типа Pets, и указать их на объекты Cat и Doggy. */

class Voice {
    public static void main(String[] args){
        Pets a = new Cat();
        Pets b = new Doggy();

        a.makeSound();
        b.makeSound();
    }
}

/* Ссылочная переменная a содержит объект Cat, => вызывается метод makeSound() класса Cat.
 */
