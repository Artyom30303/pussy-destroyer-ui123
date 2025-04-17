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
        const fakeData = {
            "BTCUSDT": { signal: "Лонг", entry: 84653.01, stoploss: 82959.95, take1: 86346.07, argument: "Обнаружена поддержка" },
            "ETHUSDT": { signal: "Шорт", entry: 2893.52, stoploss: 3020.45, take1: 2750.36, argument: "Сопротивление на уровне 3000" },
            "BNBUSDT": { signal: "Нейтрально", entry: 579.19, stoploss: 550.00, take1: 600.00, argument: "Цена в боковике" },
            "DOGEUSDT": { signal: "Лонг", entry: 0.16898, stoploss: 0.16000, take1: 0.18000, argument: "Восходящий тренд" },
            "SOLUSDT": { signal: "Лонг", entry: 152.32, stoploss: 147.00, take1: 160.00, argument: "Пробой сопротивления" },
            "XRPUSDT": { signal: "Шорт", entry: 0.65, stoploss: 0.70, take1: 0.60, argument: "Сформирована вершина" },
            "ADAUSDT": { signal: "Лонг", entry: 0.58, stoploss: 0.54, take1: 0.63, argument: "Поддержка удержана" },
            "AVAXUSDT": { signal: "Нейтрально", entry: 38.2, stoploss: 36.0, take1: 40.0, argument: "Флэтовое движение" },
            "LINKUSDT": { signal: "Лонг", entry: 14.2, stoploss: 13.5, take1: 15.6, argument: "Объёмы на рост" },
            "MATICUSDT": { signal: "Шорт", entry: 0.95, stoploss: 1.01, take1: 0.89, argument: "Отбой от зоны предложения" },
            "TONUSDT": { signal: "Лонг", entry: 7.90, stoploss: 7.60, take1: 8.40, argument: "Пробой уровня 8.0" }
        };

        const data = fakeData[symbol] || { signal: "-", entry: "-", stoploss: "-", take1: "-", argument: "-" };
        document.getElementById("signal").innerText = data.signal;
        document.getElementById("entry").innerText = `$${data.entry}`;
        document.getElementById("stoploss").innerText = `$${data.stoploss}`;
        document.getElementById("take1").innerText = `$${data.take1}`;
        document.getElementById("argument").innerText = data.argument;
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

    // Загружаем данные по умолчанию
    loadTradingView("BTCUSDT");
    analyzeMarket("BTCUSDT");
});
