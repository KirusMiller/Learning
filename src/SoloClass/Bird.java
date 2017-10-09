package SoloClass;

/*
Можно привести экземпляр подкласса к его суперклассу
А тут мы приводим экземпляр суперкласса к его подклассу
 */

class Bird {
    public void makeSound(){
        System.out.println("Bird Sound");
    }
}

class Crow extends Bird {
    public void makeSound(){
        System.out.println("Caw");
    }
}

class doCaw {
    public static void main(String[] args){
        Bird a = new Bird();
        ((Crow)a).makeSound(); // низходящее приведение объекта суперкласса к его подклассу
    }

}