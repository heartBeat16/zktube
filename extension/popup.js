import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  const queryParameters = new URL(activeTab.url).searchParams;
  const currentVideo = queryParameters.get("v");
  const container = document.querySelector(".main");
  if (activeTab.url.includes("youtube.com/watch")) {
    let message = "";
    fetch(`http://localhost:4000/${videoId}`).then(response => response.json()).then(data => 
    message = data.message
  ).catch(error => console.log('Error' + error))
    if(message === true){ container.innerHTML = '<div class="text">You must have more than <span class="bold">1 contributions</span> in <span class="bold">ShieldFi/ShieldFi_superhack</span></div><button id="redirectButton" class="button button2">Verify</button>';
    document
      .getElementById("redirectButton")
      .addEventListener("click", function () {
        changeUrl(activeTab,currentVideo);
      });}else{
        container.innerHTML =
      '<div class="title">Allowed.</div>';
      }
   
  } else {
    container.innerHTML =
      '<div class="title">A youtube video has not yet started.</div>';
  }
});

function changeUrl(activeTab,currentVideo) {
  var newURL = "http://localhost:3000/verify?param1="+currentVideo;
  chrome.tabs.update(activeTab.id, { url: newURL });
}

