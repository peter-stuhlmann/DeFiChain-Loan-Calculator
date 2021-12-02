var heading, paragraph;

if (window.navigator.userLanguage.lastIndexOf('de', 0) === 0) {
  heading = 'Internet Explorer wird<br />nicht mehr unterstützt';
  paragraph =
    'Du nutzt einen veralteten Browser. Um diese Website anzuzeigen und ein besseres<br />Surferlebnis zu erhalten, lade kostenlos einen neuen Browser herunter:';
} else {
  heading = 'Internet Explorer is<br />no longer supported';
  paragraph =
    "You're using an outdated browser. To view this site and get a<br />better browsing experience, download a new browser for free:";
}

document.body.innerHTML =
  "<div id='root'><h1>" +
  heading +
  '</h1><p>' +
  paragraph +
  "</p><ul><li><a href='https://www.google.com/chrome'>Google Chrome<span>&#8250;</span></a></li><li><a href='https://www.mozilla.org/firefox'>Mozilla Firefox<span>&#8250;</span></a></li><li><a href='https://www.microsoft.com/edge'>Microsoft Edge<span>&#8250;</span></a></li></ul></div>";

var stylesheet = document.createElement('link');
stylesheet.type = 'text/css';
stylesheet.href = '/ie.css';
stylesheet.rel = 'stylesheet';
document.getElementsByTagName('head')[0].appendChild(stylesheet);

// Dark Theme
var currentDate = new Date();
var hours = currentDate.getHours();
if (!(hours >= 7 && hours <= 22)) {
  document.body.style.backgroundColor = 'rgb(25, 25, 25)';
  document.getElementsByTagName('h1')[0].style.color = 'rgb(230, 230, 230)';
  document.getElementsByTagName('p')[0].style.color = 'rgb(230, 230, 230)';
  document.getElementsByTagName('a')[0].style.color = 'rgb(230, 230, 230)';
  for (let i = 0; i < document.getElementsByTagName('a').length; i++) {
    document.getElementsByTagName('a')[i].style.color = 'rgb(230, 230, 230)';
    document.getElementsByTagName('a')[i].style.borderColor =
      'rgb(230, 230, 230)';
  }
}
