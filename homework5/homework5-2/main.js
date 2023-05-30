$(document).ready(function(){
    //按thisButton做事
    $("#thisButton").click(function(){
        processImage();
    });
});

function processImage() {
    
    //確認區域與所選擇的相同或使用客製化端點網址
    var url = "https://eastus.api.cognitive.microsoft.com/";
    var uriBase = url + "vision/v2.1/analyze";
    
    var params = {
        "visualFeatures": "Color", //from 官方文件
        "details": "",
        "language": "en",
    };
    //顯示分析的圖片
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;
    //送出分析
    $.ajax({
        url: uriBase + "?" + $.param(params),
        // Request header
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
        // Request body
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })
    .done(function(data) {
        //顯示JSON內容
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
    
        //獲取顏色資訊
        var colorInfo = data.color;
    
        //顯示主要顏色和比例
        var dominantColors = colorInfo.dominantColors;
    
        var colorsHtml = "圖片的主要顏色有：<ul style='list-style-type: none;'>"; // 使用 none 移除點點
        for (var i = 0; i < dominantColors.length; i++) {
            colorsHtml += "<li>" + (i+1) + ". " + dominantColors[i] + "</li>";
        }
        colorsHtml += "</ul>";
    
        $("#picDescription").html(colorsHtml);
    })
    
    
    
    
    .fail(function(jqXHR, textStatus, errorThrown) {
        //丟出錯誤訊息
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};