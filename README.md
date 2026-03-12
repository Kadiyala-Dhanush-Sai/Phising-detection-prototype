# Phising-detection-prototype
detects phising websites and urls
# Catch Me If You Can – Phishing Detection Chrome Extension

A Chrome Extension that detects **phishing or suspicious websites in real time** using **machine learning–inspired URL analysis and browser security checks**.

The extension scans the URL structure, extracts security-related features, calculates a **risk score**, and warns users before they interact with potentially dangerous websites.

---

## 🚀 Features

* 🔍 **Real-time URL scanning**
* 🧠 **ML-informed risk scoring system**
* ⚠️ **Automatic phishing warning page**
* 🔐 **Login form detection alerts**
* 📊 **Risk score explanation with reasons**
* 📜 **Threat history tracking**
* 🎨 Modern security-themed UI

---

## 🧠 How It Works

1. The extension runs a **content script on every webpage**.
2. It extracts important features from the URL such as:

   * URL length
   * Number of dots
   * Presence of `@` symbol
   * Suspicious keywords
   * HTTPS usage
   * IP address in URL
3. These features are passed to a **machine-learning-inspired scoring model**.
4. A **risk score (0–100)** is calculated.
5. If the score crosses a threshold, the extension:

   * Shows a **phishing warning page**
   * Alerts the user before they continue.

The extension also warns users if a page contains **login/password fields**, helping prevent credential theft.

---

## 🧩 Project Architecture

```
phishing-detector-extension/
│
├── manifest.json        # Chrome extension configuration
├── background.js        # Handles tab actions and warning page
├── content.js           # Runs URL analysis on every webpage
├── engine.js            # ML-informed phishing detection logic
│
├── popup.html           # Extension popup UI
├── popup.js             # Popup scanning logic
├── popup.css            # Popup styling
│
├── warning.html         # Security warning page
├── warning.js           # Warning page controls
├── warning.css          # Warning page styling
│
└── README.md
```

The extension uses **Chrome Extension Manifest V3** and runs on all URLs. 

---

## 🧠 Phishing Detection Logic

The detection system extracts URL features and calculates a risk score using weights derived from a **Logistic Regression model trained in Python (scikit-learn)**.

Example features used:

* URL length
* Number of dots
* Presence of `@`
* Hyphenated domains
* Missing HTTPS
* Suspicious keywords (login, verify, bank, update)
* IP address usage

These features are combined to produce a **risk score between 0–100**.

---

## ⚠️ Security Warning System

If a suspicious URL is detected:

* The extension automatically redirects the user to a **security warning page**.
* The user can:

  * **Go Back** to safety
  * **Continue Anyway** at their own risk

The background script manages these actions and tab behavior. 

---

## 🖥️ User Interface

### Extension Popup

Displays:

* Current website URL
* Risk score
* Safety status
* Reasons for detection
* Security tips

The popup acts as a **quick security scanner for the current tab**. 

---

## 🛠️ Technologies Used

* JavaScript (ES6)
* Chrome Extension API
* HTML5
* CSS3
* Machine Learning (Logistic Regression concepts)
* URL feature engineering

---

## 🔧 Installation

1. Clone this repository

```bash
git clone https://github.com/yourusername/phishing-detector-extension.git
```

2. Open Chrome and go to:

```
chrome://extensions/
```

3. Enable **Developer Mode**

4. Click **Load Unpacked**

5. Select the project folder

6. The extension will now start scanning websites.

---

## 📊 Example Detection

| Risk Score | Status             |
| ---------- | ------------------ |
| 0–29       | Safe Website       |
| 30–59      | Suspicious Website |
| 60–100     | Phishing Website   |

---

## 🎯 Future Improvements

* Integrate **real ML model directly in the extension**
* Add **domain reputation API**
* Improve **dataset training**
* Add **real-time blacklist database**
* Support **Firefox extension**

---

## 👨‍💻 Author

Dhanush
Computer Science Student | AI & ML Enthusiast

---

## ⭐ If you like this project

Give the repository a **star ⭐** and feel free to contribute!
