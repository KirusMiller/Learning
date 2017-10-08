package SoloClass;

public class AnotherPerson {
    private int age; // сокрытие
    public void setAge(int age){ // способ доступа
        if(age>0){
            this.age=age;
        }
    }
}
