+ **要解決的問題：** 
     
     一般使用文字轉語音都是用內建的語音，所以就想能不能使用自己指定的聲音呢？

     這個可以應用在要錄線上課程的時候，只要講稿打好了，音訊檔也生出來了

+ **步驟：**(使用[自訂神經語音專案])
1. 在Azure建立語音服務：

   根據[區域](https://learn.microsoft.com/zh-tw/azure/cognitive-services/speech-service/regions#custom-neural-voices) 文件，所以我區域設在US(東亞不行)
   
   定價層需使用S0以上才能使用[自訂神經語音專案]服務
   ![Azure認知服務_語音服務_S0](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.1_azure%E8%AA%8D%E7%9F%A5%E6%9C%8D%E5%8B%99_%E8%AA%9E%E9%9F%B3%E6%9C%8D%E5%8B%99_S0!!!.png)
2. 從語音服務進到Speech Studio，然後選[文字轉換語音]的[自訂語音]
   ![fig.2_進到speech studio_文字轉語音_自訂語音](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.2_%E9%80%B2%E5%88%B0speech%20studio_%E6%96%87%E5%AD%97%E8%BD%89%E8%AA%9E%E9%9F%B3_%E8%87%AA%E8%A8%82%E8%AA%9E%E9%9F%B3.png)
3. 建立[自訂神經語音專案]，我們是先用精簡版試看看長怎樣
   ![fig.3_自訂神經語音模型](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.3_%E8%87%AA%E8%A8%82%E7%A5%9E%E7%B6%93%E8%AA%9E%E9%9F%B3%E6%A8%A1%E5%9E%8B.png)
   不過他定型資料的語言沒有繁體中文，所以我們先用簡體試試
   ![fig.4_只有檢體QQ](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.4_%E5%8F%AA%E6%9C%89%E6%AA%A2%E9%AB%94QQ.png)
4. 再來就是照他步驟錄聲音，不能用上傳的。(我原本是想用老師的聲音，這樣期末成果影片放出來是老師的聲音就很好笑)
   ![fig.5_按要求錄音_不能上傳音檔qq](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.5_%E6%8C%89%E8%A6%81%E6%B1%82%E9%8C%84%E9%9F%B3_%E4%B8%8D%E8%83%BD%E4%B8%8A%E5%82%B3%E9%9F%B3%E6%AA%94qq.png)
5. 錄好聲音後就是要定型模型，要在[錄製和組建]記錄 20 個樣本，然後按[定型模型]。這邊是請我們組員錄，然後預估訓練時間要0.8小時，很久
   ![fig.6_訓練](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.6_%E8%A8%93%E7%B7%B4.png)
6. 結果長這樣，他有提供一些範例輸入，出來的語音確實是組員的聲音
   ![fig.7_結果](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.7_%E7%B5%90%E6%9E%9C.png)
7. 測試模型
   可以自行輸入文字測試
   ![fig.8_測試](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.8_%E6%B8%AC%E8%A9%A6.png)
    
