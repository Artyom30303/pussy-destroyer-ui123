document.addEventListener("DOMContentLoaded", () => {
    const symbolInput = document.getElementById("symbol_input");
    const button = document.getElementById("analyze_btn");
    const resultBox = document.getElementById("result");

    async function fetchAnalysis(symbol) {
        const response = await fetch(`https://pussy-destroyer-backend.vercel.app/api/analyze?symbol=${symbol}`);
        const data = await response.json();
        return data;
    }

    button.addEventListener("click", async () => {
        const symbol = symbolInput.value.toUpperCase().trim();
        resultBox.innerHTML = "Загрузка...";
        const res = await fetchAnalysis(symbol);

        if (res.direction === "NONE") {
            resultBox.innerHTML = `<p>Нет сигнала по ${res.symbol}</p><p>Причина: ${res.reason[0]}</p>`;
            return;
        }

        resultBox.innerHTML = `
            <h3>${res.symbol}</h3>
            <p><strong>Сигнал:</strong> ${res.direction}</p>
            <p><strong>Confidence:</strong> ${res.confidence}%</p>
            <p><strong>Entry:</strong> ${res.entry}</p>
            <p><strong>SL:</strong> ${res.sl}</p>
            <p><strong>TP1:</strong> ${res.tp1}</p>
            <p><strong>TP2:</strong> ${res.tp2}</p>
            <details>
                <summary>Обоснование сигнала</summary>
                <ul>${res.reason.map(r => `<li>${r}</li>`).join("")}</ul>
            </details>
        `;
    });
});
