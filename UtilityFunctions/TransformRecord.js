export default function transformObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformObject(item));
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (key !== "_id") {
        acc[key] = transformObject(value);
      }
      return acc;
    }, {});
  } else {
    return { $allot: obj };
  }
}