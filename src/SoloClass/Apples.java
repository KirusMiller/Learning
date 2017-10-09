package SoloClass;

import java.util.Scanner;

public class Apples{
	public static void main(String[] args){
		Scanner input = new Scanner(System.in);
		Tuna tunaObject = new Tuna();
		System.out.println("Enter name of first gf here: ");
		String temp = input.nextLine();
		tunaObject.setName(temp);
		tunaObject.saying();
	}
}