export default async function makeRequest(
  url,
  haveParams = false,
  haveToConvertToJson = true,
  headerMethod = '',
  headerToken = null,
  bodyData = {},
  contentType = "application/json"
) {
  function getParam() {
    if (!contentType) {
      return {
        method: headerMethod,
        headers: {
          Authorization: `Bearer ${headerToken}`,
        },
        body: bodyData,
      };
    } else {
      return {
        method: headerMethod,
        headers: {
          Authorization: `Bearer ${headerToken}`,
          "Content-type": contentType,
        },
        body: bodyData,
      };
    }
  }
  try {
    const response = await fetch(url, haveParams && getParam());
    if (haveToConvertToJson) {
      const result = await response.json();
      return result;
    } else {
      return response;
    }
  } catch (err) {
    return err;
  }
}