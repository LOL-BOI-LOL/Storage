class Main {
  public static void main(String[] args) {
    int[][] preBoard = new int[9][9];
    preBoard[0][0] = 9;
    preBoard[0][1] = 1;
    preBoard[0][2] = 7;
    preBoard[0][3] = 2;
    preBoard[0][4] = 5;
    preBoard[0][5] = 4;
    preBoard[1][0] = 4;
    preBoard[1][2] = 2;
    preBoard[1][4] = 8;
    preBoard[2][0] = 6;
    preBoard[2][1] = 5;
    preBoard[2][5] = 3;   
    preBoard[2][6] = 4;
    preBoard[3][2] = 3;
    preBoard[3][4] = 9;
    preBoard[3][6] = 2;   
    preBoard[3][7] = 5;
    preBoard[3][8] = 6;
    preBoard[4][0] = 5;
    preBoard[4][3] = 7;   
    preBoard[4][6] = 3;
    preBoard[4][8] = 9;
    preBoard[5][0] = 2;
    preBoard[5][5] = 5;   
    preBoard[5][7] = 7;
    preBoard[5][8] = 1;
    preBoard[6][1] = 2;
    preBoard[6][3] = 5;   
    preBoard[6][4] = 3;
    preBoard[6][6] = 7;
    preBoard[6][7] = 6;
    preBoard[7][0] = 3;
    preBoard[7][1] = 7;
    preBoard[7][3] = 1;   
    preBoard[7][4] = 6;
    preBoard[7][7] = 9;
    preBoard[7][8] = 8;
    preBoard[8][7] = 3;
    Board b = new Board(preBoard);
    b.printBoard();
    for (int i = 0; i < 20 && !b.boardCheck(); ++i) {
      b.updateSuperposition();
    }
    System.out.println();
    b.printBoard();
  }
}