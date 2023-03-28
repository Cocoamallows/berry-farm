package code_generate;

public class HTMLGenerate {
    public static void main(String[] args) {
        grid(5, 5);
    }

    public static void grid(int rows, int cols) {
        for (int r = 1; r <= rows; r++) {
            for (int c = 1; c <= cols; c++) {
                System.out
                        .println("\t\t\t<button onClick=\"farmHandler(" + r + ", " + c + ")\" id=\"space-r" + r
                                + "c" + c + "\">empty</button>");
            }
        }
    }
}
