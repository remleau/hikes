import { gsap, TweenMax } from "gsap";

export const ScrollTo = (ref) => {
  let hash = ref.substring(2);
  let node = document.getElementById(hash);

  setTimeout(() => {
    node && node.scrollIntoView({ behavior: 'smooth' })
  }, 150);
}

export const formatDate = (seconds) =>  {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return seconds ? new Date(seconds * 1000).toLocaleDateString('en-CA', options) : '-';
}

export const formatLocation = (adress) => {
  let parsed = JSON.parse(adress);

  const getAdress = () => {
    return parsed && parsed.adress;
  }
  
  return getAdress;
}