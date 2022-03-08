function deinitializeName(name) {
  let newName;
  newName = name.toString().replace(/[' ]/g, "-").toLowerCase();
  newName = newName.replace("--", "-");
  return newName;
}
export default deinitializeName;
