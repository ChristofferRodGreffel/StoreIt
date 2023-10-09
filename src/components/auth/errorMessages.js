const authErrorMessages = {
  "auth/app-deleted": "The Firebase project associated with this app has been deleted.",
  "auth/app-not-authorized": "This app is not authorized to use Firebase Authentication.",
  "auth/argument-error": "An invalid argument was provided.",
  "auth/invalid-api-key": "The provided API key is invalid.",
  "auth/invalid-user-token": "The user token is invalid. Please sign in again.",
  "auth/network-request-failed": "A network error occurred. Please check your internet connection and try again.",
  "auth/operation-not-allowed": "The requested authentication operation is not allowed.",
  "auth/too-many-requests": "Too many requests. Please try again later.",
  "auth/unauthorized-domain": "This domain is not authorized for OAuth operations.",
  "auth/user-disabled": "The user account has been disabled by an administrator.",
  "auth/user-not-found": "User not found. Please check your email or sign up for an account.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use": "The email address is already in use. Please choose a different email.",
  "auth/invalid-email": "Invalid email address. Please check the email format and try again.",
  "auth/weak-password": "Password is too weak. It should be at least 6 characters long.",
  "auth/email-already-exists": "The email address already exists. Please use a different email to sign up.",
  "auth/account-exists-with-different-credential":
    "An account with this email already exists, but with a different sign-in method.",
  "auth/invalid-verification-code": "Invalid verification code. Please check and try again.",
  "auth/requires-recent-login": "This operation requires you to sign in again for security purposes.",
  "auth/popup-closed-by-user": "The sign-in popup was closed by the user before completing the process.",
  "auth/captcha-check-failed": "CAPTCHA verification failed. Please try again.",
  "auth/token-expired": "Your session has expired. Please sign in again.",
  "auth/user-token-revoked": "Your authentication token has been revoked. Please sign in again.",
  "auth/provider-already-linked": "This provider is already linked to your account.",
  "auth/missing-phone-number": "A phone number is required for this action. Please provide a valid phone number.",
  "auth/invalid-login-credentials": "The Email or the password is incorrect.",
  // Add more error codes and custom messages as needed
};

export default authErrorMessages;