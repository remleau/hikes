export const ScrollTo = (ref) => {
  document.getElementById(ref.substring(2)) && document.getElementById(ref.substring(2)).scrollIntoView({ behavior: "smooth", block: "center"});
}