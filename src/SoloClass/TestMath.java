package SoloClass;

public class TestMath {

    public static void main(String[] args) {
//метод Math.abs() возвращает абсолютное значение его параметра.
        int a = Math.abs(10);  //10
        System.out.println(a);

        int b = Math.abs(-20); //20
        System.out.println(b);
// метод Math.ceil() округляет значение с плавающей точкой к ближайшему наибольшему целому значению, возв-ся double.
        double c = Math.ceil(7.342);  //8.0
        System.out.println(c);
// метод Math.floor() округляет значение с плавающей точкой к ближайшему наименьшему целому числу.
        double f = Math.floor(7.343); //7.0
        System.out.println(f);
// метод Math.max() возвращает наибольший из его параметров.
        int m = Math.max(10, 20);  //20
        System.out.println(m);
// метод Math.min() возвращает наименьший параметр.
        int m2 = Math.min(10, 20);  //10
        System.out.println(m2);
// метод Math.pow принимает два параметра и возвращает первый параметр, возведенный в степень вторым параметром.
        double p = Math.pow(2, 3);  //8.0
        System.out.println(p);

/* Math.sqrt() - для квадратного корня, Math.sin() - для синуса, Math.cos() для косинуса... */
    }

}