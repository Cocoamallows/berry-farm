package code_generate;

public class CSSGenerate {

    public static void main(String[] args) {
        grid(5, 5);
    }

    public static void grid(int rows, int cols) {
        for (int r = 1; r <= rows; r++) {
            for (int c = 1; c <= cols; c++) {
                System.out.println("#space-r" + r + "c" + c + " {");
                System.out.println("\tgrid-row: " + (r + 1) + ";");
                System.out.println("\tgrid-column: " + c + ";");
                System.out.println("}\n");
            }
        }
    }
}