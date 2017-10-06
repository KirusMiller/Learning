package SoloClass;

public class Car {
    //Attributes i.e what car has

    String colour = "Red";
    String type = "Petrol";

    //Behaviour i.e what car does
    private void start(){
        System.out.println("Car started");
    }

    private void drive(){
        System.out.println("Car driving");
    }

    public static void main(String[] args){
        //creating the object i.e. blueprint of class
        Car car = new Car();

        System.out.println("Colour: " + car.colour);

        System.out.println("Type: " +car.type);

        car.start();
        car.drive();
    }
}
