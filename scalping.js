async function analyzeMarket(symbol) {
    try {
        const response = await fetch(`https://pussy-destroyer-backend.vercel.app/api/analyze?symbol=${symbol}`);
        const data = await response.json();

        document.getElementById("signal").innerText = data.signal;
        document.getElementById("entry").innerText = `$${data.entry}`;
        document.getElementById("stoploss").innerText = `$${data.stop}`;
        document.getElementById("take1").innerText = `$${data.take}`;
        document.getElementById("argument").innerText = data.argument;
    } catch (e) {
        document.getElementById("signal").innerText = "Ошибка";
        document.getElementById("entry").innerText = "-";
        document.getElementById("stoploss").innerText = "-";
        document.getElementById("take1").innerText = "-";
        document.getElementById("argument").innerText = "Сервер недоступен или символ не поддерживается.";
    }
}
