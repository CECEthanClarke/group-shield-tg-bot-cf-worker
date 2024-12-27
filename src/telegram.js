async function postJSON(token, method, body) {
  try {
    const url = `https://api.telegram.org/bot${token}/${method}`;
    const response = await fetch(url, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

async function sendMessage(token, body) {
  try {
    const result = await postJSON(token, 'sendMessage', body);
    return result;
  } catch (error) {
    throw error;
  }
}
async function restrictChatMember(token, body) {
  try {
    const result = await postJSON(token, 'restrictChatMember', body);
    return result;
  } catch (error) {
    throw error;
  }
}
async function banChatMember(token, body) {
  try {
    const result = await postJSON(token, 'banChatMember', body);
    return result;
  } catch (error) {
    throw error;
  }
}
async function answerCallbackQuery(token, body) {
  try {
    const result = await postJSON(token, 'answerCallbackQuery', body);
    return result;
  } catch (error) {
    throw error;
  }
}
async function getChat(token, body) {
  try {
    const result = await postJSON(token, 'getChat', body);
    return result;
  } catch (error) {
    throw error;
  }
}
async function deleteMessage(token, body) {
  try {
    const result = await postJSON(token, 'deleteMessage', body);
    return result;
  } catch (error) {
    throw error;
  }
}

const telegram = {
  sendMessage,
  restrictChatMember,
  banChatMember,
  answerCallbackQuery,
  getChat,
  deleteMessage,
}
export default telegram