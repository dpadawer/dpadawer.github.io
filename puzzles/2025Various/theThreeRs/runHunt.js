const huntData = {
  "A": { "normalized": "TkVBUE9MSVRBTg==", "display": "TkVBUE9MSVRBTg==" },
  "B": { "normalized": "VEhSRUVPRkFLSU5E", "display": "VEhSRUUgT0YgQSBLSU5E" },
  "C": { "normalized": "R0xBQ0VPTg==", "display": "R0xBQ0VPTg==" },
  "D": { "normalized": "VEhFU1RBUg==", "display": "VEhFIFNUQVI=" },
  "E": { "normalized": "TUVHQQ==", "display": "TUVHQQ==" },
  "F": { "normalized": "U0VER0U=", "display": "U0VER0U=" },
  "G": { "normalized": "UExFSUFERVM=", "display": "UExFSUFERVM=" },
  "H": { "normalized": "SEVQVEFHT04=", "display": "SEVQVEFHT04=" },
  "I": { "normalized": "UE9JTlRJTkc=", "display": "UE9JTlRJTkc=" },
}

const DEFAULT_WIDTH = 8;

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
