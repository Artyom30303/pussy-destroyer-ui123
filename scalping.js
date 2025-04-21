document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("symbol_select");
    const signalBox = document.getElementById("signal");
    const entryBox = document.getElementById("entry");
    const stopBox = document.getElementById("stoploss");
    const tpBox = document.getElementById("take1");
    const argBox = document.getElementById("argument");
    const tvContainer = document.getElementById("tradingview_chart");

    async function fetchAnalysis(symbol) {
        const response = await fetch(`https://pussy-destroyer-backend.vercel.app/api/analyze?symbol=${symbol}`);
        const data = await response.json();
        return data;
    }

    function loadTradingView(symbol) {
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
        loadTradingView(symbol);

        const result = await fetchAnalysis(symbol);

        signalBox.textContent = result.direction || "-";
        entryBox.textContent = result.entry || "-";
        stopBox.textContent = result.sl || "-";
        tpBox.textContent = result.tp1 || "-";
        argBox.textContent = (result.reason || []).join("; ");
    });

    // Загрузка сразу при старте
    dropdown.dispatchEvent(new Event("change"));
});
