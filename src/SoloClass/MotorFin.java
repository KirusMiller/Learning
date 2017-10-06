package SoloClass;

public class MotorFin {
    private String colour;

    MotorFin() {
        this.setColour("Red"); //конструктор без параметров устанавливает занчение атрибута colour по умолчанию на Red
    }

    MotorFin(String c) {
        this.setColour(c); //конструктор принимает параметры и присваивает их к атрибутам
    }
 //Setter
    public void setColour(String c) {
        this.colour = c;
    }
 //Getter
    public String getColour() {
        return colour;
    }
}