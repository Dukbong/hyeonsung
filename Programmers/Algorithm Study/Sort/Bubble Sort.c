#include <stdio.h>

int main (void) {
	int i, j, temp;
	int array[10] = { 1,10,5,8,7,6,4,3,2,9 };
	for (i = 0; i < 10; i++) {
		for (j = 0; j < 9 - i; j++) {
			if (array[j] > array[j + 1]) {
				temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
	}
	for (i = 0; i < 10; i++) {
		printf("%d", array[i]);
	}
	return 0;
}
//시간 복잡도
// O(N * N)
// 가장 비효율적인 정렬 알고리즘이다.
// 선택 정렬과 똑같은 시간 복잡도를 가졌지만 실행 시간은 버블정렬이 가장 느리다.