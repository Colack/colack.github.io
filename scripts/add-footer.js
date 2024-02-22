const email = "colackalpha@gmail.com";
const github = "https://github.com/colack/website";
const updateDate = "1/4/2023";

document.body.innerHTML += `
    <div class="footer">
        <p class="space-text-center">Made by Jack Spencer (c) 2024</p>
        <p class="space-text-center">Last updated: ${updateDate}</p>
        <p class="space-text-center">This website is open source. <a href="${github}">View the source code on GitHub.</a></p>
        <p class="space-text-center">Contact me at <a href="mailto:${email}">${email}</a></p>
        <p class="space-text-center">Include '?nocss' in the url to view the website without css.</p>

        <br>
        <br>

        <p class="space-text-center">Looks like you've reached the bottom. :/</p>
    </div>
`;