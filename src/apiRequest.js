const apiRequest = async (API_URL = "", options = null, errMsg = null) => {
  try {
    const data = await fetch(API_URL, options);
    if (!data.ok) throw Error("Please reload the App");
  } catch (err) {
    errMsg = err;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
