document.addEventListener("DOMContentLoaded", function () {
    const symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "ADAUSDT"];
    const container = document.getElementById("results");

    async function analyzeSymbol(symbol) {
        const response = await fetch(`https://pussy-destroyer-backend.vercel.app/api/analyze?symbol=${symbol}`);
        const result = await response.json();
        return result;
    }

    async function loadAll() {
        container.innerHTML = "<h2>Загрузка анализа...</h2>";
        const results = await Promise.all(symbols.map(s => analyzeSymbol(s)));
        container.innerHTML = "";

        results.forEach(r => {
            const card = document.createElement("div");
            card.className = "signal-card";

            card.innerHTML = `
                <h3>${r.symbol}</h3>
                <p><strong>Направление:</strong> ${r.direction}</p>
                <p><strong>Доверие:</strong> ${r.confidence || 0}%</p>
                ${r.entry ? `<p><strong>Entry:</strong> ${r.entry}</p>` : ""}
                ${r.sl ? `<p><strong>Stop Loss:</strong> ${r.sl}</p>` : ""}
                ${r.tp1 ? `<p><strong>Take Profit 1:</strong> ${r.tp1}</p>` : ""}
                ${r.tp2 ? `<p><strong>Take Profit 2:</strong> ${r.tp2}</p>` : ""}
                <details>
                    <summary>Аргументация</summary>
                    <ul>${(r.reason || []).map(line => `<li>${line}</li>`).join("")}</ul>
                </details>
            `;
            container.appendChild(card);
        });
    }

    loadAll();
});
