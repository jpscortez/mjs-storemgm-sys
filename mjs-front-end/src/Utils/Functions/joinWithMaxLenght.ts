export function joinWithMaxLength(stringList: string[], maxLength: number) {
    // Join the strings together
    let result = stringList.join(', ');
  
    // Check if the length exceeds maxLength
    if (result.length > maxLength) {
      // Trim and add "..." at the end
      result = result.slice(0, maxLength - 3) + '...';
    }
  
    return result;
  }