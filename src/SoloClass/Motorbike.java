package SoloClass;

public class Motorbike {
    private int maxSpeek;
    private int wheels;
    private String colour;
    private double fuelCapacity;

    public void horn() {
        System.out.println("Beep!");

    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getColour() {
        return colour;
    }

    public void setWheels(int wheels) {
        this.wheels = wheels;
    }

    public int getWheels() {
        return wheels;
    }
}

class RunMotorbike {
    public static void main(String[] args){
        Motorbike v1 = new Motorbike();
        v1.setColour("Red");
        v1.setWheels(2);
        System.out.println(v1.getColour());
        System.out.println(v1.getWheels());
    }
}