package SoloClass;

public class Vehicle {
    /* атрибуты класса - переменные внутри класса */
    int maxSpeed;
    int wheels;
    String colour;
    double fuelCapacity;

    void horn() { /* метод - поведение */
        System.out.println("Beep!");
    }
}

class BMW {
    public static void main(String[] args) {
        Vehicle obj = new Vehicle();
    }
}