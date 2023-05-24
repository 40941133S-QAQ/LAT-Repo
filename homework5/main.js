$(document).ready(function(){
    //按thisButton，執行processImage()
    $("#thisButton").click(function(){
        processImage();
    });
});

function processImage() {
    // 確認區域與所選擇的相同或使用客製化端點網址
    var url = "https://eastus.api.cognitive.microsoft.com/";
    var uriBase = url + "vision/v2.1/analyze";

    var params = {
        "visualFeatures":"Categories",
        "details": "",
        "language": "en"
    };

    var sourceImageUrl = document.getElementById("inputImage").value;
    var sourceImageUrl2 = document.getElementById("inputImage2").value;

    // 顯示第一張圖片
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // 送出第一張圖片的分析
    $.ajax({
        url: uriBase + "?" + $.param(params),
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
        data: '{"url": "' + sourceImageUrl + '"}',
    })
    .done(function(data) {
        // 顯示 JSON 內容
        $("#responseTextArea").val(JSON.stringify(data, null, 2));

        // 顯示第二張圖片
        document.querySelector("#sourceImage2").src = sourceImageUrl2;

        // 送出第二張圖片的分析
        $.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            data: '{"url": "' + sourceImageUrl2 + '"}',
        })
        .done(function(data2) {
            // 顯示 JSON 內容
            $("#responseTextArea").val($("#responseTextArea").val() + "\n\n" + JSON.stringify(data2, null, 2));
            // 判斷兩張圖片是否屬於同種動物或不同物種
            var result = compareCategories(data, data2);
            $("#picDescription").append(result);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // 處理錯誤訊息
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        // 處理錯誤訊息
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
}

function compareCategories(data1, data2) {
    // 取得第一張圖片的 categories
    var categories1 = data1.categories;
    
    // 取得第二張圖片的 categories
    var categories2 = data2.categories;
    
    // 檢查兩個 categories 是否一樣
    var isSameSpecies = false;
    
    for (var i = 0; i < categories1.length; i++) {
        for (var j = 0; j < categories2.length; j++) {
            if (categories1[i].name === categories2[j].name) {
                isSameSpecies = true;
                break;
            }
        }
        
        if (isSameSpecies) {
            break;
        }
    }
    
    // 根據結果回傳相應的訊息
    if (isSameSpecies) {
        return "兩張圖片屬於同種動物。";
    } else {
        return "兩張圖片屬於不同物種。";
    }
}

