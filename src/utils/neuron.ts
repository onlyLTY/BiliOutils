const iArr = [
  234, 212, 150, 168, 18, 44, 110, 80, 127, 65, 3, 61, 135, 185, 251, 197, 165, 155, 217, 231, 93,
  99, 33, 31, 48, 14, 76, 114, 200, 246, 180, 138, 116, 74, 8, 54, 140, 178, 240, 206, 225, 223,
  157, 163, 25, 39, 101, 91, 59, 5, 71, 121, 195, 253, 191, 129, 174, 144, 210, 236, 86, 104, 42,
  20, 179, 141, 207, 241, 75, 117, 55, 9, 38, 24, 90, 100, 222, 224, 162, 156, 252, 194, 128, 190,
  4, 58, 120, 70, 105, 87, 21, 43, 145, 175, 237, 211, 45, 19, 81, 111, 213, 235, 169, 151, 184,
  134, 196, 250, 64, 126, 60, 2, 98, 92, 30, 32, 154, 164, 230, 216, 247, 201, 139, 181, 15, 49,
  115, 77, 88, 102, 36, 26, 160, 158, 220, 226, 205, 243, 177, 143, 53, 11, 73, 119, 23, 41, 107,
  85, 239, 209, 147, 173, 130, 188, 254, 192, 122, 68, 6, 56, 198, 248, 186, 132, 62, 0, 66, 124,
  83, 109, 47, 17, 171, 149, 215, 233, 137, 183, 245, 203, 113, 79, 13, 51, 28, 34, 96, 94, 228,
  218, 152, 166, 1, 63, 125, 67, 249, 199, 133, 187, 148, 170, 232, 214, 108, 82, 16, 46, 78, 112,
  50, 12, 182, 136, 202, 244, 219, 229, 167, 153, 35, 29, 95, 97, 159, 161, 227, 221, 103, 89, 27,
  37, 10, 52, 118, 72, 242, 204, 142, 176, 208, 238, 172, 146, 40, 22, 84, 106, 69, 123, 57, 7, 189,
  131, 193, 255,
];

export function getHeaderNum(i: number) {
  return (
    iArr[
      ((i >> 24) & 255) ^ iArr[iArr[iArr[(i & 255) ^ 0] ^ ((i >> 8) & 255)] ^ ((i >> 16) & 255)]
    ] & 255
  );
}

export function setNewLength(buf: Buffer, value: number | string, keyLen: number) {
  const newLen = value.toString().length;
  const bufLen = buf.length;
  const oldLen = buf[bufLen - 1];
  if (oldLen === newLen) {
    return;
  }
  buf[bufLen - 1] = newLen;
  const totalLen = buf[bufLen - keyLen - 5];
  buf[bufLen - keyLen - 5] = totalLen + newLen - oldLen;
}
