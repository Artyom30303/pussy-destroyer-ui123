document.addEventListener("DOMContentLoaded", function () {
    const symbolSelect = document.getElementById("symbol_select");
    const searchInput = document.getElementById("search");
    const tradingViewContainer = document.getElementById("tradingview_chart");

    function loadTradingView(symbol) {
        tradingViewContainer.innerHTML = "";
        new TradingView.widget({
            "container_id": "tradingview_chart",
            "width": "100%",
            "height": "400",
            "symbol": `BINANCE:${symbol}`,
            "interval": "30",
            "theme": "light",
            "style": "1",
            "locale": "ru",
            "toolbar_bg": "#f1f3f6",
            "hide_top_toolbar": false,
            "save_image": false,
            "enable_publishing": false
        });
    }

    async function analyzeMarket(symbol) {
        try {
            const response = await fetch(`https://pussy-destroyer-backend.vercel.app/api/analyze?symbol=${symbol}`);
            const data = await response.json();

            document.getElementById("signal").innerText = data.signal || "-";
            document.getElementById("entry").innerText = data.entry ? `$${data.entry}` : "-";
            document.getElementById("stoploss").innerText = data.stop ? `$${data.stop}` : "-";
            document.getElementById("take1").innerText = data.take ? `$${data.take}` : "-";
            document.getElementById("argument").innerText = data.argument || "-";
        } catch (e) {
            document.getElementById("signal").innerText = "Ошибка";
            document.getElementById("entry").innerText = "-";
            document.getElementById("stoploss").innerText = "-";
            document.getElementById("take1").innerText = "-";
            document.getElementById("argument").innerText = "Сервер недоступен или символ не поддерживается.";
        }
    }

    // Слушатель выбора символа
    symbolSelect.addEventListener("change", function () {
        const selectedSymbol = symbolSelect.value;
        loadTradingView(selectedSymbol);
        analyzeMarket(selectedSymbol);
    });

    // Слушатель поиска
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        for (let option of symbolSelect.options) {
            option.hidden = !option.text.toLowerCase().includes(query);
        }
    });

    // По умолчанию загрузим BTCUSDT
    const defaultSymbol = "BTCUSDT";
    symbolSelect.value = defaultSymbol;
    loadTradingView(defaultSymbol);
    analyzeMarket(defaultSymbol);
});
