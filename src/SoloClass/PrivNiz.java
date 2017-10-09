package SoloClass;

class PrivNiz {
    public void print(){
        System.out.println("A");
    }
}

class PrivNiz2 extends PrivNiz {
    public void print(){
        System.out.println("B");
    }


public static void main(String[] args){
    PrivNiz object = new PrivNiz2();
    PrivNiz2 b = (PrivNiz2) object; // нисходящее приведение
    b.print();
}
}