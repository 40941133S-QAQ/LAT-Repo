'use strict';
const line = require('@line/bot-sdk'),
      express = require('express'),
      axios = require('axios'),
      configGet = require('config');
const {TextAnalyticsClient, AzureKeyCredential} = require("@azure/ai-text-analytics");

//Line config
const configLine = {
  channelAccessToken:configGet.get("CHANNEL_ACCESS_TOKEN"),
  channelSecret:configGet.get("CHANNEL_SECRET")
};

//Azure Text Sentiment
const endpoint = configGet.get("ENDPOINT");
const apiKey = configGet.get("TEXT_ANALYTICS_API_KEY");

const client = new line.Client(configLine);
//起服務
const app = express();
const port = process.env.PORT || process.env.port || 3001;
//常用的port：20、21、22、80
app.listen(port, ()=>{
  console.log(`listening on ${port}`);
});
//(輸入值)=>{函數}
//`字串 ${變數}` 

async function MS_TextSentimentAnalysis(thisEvent){
    console.log("[MS_TextSentimentAnalysis] in");
    const analyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));
    let documents = [];
    documents.push(thisEvent.message.text);
    // documents.push("我覺得櫃檯人員很親切");
    // documents.push("熱水都不熱，爛死了，很生氣！");
    // documents.push("房間陳設一般般");
    const results = await analyticsClient.analyzeSentiment(documents,'zh-Hant',{
      includeOpinionMining:true
    });
    console.log("[results] ", JSON.stringify(results));
    //Save to JSON Server
    let newData = {
      "sentiment": results[0].sentiment,
      "confidenceScore": results[0].confidenceScores[results[0].sentiment],
      "opinionText":""
    };

    if(results[0].sentences[0].opinions.length!=0){
      newData.opinionText = results[0].sentences[0].opinions[0].target.text;
    }

    let axios_add_data = {
      method:"post",
      url:"https://Arupe-jieson4zj6fu4server-1120510.azurewebsites.net/reviews",
      headers:{
        "content-type":"application/json"
      },
      data:newData
    };

    axios(axios_add_data)
    .then(function(response){
      console.log(JSON.stringify(response.data));
    })
    .catch(function(){
      console.log("Error!!");
    });
    //回傳改為中文
    const chsentiment = {
      "positive": "正向",
      "neutral": "中性",
      "negative": "負向"
    };
    const sentiment = results[0].sentiment;
    const translatedSentiment = chsentiment[sentiment] || sentiment;
    const confidenceScore = results[0].confidenceScores[sentiment];
    //取主詞
    let subject = "";
    if (results[0].sentences && results[0].sentences.length > 0) {
      const sentence = results[0].sentences[0];
      if (sentence.opinions && sentence.opinions.length > 0) {
        subject = sentence.opinions[0].target.text;
      }
    }
    //設定回復內容格式
    const replyText = `${translatedSentiment}。分數：${confidenceScore.toFixed(2)}。主詞：${subject}`;
    const echo = {
      type: 'text',
      text: replyText
    };
    return client.replyMessage(thisEvent.replyToken, echo);


}

app.post('/callback', line.middleware(configLine),(req, res)=>{
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result)=>res.json(result))
    .catch((err)=>{
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event){
  if(event.type !== 'message' || event.message.type !== 'text'){
    return Promise.resolve(null);
  }

  MS_TextSentimentAnalysis(event)
    .catch((err) => {
      console.error("Error:", err);
    }); 
}