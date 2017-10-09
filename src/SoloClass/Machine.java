package SoloClass;

class Machine {
    public void start() {
        System.out.println("Starting...");
    }

}

class Ride {
    public static void main(String[] args){
        Machine m = new Machine(){

            // переопределение применяется только к текущему объекту

            @Override public void start(){
                System.out.println("Woooooo");
            }
        };
        m.start();
        Machine m2 = new Machine();
        m2.start();
    }

}