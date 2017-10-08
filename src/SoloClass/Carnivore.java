package SoloClass;

/* наследование
Класс Dog наследует переменную legs от класса Carnivore
 */
class Carnivore{
    protected int legs;
    public void eat(){
        System.out.println("Animal eats");
    }
}

class Dog extends Carnivore{
    Dog(){
        legs=4;
    }
}

/* Теперь мы можем объявить объект класса Dog и вызвать метод eat его суперкласса
 */
class justAnotherClass{
    public static void main(String[] args){
        Dog d = new Dog();
        d.eat();
    }
}

/* Вызов модификаторов доступа protected делает переменные доступными для класса и видимыми только для подклассов
 */