document.addEventListener('DOMContentLoaded', function() {
  // Listen for messages
  window.addEventListener('message', function(event) {
    if (event.source !== window) return;
    if (event.data.type && (event.data.type === 'CHECK_SPAM')) {
      checkForSpam();
    }
  });

  // Add a button to check for spam
  let button = document.createElement('button');
  button.textContent = 'Check Spam';
  button.style.position = 'fixed';
  button.style.top = '10px';
  button.style.right = '10px';
  button.onclick = checkForSpam;
  document.body.appendChild(button);
});

function checkForSpam() {
  console.log('Check Spam button clicked');
  let emailContent = getEmailContent();
  console.log('Email content:', emailContent);

  if (emailContent) {
    let isSpam = classifyEmail(emailContent);
    console.log('Spam classification result:', isSpam);
    alert(isSpam ? 'This email is SPAM' : 'This email is NOT spam');
  } else {
    console.error('Failed to retrieve email content.');
  }
}

function getEmailContent() {
  // Ensure the correct selector for Gmail's email content
  let emailBodyElement = document.querySelector('.a3s');
  if (emailBodyElement) {
    return emailBodyElement.innerText;
  } else {
    console.error('Email content element not found');
    return '';
  }
}

// Sample word counts from training data
const spamWordCounts = { "buy": 20, "free": 15, "winner": 10 }; // Example values
const hamWordCounts = { "meeting": 30, "schedule": 25, "project": 20 }; // Example values
const totalSpamWords = 100; // Example total
const totalHamWords = 150; // Example total
const uniqueWordsCount = 50; // Example unique word count

function classifyEmail(content) {
  const words = content.toLowerCase().split(/\s+/); // Split content into words
  let logProbSpam = Math.log(totalSpamWords / (totalSpamWords + totalHamWords));
  let logProbHam = Math.log(totalHamWords / (totalSpamWords + totalHamWords));

  words.forEach(word => {
    // Calculate spam probability
    const spamWordFreq = spamWordCounts[word] || 0;
    const probWordGivenSpam = (spamWordFreq + 1) / (totalSpamWords + uniqueWordsCount);
    logProbSpam += Math.log(probWordGivenSpam);

    // Calculate ham probability
    const hamWordFreq = hamWordCounts[word] || 0;
    const probWordGivenHam = (hamWordFreq + 1) / (totalHamWords + uniqueWordsCount);
    logProbHam += Math.log(probWordGivenHam);
  });

  return logProbSpam > logProbHam;
}
