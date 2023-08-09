const isValidURL = (url) => {
  // Regular expression for a simple URL pattern
  var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlPattern.test(url);
};

export default isValidURL;
