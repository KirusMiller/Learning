public class PhraseOMatic {
	public static void main (String[] args) {
	
	String[] wordListOne = {"hop", "hey", "la", "le" }
	String[] wordListTwo = {"hop2", "hey2", "la2", "le2" }
	String[] wordListThree = {"hop3", "hey3", "la3", "le3" }
	
	int oneLength = wordListOne.length;
	int twoLength = wordListTwo.length;
	int threeLength = wordListThree.length;
	
	int rand1 = (int) (Math.random() * oneLength);
	int rand2 = (int) (Math.random() * twoLength);
	int rand3 = (int) (Math.random() * threeLength);
	
	String phrase = wordListOne[rand1] + "" + wordListTwo[rand2] + "" + wordListThree[rand3];

	System.out.println("All you need is " + phrase);
	
	}
}