const client_id = process.env.API_CLIENT_ID;
const client_secret = process.env.API_CLIENT_SECRET;
const scope = ["write_content", "write_products", "write_customers", "write_orders", "write_draft_orders"].join(",");
const nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

function getAccessToken(host) {
  const searchParams = new URLSearchParams({
    client_id, scope,
    redirect_uri: browser.identity.getRedirectURL(),
    state: nonce,
  })
  const url = `https://${host}/admin/oauth/authorize?${searchParams.toString()}`
  return browser.identity.launchWebAuthFlow({interactive: true, url: url});
}

function extractParams(redirectUri) {
  let m = redirectUri.match(/[#?](.*)/);
  if (!m || m.length < 1) { return {} }
  return new URLSearchParams(m[1].split("#")[0]);
}

function fetchAccessToken(params) {
  return fetch(`https://${params.get('shop')}/admin/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id, client_secret,
      code: params.get('code'),
    })
  })
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  getAccessToken(request.host)
    .then(extractParams)
    .then(fetchAccessToken)
    .then((resp) => resp.json())
    .then(sendResponse);
  return true
});
