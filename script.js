const apiKey = "MY_GPT_API_KEY";
const url = 'https://api.openai.com/v1/chat/completions';

const sendButton = document.getElementById("sendRequest");
const responseMessageObject = document.getElementById("receivedResponse");
const userQuestionObject = document.getElementById("userQuestion");
sendButton.addEventListener("click", sendRequest);

//REST_API
//1) GET : READ <<<<<<< normal Search
//2) POST : CREATE  <<<<<<< openAPI
//3) PUT : MODIFY
//4) DELETE : DELETE
async function sendRequest(){
  try {
    //인증 - header에
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    //질문 - body에
    let text1 = userQuestionObject.value;
    console.log("[QUESTION] "+ text1);
    let text2 = userQuestionObject.value + ":" +"translate it in korean.";
    console.log("[QUESTION] "+ text2);
        
    const payload = {
      model: "gpt-3.5-turbo",//"gpt-4o" //"gpt-4o-mini"
      messages: [{ role: "user", content: text2 }],
      temperature: 0.7
    };

    console.log("URL:", url);
    console.log("Headers:", headers);
    console.log("Payload:", payload);
    
    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const responseMessage = responseData.choices[0].message.content;
    console.log(responseMessage);
    responseMessageObject.textContent = responseMessage;
  } 
  catch (error) {
    console.error("Error:", error);
  }
}
