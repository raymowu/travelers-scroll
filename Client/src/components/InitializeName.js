function initializeName(name) {
  let newName;
  newName = name.replace("-s", "'s");
  newName = newName.replace("-", " ");
  const words = newName.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  newName = words.join(" ");

  return newName;
}
export default initializeName;
