function check(isPhishing) {
  const result = document.getElementById("result");

  if (isPhishing) {
    result.innerHTML =
      "✅ Correct! The domain uses a lookalike character (paypa1).";
  } else {
    result.innerHTML =
      "❌ Incorrect. This is a classic phishing trick using domain spoofing.";
  }
}

