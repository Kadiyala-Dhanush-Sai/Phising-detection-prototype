let PAGE_RISK_SCORE = 0;

function analyzeURL(url) {
    const u = new URL(url);
    const domain = u.hostname;

    let score = 0;
    let reasons = [];

    if (/[0-9]/.test(domain.replace(/\./g, ""))) {
        score += 20;
        reasons.push("Domain contains lookalike characters");
    }

    if (url.includes("@")) {
        score += 30;
        reasons.push("URL contains '@' symbol trick");
    }

    if (domain.split(".").length > 4) {
        score += 15;
        reasons.push("Excessive subdomains detected");
    }

    if (domain.startsWith("xn--")) {
        score += 25;
        reasons.push("Unicode homograph (punycode) domain");
    }

    return { score, reasons };
}

// ❌ Do not run on extension pages
if (window.location.protocol !== "chrome-extension:") {

    const result = analyzeURL(window.location.href);
    PAGE_RISK_SCORE = result.score;

    // Save analysis
    chrome.storage.local.set({
        lastRiskScore: result.score,
        lastReasons: result.reasons
    });

    // 🚨 ONLY open warning if score is high
    if (PAGE_RISK_SCORE >= 30) {
        chrome.runtime.sendMessage({
            action: "OPEN_WARNING",
            url: window.location.href
        });
    }
}


// TO CHECK WARNING PAGE IS WORKING OR NOT


const DEBUG_FORCE_WARNING = true;
if (DEBUG_FORCE_WARNING) {
  chrome.runtime.sendMessage({
    action: "OPEN_WARNING",
    url: window.location.href
  });
}
