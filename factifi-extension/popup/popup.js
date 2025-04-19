document.addEventListener('DOMContentLoaded', function() {
  const checkPageBtn = document.getElementById('checkPage');
  const resultsDiv = document.getElementById('results');
  const confidenceScore = document.getElementById('confidenceScore');
  const citationsList = document.getElementById('citationsList');
  const toggleDarkModeBtn = document.getElementById('toggleDarkMode');
  const refreshBtn = document.getElementById('refresh');

  // Toggle dark mode
  toggleDarkModeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  });

  // Refresh the page
  refreshBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  });

  // Check page button click handler
  checkPageBtn.addEventListener('click', function() {
    checkPageBtn.disabled = true;
    checkPageBtn.textContent = 'Checking...';
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        files: ['content-script.js']
      }, () => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "extractText"}, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            showError();
            return;
          }
          
          sendToMockAPI(response.text)
            .then(data => displayResults(data))
            .catch(error => {
              console.error(error);
              showError();
            });
        });
      });
    });
  });

  // Send extracted text to mock API
  async function sendToMockAPI(text) {
    const response = await fetch('http://localhost:5000/fact-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text })
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    return await response.json();
  }

  // Display results from API
  function displayResults(data) {
    confidenceScore.textContent = `${data.confidence_score}%`;
    
    citationsList.innerHTML = '';
    data.citations.forEach(citation => {
      const li = document.createElement('li');
      li.textContent = citation;
      citationsList.appendChild(li);
    });
    
    resultsDiv.classList.add('visible');
    checkPageBtn.disabled = false;
    checkPageBtn.textContent = 'Check This Page';
  }

  // Show error message
  function showError() {
    confidenceScore.textContent = 'Error';
    citationsList.innerHTML = '<li>Could not verify facts at this time</li>';
    resultsDiv.classList.add('visible');
    checkPageBtn.disabled = false;
    checkPageBtn.textContent = 'Check This Page';
  }
});