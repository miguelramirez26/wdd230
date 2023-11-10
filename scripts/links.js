const baseURL = "https://miguelramirez26.github.io/wdd230/";
const linksURL = "https://miguelramirez26.github.io/wdd230/data/links.json";
const linksContainer = document.querySelector(".column");

const displayLinks = (lessons) => {
    lessons.forEach((lesson) => {
        let lessonElement = document.createElement("div");
        let lessonTitle = document.createElement("h4");
        let ul = document.createElement("ul");

        lessonTitle.textContent = `Week ${lesson.lesson}:`;
        lessonElement.appendChild(lessonTitle);

        lesson.links.forEach((link) => {
            let li = document.createElement("li");
            let linkElement = document.createElement("a");
            linkElement.textContent = link.title;
            linkElement.setAttribute("href", `${baseURL}${link.url}`);
            li.appendChild(linkElement);
            ul.appendChild(li);
        });

        lessonTitle.appendChild(ul);
        lessonElement.appendChild(lessonTitle);
        lessonElement.classList.add("lesson-container");
        linksContainer.appendChild(lessonElement);
    });
};

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.lessons);
}

getLinks();
