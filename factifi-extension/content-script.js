chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractText") {
    const text = document.body.innerText;

    const cleanedText = text.replace(/\s+/g, " ").trim().substring(0, 5000);

    sendResponse({ text: cleanedText });
  }
});
