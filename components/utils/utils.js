export const ScrollTo = (ref) => {
  document.getElementById(ref.substring(2)) && document.getElementById(ref.substring(2)).scrollIntoView({ behavior: "smooth", block: "center"});
}

export const formatDate = (seconds) =>  {
  return seconds ? new Date(seconds * 1000).toLocaleString('en-CA') : '-';
}