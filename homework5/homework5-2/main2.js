var imageFolder = "D:\\Desktop\\colordata"; 
var totalImages = 0; // 圖片總數
var colorCounts = {}; // 顏色計數物件

$(document).ready(function(){
    $("#analyzeButton").click(function(){
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

    // 讀取選取的所有圖片檔案
    var files = $("#inputImageFile")[0].files;

    // 檢查是否有選擇圖片檔案
    if (files.length === 0) {
        console.log("請選擇圖片檔案");
        return;
    }

    // 處理每個圖片檔案
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageUrl = URL.createObjectURL(file);

        // 進行圖片分析
        $.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            data: '{"url": "' + imageUrl + '"}',
            async: false, // 確保圖片分析同步進行
            success: function (data) {
                var dominantColors = data.color.dominantColors;

                // 更新顏色計數
                dominantColors.forEach(function (color) {
                    if (colorCounts[color]) {
                        colorCounts[color]++;
                    } else {
                        colorCounts[color] = 1;
                    }
                });

                // 顯示結果
                displayColorTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("圖片分析失敗: " + imageUrl);
            }
        });
    }
}


// 顯示顏色統計表格
function displayColorTable() {
    var colorTable = $("#colorTable");
    var tbody = colorTable.find("tbody");
    tbody.empty();

    for (var color in colorCounts) {
        var count = colorCounts[color];
        var percentage = ((count / totalImages) * 100).toFixed(2) + "%";

        var row = $("<tr></tr>");
        $("<td></td>").text(color).appendTo(row);
        $("<td></td>").text(count).appendTo(row);
        $("<td></td>").text(percentage).appendTo(row);

        row.appendTo(tbody);
    }
}
