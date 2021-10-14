module.exports = function (str) {
  const type = typeof str;

  if (type !== "string") {
    throw new TypeError(`Argument must be a string, "${type}" given`);
  }

  if (!str) {
    return str;
  }

  const arr = [...str];

  arr[0] = arr[0].toUpperCase();

  return arr.join("");
};
