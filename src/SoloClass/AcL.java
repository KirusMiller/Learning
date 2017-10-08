package SoloClass;

/* Конструкторы не наследуются подклассами. Однако, конструктор суперкласса вызывается при
инстацировании подкласса.
 */

class AcL {
    public AcL(){
        System.out.println("New A");
    }
}

class AcM extends AcL{
    public AcM(){
        System.out.println("New B");
    }
}

class AcML {
    public static void main(String[] args){
        AcM obj = new AcM();
    }
}
/* Можно получить доступ к суперклассу из подкласса с помощью ключевого слова super.
Например, super.var получает доступ к переменной var суперкласса
 */

/* Constructor is special method. When object of a class is created, automaticall teh counstructor
method is executed without calling it.
 */

/* If it was declared public void AcL(), and public void AcM(), then no output would be shown
unless you called the methods with obj.AcL or obj.AcM in the main.
 */