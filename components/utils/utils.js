export const ScrollTo = (ref) => {
  document.getElementById(ref.substring(2)) && document.getElementById(ref.substring(2)).scrollIntoView({ behavior: "smooth", block: "end"});
}

export const formatDate = (seconds) =>  {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return seconds ? new Date(seconds * 1000).toLocaleDateString('en-CA', options) : '-';
}