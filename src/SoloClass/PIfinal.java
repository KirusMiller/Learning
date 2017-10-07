package SoloClass;

public class PIfinal {
    public static final double PI = 3.14;
    public static void main(String[] args) {
        System.out.println("PI = " + PI);
    }
}

/* PI задана как константа. Любая попытка присвоить ей значение вызовет ошибку */
/*
Методы и класс тоже могут быть обозначены ключевым словом final, чтобы защитить методы от изменений, а классы
от создания подклассов.
*/
