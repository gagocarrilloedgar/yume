export function compact<T>(input: T): T {
  if (Array.isArray(input)) {
    // For arrays
    return input.filter((item) => item !== null && item !== undefined) as T;
  } else if (typeof input === "object" && input !== null) {
    // For objects
    const result: any = {};
    for (const key in input) {
      if (input[key] !== null && input[key] !== undefined) {
        result[key] = input[key];
      }
    }
    return result as T;
  }
  // For other types, return as is
  return input;
}

export function nullify(obj: Record<string, any>): Record<string, any> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "undefined") {
        obj[key] = null;
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        obj[key] = nullify(obj[key]);
      }
    }
  }
  return obj;
}
