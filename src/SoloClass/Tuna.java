package SoloClass;

public class Tuna {
    private String girlName;

    public void setName(String name) {
        girlName = name;
    }

    public String getName() {
        return girlName;
    }

    public void saying() {
        System.out.println("Your first gf was " + getName());
    }
}