#include <iostream>

float add(float x, float y) {
  return x + y;
}

int main() {
  float x = 0;
  float y = 0;
  std::cin >> x;
  std::cin >> y;
  std::cout << add(x, y);
}