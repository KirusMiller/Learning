package SoloClass;

/* Уровень доступа переопределенного метода не может быть ниже
Ни final ни static методы не могут быть переопределены
Если метод не может быть наследован, то он не может быть переопределен
Конструкторы не могут быть переопределены
 */


class Pets2 {
    protected int legs=4;
    public void makeNoise() {
        System.out.println("Mrrr...");
    }

    public void showLegs() {
        System.out.println("Show legs " + legs);
    }
}

class Kitty extends Pets2 {
   private int legs = 3;
      Kitty() {  // void не даст вывести метод при создании объекта в main
        int legs = 5; // 5 только внутри этого метода
        System.out.println("Number of legs " + legs); }


    public void makeNoise() { // переопределение метода makeNoise()
        System.out.println("Meow");

    }
    public void showLegs() {
        System.out.println("Show legs " + legs);
    }

}

class HeyHo {
    public static void main(String[] args) {
        Kitty obj = new Kitty();
        obj.makeNoise();
        obj.showLegs();

  // Можно использовать переменную родительского класса, вместо подкласса. Полезно при множестве подклассов.

        Pets2 obj2 = new Kitty();
        obj2.makeNoise();
        obj2.showLegs();

        Pets2 obj3 = new Pets2();
        obj3.makeNoise();
        obj3.showLegs();
    }
}

//Выводит 5, meow, 3
//Выводит 5, meow, 3
//Выводит mrr..., 4