chrome.storage.local.set({
    lastRiskScore: result.score
});
// =======================================
// ML WEIGHTS (EXTRACTED FROM COLAB MODEL)
// Logistic Regression – scikit-learn
// =======================================

const ML_WEIGHTS = {
  url_length: 0.711,
  dot_count: 0.131,
  has_at: 0.0,
  has_hyphen: 0.0,
  has_https: -0.131,
  has_ip: -0.0,
  has_suspicious_word: 0.131
};

// =======================================
// ML-INFORMED PHISHING DETECTION ENGINE
// Feature weights derived from
// Logistic Regression model trained
// using scikit-learn in Google Colab
// =======================================

let currentURL = "";

/* Get current tab URL & auto scan */
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  currentURL = tabs[0].url;
  document.getElementById("url").innerText = currentURL;
  runScan();
});

/* Feature extraction (matches CSV & Colab) */
function extractFeatures(url) {
  return {
    url_length: url.length,
    dot_count: (url.match(/\./g) || []).length,
    has_at: url.includes("@"),
    has_hyphen: url.includes("-"),
    has_https: url.startsWith("https"),
    has_ip: /\d+\.\d+\.\d+\.\d+/.test(url),
    has_suspicious_word: /(login|verify|secure|bank|update)/i.test(url)
  };
}

/* ML-informed risk scoring */
function calculateRisk(features) {
  let score = 0;
  let reasons = [];

  score += features.url_length * ML_WEIGHTS.url_length / 10;
  score += features.dot_count * ML_WEIGHTS.dot_count;

  if (features.has_at) {
    score += ML_WEIGHTS.has_at * 10;
    reasons.push("@ symbol detected");
  }

  if (features.has_hyphen) {
    score += ML_WEIGHTS.has_hyphen * 10;
    reasons.push("Hyphenated domain");
  }

  if (!features.has_https) {
    score += Math.abs(ML_WEIGHTS.has_https) * 10;
    reasons.push("HTTPS missing");
  }

  if (features.has_ip) {
    score += ML_WEIGHTS.has_ip * 10;
    reasons.push("IP address in URL");
  }

  if (features.has_suspicious_word) {
    score += ML_WEIGHTS.has_suspicious_word * 10;
    reasons.push("Suspicious keyword detected");
  }

  return {
    score: Math.min(Math.round(score), 100),
    reasons
  };
}

/* Save threat history */
function saveThreat(url, score) {
  chrome.storage.local.get(["history"], data => {
    let history = data.history || [];

    history.unshift({
      url: url,
      score: score,
      time: new Date().toLocaleString()
    });

    history = history.slice(0, 5);
    chrome.storage.local.set({ history });
  });
}

/* Run scan automatically */
function runScan() {
  const features = extractFeatures(currentURL);
  const result = calculateRisk(features);

  let status = "";
  let className = "";

  if (result.score >= 60) {
    status = " PHISHING WEBSITE";
    className = "danger";
  } else if (result.score >= 30) { 
    status = " SUSPICIOUS WEBSITE";
    className = "warning";
  } else {
    status = " SAFE WEBSITE";
    className = "safe";
  }
  chrome.storage.local.set({
    lastRiskScore: result.score
  });

  document.getElementById("result").innerHTML =
    `<span class="${className}">${status} (Risk ${result.score}%)</span>`;

  document.getElementById("reasons").innerHTML =
    "<ul>" + result.reasons.map(r => `<li>${r}</li>`).join("") + "</ul>";

  saveThreat(currentURL, result.score);
}

document.getElementById("trainingBtn").addEventListener("click", () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("training.html")
  });
});
