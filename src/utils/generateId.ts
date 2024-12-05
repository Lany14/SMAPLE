export function generateId(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${timestamp}${random}`;
}

// Example usage:
// const userId = generateSimpleUserId();
// console.log(userId); // Output: something like "1683456789123456"
