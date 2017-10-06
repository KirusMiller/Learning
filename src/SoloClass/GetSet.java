package SoloClass;

public class GetSet {
    private String colour;

    /* Getter метод возвращает значение атрибута */
    public String getColour(){
        return colour;
    }

    /* Setter метод принимает параметр и присваивает его к атрибуту */
    public void setColour(String c) {
      /* ключевое слово this используется для ссылки на текущий объект. Т.е
       this.colour является атрибутом colour текущего объекта */
        this.colour = c;
    }
}
