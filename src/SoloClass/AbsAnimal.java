package SoloClass;

/*Абстрактный класс не может инстанцироваться
Чтобы использовать абстрактный класс нужно наследовать его от другого класса
Любой класс, содержащий абстрактный метод, должен быть определен как абстрактный
 */


abstract class AbsAnimal {
    int legs = 0;
    abstract void makeSound();

}

class Puppy extends AbsAnimal {
    public void makeSound(){
        System.out.println("Meow");
    }
}

class AbsAnimalGo {
    public static void main(String[] args) {
        Cat c = new Cat();
        c.makeSound();
    }
}