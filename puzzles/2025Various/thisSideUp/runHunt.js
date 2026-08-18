const huntData = {
  "A": { "normalized": "RVZBQ1VBVEU=", "display": "RVZBQ1VBVEU=" }
};

const DEFAULT_WIDTH = 1;

function resetHunt()
{
    createNewCookie();
    Array.from(document.getElementsByClassName("puzzle")).forEach((elem) => {
        elem.style.visibility = "hidden";
        elem.style.filter = "grayscale(100%)";
    });
    showPuzzleStatus();
}

// https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function createNewCookie()
{
  let newCookieData = {
    "extraUnlockWidth": 0,
    "solves": []
  };
  setCookie(newCookieData);
}

function parseCookie()
{
  return JSON.parse(atob(getCookie("hunt")));
}

function setCookie(updatedVals)
{
  document.cookie = "hunt=" + btoa(JSON.stringify(updatedVals));
}

function markPuzzleSolved(puzlIdx)
{
  let data = parseCookie();
  if (!data["solves"].includes(puzlIdx))
  {
      data["solves"].push(puzlIdx);
      setCookie(data);
  }
}

function showPuzzleStatus()
{
  let data = parseCookie();
  let puzlWidth = DEFAULT_WIDTH + data["extraUnlockWidth"] + data["solves"].length;
  for (let idx = 0; idx <= puzlWidth; ++idx)
  {
      Array.from(document.getElementsByClassName("puz" + idx)).forEach((elem) => {
        elem.style.visibility = "visible";
        elem.style.filter = "grayscale(100%)";
      });
  }
  data["solves"].forEach((idx) => {
    document.getElementById("solv" + idx).style.filter = '';
  });
}

function submitAnswer(puzlId)
{
  // Normalize the answer
  const alphaRegex = /[^A-Z]+/g;
  let normalized = document.getElementById("answerText").value.toUpperCase().replaceAll(alphaRegex, "");
  console.log("Comparing " + normalized + "(" + btoa(normalized) + ") to " + huntData[puzlId]["normalized"] + ", puzlId = " + puzlId);
  if (huntData[puzlId]["normalized"] == btoa(normalized))
  {
    markPuzzleSolved(puzlId);
    hideChecker(puzlId);
  }
  else
  {
    alert("Sorry, that isn't the right answer.");
    document.getElementById("answerText").value = "";
  }
}

function increasePuzzleWidth()
{
    let data = parseCookie();
    data["extraUnlockWidth"]++;
    setCookie(data);
    showPuzzleStatus();
}

function initCookieIfNeeded()
{
  if ((document.cookie === null) || (document.cookie == ""))
  {
    createNewCookie();
  }
}

function onPageLoad()
{
  initCookieIfNeeded();
  showPuzzleStatus();
}

function hideChecker(puzlId)
{
  let answerBlock = document.getElementById("answer");
  answerBlock.textContent = atob(huntData[puzlId]["display"]);
  answerBlock.style.visibility = "visible";
  checker.style.visibility = "hidden";
}

function onPuzzleLoad()
{
  let data = parseCookie();
  let checker = document.getElementById("checker");
  let puzlId = checker.className.split("-")[1];
  if (data["solves"].includes(puzlId))
  {
    hideChecker(puzlId);
  }
}
