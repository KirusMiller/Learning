package SoloClass;

/*
interface содержит только static final переменные
не могут содержать конструктор, потому что интерфейсы не могут инстанцироваться
класс может реализовывать любое количество интерфейсов
 */

interface InfAnimal {
    public void eat();
    public void makeSound();
}

/*
При использовании интерфейса необходимо переопределить все его методы
 */

class HelloCat implements InfAnimal {
    public void makeSound(){
        System.out.println("Meow");
    }
    public void eat(){
        System.out.println("omnomnom");
    }
}

class RunCat {
    public static void main(String[] args){
        HelloCat c = new HelloCat();
        c.eat();
    }
}
