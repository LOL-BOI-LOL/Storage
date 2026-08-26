import java.util.ArrayList;

public class Board {
  private ArrayList<ArrayList<ArrayList<Integer>>> boardPossible = new ArrayList<ArrayList<ArrayList<Integer>>>(9);
  private int[][] board = new int[9][9];
  
  public Board() {
    for (int r = 0; r < 9; ++r) {
      boardPossible.add(new ArrayList<ArrayList<Integer>>(9));
      for (int c = 0; c < 9; ++c)
        boardPossible.get(r).add(new ArrayList<Integer>(9));
    }
  }

  public Board(int[][] baseBoard) {
    for (int r = 0; r < 9; ++r) {
      boardPossible.add(new ArrayList<ArrayList<Integer>>(9));
      for (int c = 0; c < 9; ++c) {
        boardPossible.get(r).add(new ArrayList<Integer>(9));
        if (baseBoard[r][c] > 0 && baseBoard[r][c] < 10)
          board[r][c] = baseBoard[r][c];
      }
    }
  }

  static public boolean arrListEq(ArrayList<Integer> x, ArrayList<Integer> y) {
    if (x.size() != y.size()) return false;
    for (int i = 0; i < x.size(); ++i)
      if (x.get(i) != y.get(i)) return false;
    return true;
  }
  
  public void printBoard() {
    for (int r = 0; r < 9; ++r) {
      for (int c = 0; c < 9; ++c) {
        System.out.print(board[r][c] + " ");
        if (c % 3 == 2 && c != 8) System.out.print("| ");
      }
      System.out.println();
      if (r % 3 == 2 && r != 8) {
        for (int i = 0; i < 11; ++i) System.out.print("- ");
        System.out.println();
      }
    }
  }

  public void printPossibleBoard() {
    for (int r = 0; r < 9; ++r) {
      for (int c = 0; c < 9; ++c) {
        System.out.print(r + ", " + c + " | ");
        for (int num : boardPossible.get(r).get(c))
          System.out.print(num + ", ");
        System.out.println();
      }
    }
  }

  public void updateSuperposition() {
    for (int r = 0; r < 9; ++r) {
      for (int c = 0; c < 9; ++c) {
        boardPossible.get(r).get(c).clear(); 
        if (board[r][c] == 0) {
          ArrayList<Integer> temp = getPossible(r, c);
          if (temp.size() == 1)
            board[r][c] = temp.get(0);
          else 
            boardPossible.get(r).set(c, temp);
        }
      }
    }
  }

  public void updateSecondary() {
    for (int i = 0; i < 81; ++i) {
      ArrayList<Integer> arr = boardPossible.get(i / 9).get(i % 9);
      ArrayList<ArrayList<Integer[]>> occur = new ArrayList<ArrayList<Integer[]>>(3); 
      for (int index = 0; index < 3; ++index)
        occur.add(new ArrayList<Integer[]>(arr.size() - 1));
      int[] pos = new int[] {i / 9 / 3 * 3, i % 9 / 3 * 3};
      for (int index = 0; index < 9; ++index) {
        if (index != i / 9 && boardPossible.get(index).get(i % 9).size() == arr.size() && arrListEq(boardPossible.get(index).get(i % 9), arr))
          occur.get(0).add(new Integer[] {index, i % 9});
        if (index != i % 9 && boardPossible.get(i / 9).get(index).size() == arr.size() && arrListEq(boardPossible.get(i / 9).get(index), arr))
          occur.get(1).add(new Integer[] {i / 9, index});
        if ((index != i / 9 || index != i % 9) && boardPossible.get(pos[0] + index / 3).get(pos[1] + index % 3).size() == arr.size() && arrListEq(boardPossible.get(pos[0] + index / 3).get(pos[1] + index % 3), arr))
          occur.get(2).add(new Integer[] {pos[0] + index / 3, pos[1] + index % 3});
      }
      int[] sizes = {occur.get(0).size(), occur.get(1).size(), occur.get(2).size()};
      switch (arr.size() - 1) {
        case sizes[0]:
          for (int index = 0; index < 9; ++index) {
            boolean temp = true;
            for (Integer[] o : occur.get(0)) {
              if (o[1] == index) temp = false;
            }
            if (temp) {
              for (Integer num : arr)
                boardPossible.get(i / 9).get(index).remove(num);
            }
          }
        case sizes[1]:
          for (int index = 0; index < 9; ++index) {
            boolean temp = true;
            for (Integer[] o : occur.get(1)) {
              if (o[0] == index) temp = false;
            }
            if (temp) {
              for (Integer num : arr)
                boardPossible.get(index).get(i % 9).remove(num);
            }
          }
        case sizes[2]:
          for (int index = 0; index < 9; ++index) {
            boolean temp = true;
            for (Integer[] o : occur.get(2)) {
              if (o[0] == pos[0] + index / 3 && o[1] == pos[1] + index % 3) temp = false;
            }
            if (temp) {
              for (Integer num : arr)
                boardPossible.get(pos[0] + index / 3).get(pos[1] + index % 3).remove(num);
            }
          }
      }
    }
  }

  public boolean checkRepeat() {
    ArrayList<ArrayList<ArrayList<Integer>>> temp = boardPossible;
    updateSuperposition();
    ArrayList<Integer> arr = new ArrayList<ArrayList<Integer>>(2);
    for (int i = 0; i < 81; ++i) {
      arr.set(0, temp.get(i / 9).get(i % 9));
      arr.set(1, boardPossible.get(i / 9).get(i % 9));
      if (arr.get(0).size() != arr.get(1).size())
        return false;
      for (int index = 0; index < arr.get(0).size(); ++index) {
        if (arr.get(0).get(index) != arr.get(1).get(index)) return false;
      }
    }
    return true;
  }

  public ArrayList<Integer> getPossible(int r, int c) {
    ArrayList<Integer> occurances = new ArrayList<Integer>();
    int[] temp = new int[2];
    for (int i = 0; i < 9; ++i) {
      if (i != r && board[i][c] != 0 && occurances.indexOf(board[i][c]) == -1)
        occurances.add(board[i][c]);
      if (i != c && board[r][i] != 0  && occurances.indexOf(board[r][i]) == -1)
        occurances.add(board[r][i]);
      temp = new int[]{r / 3 * 3 + i / 3, c / 3 * 3 + i % 3};
      if ((i != r || i != c) && board[temp[0]][temp[1]] != 0 && occurances.indexOf(board[temp[0]][temp[1]]) == -1)
        occurances.add(board[temp[0]][temp[1]]);
    }
    ArrayList<Integer> possible = new ArrayList<Integer>();
    for (Integer i = 1; i < 10; ++i) {
      if (occurances.indexOf(i) == -1) {
        possible.add(i);
      }
    }
    return possible;
  }

  public boolean boardCheck() {
    for (int[] arr : board) {
      for (int num : arr) {
        if (num == 0) return false;
      }
    }
    return true;
  }
}