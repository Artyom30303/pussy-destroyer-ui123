document.addEventListener("DOMContentLoaded", () => {
    console.log("🔥 DOM загружен");

    const dropdown = document.getElementById("symbol_select");
    if (!dropdown) {
        console.error("❌ Не найден элемент #symbol_select");
        return;
    }

    const signalBox = document.getElementById("signal");
    const entryBox = document.getElementById("entry");
    const stopBox = document.getElementById("stoploss");
    const tpBox = document.getElementById("take1");
    const argBox = document.getElementById("argument");
    const tvContainer = document.getElementById("tradingview_chart");

    async function fetchAnalysis(symbol) {
        console.log("📡 Запрос на анализ:", symbol);
        try {
            const response = await fetch(`https://pussy-destroyer-backend.vercel.app/api/analyze?symbol=${symbol}`);
            const data = await response.json();
            console.log("✅ Ответ от backend:", data);
            return data;
        } catch (err) {
            console.error("❌ Ошибка запроса:", err);
            return {
                direction: "ERROR",
                reason: ["Ошибка соединения с API"],
            };
        }
    }

    function loadTradingView(symbol) {
        console.log("📊 Загружаю график:", symbol);
        tvContainer.innerHTML = "";
        new TradingView.widget({
            "container_id": "tradingview_chart",
            "width": "100%",
            "height": "400",
            "symbol": `BINANCE:${symbol}`,
            "interval": "60",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "ru",
            "toolbar_bg": "#111",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "hide_top_toolbar": false,
            "hide_legend": false
        });
    }

    dropdown.addEventListener("change", async () => {
        const symbol = dropdown.value;
        console.log("🔄 Смена монеты:", symbol);

        loadTradingView(symbol);

        const result = await fetchAnalysis(symbol);

        signalBox.textContent = result.direction || "-";
        entryBox.textContent = result.entry || "-";
        stopBox.textContent = result.sl || "-";
        tpBox.textContent = result.tp1 || "-";
        argBox.textContent = (result.reason || ["-"]).join("; ");
    });

    // Инициируем первый запрос вручную
    dropdown.dispatchEvent(new Event("change"));
});
