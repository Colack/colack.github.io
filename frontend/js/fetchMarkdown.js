function darkMode() {
    let isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

async function fetchMarkdown(url) {
    try {
        const response = await fetch(url, {
            headers: { 'Accept': 'application/vnd.github.v3.raw' }
        });
        const markdown = await response.text();
        const htmlContent = marked.parse(markdown);
        document.getElementById('content').innerHTML = htmlContent;
    } catch (error) {
        console.error('Error fetching README:', error);
        document.getElementById('content').innerText = 'Failed to load README content';
    }
}