+ **要解決的問題：** 
     
     一般使用文字轉語音都是用內建的語音，所以就想能不能使用自己指定的聲音呢？

     這個可以應用在要錄線上課程的時候，只要講稿打好了，音訊檔也生出來了

+ **步驟：**
1. 在Azure建立語音服務：

   根據[區域](https://learn.microsoft.com/zh-tw/azure/cognitive-services/speech-service/regions#custom-neural-voices) 文件，所以我區域設在US
   
   定價層需使用S0以上才有訓練聲音的服務
   ![Azure認知服務_語音服務_S0](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.1_azure%E8%AA%8D%E7%9F%A5%E6%9C%8D%E5%8B%99_%E8%AA%9E%E9%9F%B3%E6%9C%8D%E5%8B%99_S0!!!.png)
2. 從語音服務進到Speech Studio，然後選"文字轉換語音"的"自訂語音"
   ![]([https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.1_azure%E8%AA%8D%E7%9F%A5%E6%9C%8D%E5%8B%99_%E8%AA%9E%E9%9F%B3%E6%9C%8D%E5%8B%99_S0!!!.png](https://github.com/40941133S-QAQ/LAT-Repo/blob/main/final%20project/fig.2_%E9%80%B2%E5%88%B0speech%20studio_%E6%96%87%E5%AD%97%E8%BD%89%E8%AA%9E%E9%9F%B3_%E8%87%AA%E8%A8%82%E8%AA%9E%E9%9F%B3.png))

