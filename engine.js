// engine/urlAnalyzer.js

function hasSuspiciousCharacters(domain) {
    return /[0-9]/.test(domain.replace(/\./g, ""));
}

function hasAtSymbol(url) {
    return url.includes("@");
}

function hasTooManySubdomains(domain) {
    return domain.split(".").length > 4;
}

function isPunycode(domain) {
    return domain.startsWith("xn--");
}

function analyzeURL(url) {
    const u = new URL(url);
    const domain = u.hostname;

    let score = 0;
    let reasons = [];

    if (hasSuspiciousCharacters(domain)) {
        score += 20;
        reasons.push("Domain contains lookalike characters");
    }

    if (hasAtSymbol(url)) {
        score += 30;
        reasons.push("URL contains '@' symbol trick");
    }

    if (hasTooManySubdomains(domain)) {
        score += 15;
        reasons.push("Excessive subdomains detected");
    }

    if (isPunycode(domain)) {
        score += 25;
        reasons.push("Unicode homograph (punycode) domain");
    }

    return {
        score,
        reasons
    };
}
