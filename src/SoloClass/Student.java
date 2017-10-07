package SoloClass;

public class Student {
    int ID;
    String FirstName;
    String LastName;  // will get memory each time a new Student object is created.
    public static int School = 65; // school field will get memory only once.
}
