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

    function analyzeMarket(symbol) {
        // Без форматирования — отправляем символ как есть, например BTCUSDT
        fetch(`https://pussy-destroyer-backend.vercel.app/analyze?symbol=${symbol}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("signal").innerText = data.signal || "Нет данных";
                document.getElementById("entry").innerText = data.entry ? `$${data.entry}` : "-";
                document.getElementById("stoploss").innerText = data.stop ? `$${data.stop}` : "-";
                document.getElementById("take1").innerText = data.take ? `$${data.take}` : "-";
                document.getElementById("argument").innerText = data.argument || "Нет аргументации";
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
                document.getElementById("signal").innerText = "Ошибка";
                document.getElementById("entry").innerText = "-";
                document.getElementById("stoploss").innerText = "-";
                document.getElementById("take1").innerText = "-";
                document.getElementById("argument").innerText = "Сервер недоступен или символ не поддерживается.";
            });
    }

    symbolSelect.addEventListener("change", function () {
        const selectedSymbol = symbolSelect.value;
        loadTradingView(selectedSymbol);
        analyzeMarket(selectedSymbol);
    });

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        for (let option of symbolSelect.options) {
            option.hidden = !option.text.toLowerCase().includes(query);
        }
    });

    // Инициализация при загрузке
    loadTradingView("BTCUSDT");
    analyzeMarket("BTCUSDT");
});
