const getLastItem = <T>(array: T[]): T => {
  return array[array.length - 1];
};

const convertCleanedText = (text: string) => {
  // 한글, 영어는 모두 제거
  // 공백문자는 대시로 변경
  // 연속된 대시는 대시 하나로 표시

  return text
    .replace(/[^\uAC00-\uD7A3a-zA-Z0-9\s-]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default {
  getLastItem,
  convertCleanedText,
};
