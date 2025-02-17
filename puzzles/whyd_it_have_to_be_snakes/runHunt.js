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
  let data = parseCookie;
  if (!(puzlIdx in data["solves"]))
  {
      data["solves"].push(puzlIdx);
      setCookie(data);
  }
}

function showUnlockedPuzzles()
{
  let data = parseCookie();
  let puzlWidth = 3 + data["extraUnlockWidth"] + data["solves"].length;
  for (let idx = 0; idx <= puzlWidth; ++idx)
  {
      Array.from(document.getElementsByClassName("puz" + idx)).forEach((elem) => {
        elem.style.visibility = "visible";
      });
  }
}

function increasePuzzleWidth()
{
    let data = parseCookie();
    data["extraUnlockWidth"]++;
    setCookie(data);
    showUnlockedPuzzles();
}

function initCookieIfNeeded()
{
  if ((document.cookie === null) || (document.cookie == ""))
  {
    //alert("Creating new cookie");
    createNewCookie();
  }
  else
  {
    //alert("Cookie already exists - " + document.cookie);
  }
}

function onPageLoad()
{
    initCookieIfNeeded();
    showUnlockedPuzzles();
}