// In unlock order (except for the meta)
const huntData = {
  "A": { "normalized": "T0FURVM=", "display": "T0FURVM=" },
  "B": { "normalized": "U09ORVM=", "display": "U09ORVM=" },
  "C": { "normalized": "WUVFVFM=", "display": "WUVFVFM=" },
  "D": { "normalized": "REVBVEg=", "display": "REVBVEg=" },
  "E": { "normalized": "TEFTRVI=", "display": "TEFTRVI=" },
  "F": { "normalized": "S0VZTkVT", "display": "S0VZTkVT" },
  "G": { "normalized": "TUFIT1VU", "display": "TUFIT1VU" },
  "H": { "normalized": "UlVTSEVEU09MTw==", "display": "UlVTSEVEIFNPTE8=" },
  "I": { "normalized": "VE9ZQVRMQVM=", "display": "VE9ZIEFUTEFT" },
}

const DEFAULT_WIDTH = 3;

function resetHunt()
{
    createNewCookie();
    Array.from(document.getElementsByClassName("puzzle")).forEach((elem) => {
        elem.style.visibility = "hidden";
        elem.style.filter = "grayscale(100%)";
    });
    showPuzzleStatus();
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
  return JSON.parse(document.cookie);
}

function setCookie(updatedVals)
{
  document.cookie = JSON.stringify(updatedVals);
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
