import data from "../data/data.json";

// import { js_beautify } from "https://cdn.jsdelivr.net/npm/js-beautify@1.14.0/js/lib/beautify.js"



window["actionTabComponentDropdown"] = (element) => {
  document.querySelector("#tab-component-container .tab-active")?.classList.remove("tab-active");
  element.classList.add("tab-active");
  
  const htmlCode = data[element.getAttribute("data-key")].children[element.getAttribute("data-component-key")].syntax;

  document.querySelector("#iframe-preview").srcdoc =
    `<script src="https://cdn.tailwindcss.com"></script>
   <div class="p-10 flex justify-center items-center w-full">
     ${htmlCode}
   </div>`;
  (async () => {

    const formatted = await prettier.format(htmlCode, {
      parser: "html",
      plugins: prettierPlugins, // Prettier automatically loads the plugin from the global scope
    });
    document.querySelector("#code-block").innerHTML = escapeHtml(formatted)
    Prism.highlightAll();
    document.getElementById("preview-toggle").click();
  })()

};

function escapeHtml(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
document.getElementById('tab-component-container').children[0].click();

