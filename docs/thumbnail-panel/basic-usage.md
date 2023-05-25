# Basic Usage

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@iiif/thumbnail-panel/dist/web-components/style.css"
    />
    <title>Thumbnail Panel Example</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/@iiif/thumbnail-panel/dist/web-components/index.umd.js"></script>

    <button id="thumbnail-panel-next">Next</button>
    <button id="thumbnail-panel-previous">Previous</button>

    <thumbnail-panel
      id="thumbnail-panel"
      iiif-content="https://digirati-co-uk.github.io/wunder.json"
    ></thumbnail-panel>

    <script>
      const thumbnailPanel = document.getElementById("thumbnail-panel");
      const nextButton = document.getElementById("thumbnail-panel-next");
      const previousButton = document.getElementById(
        "thumbnail-panel-previous"
      );

      thumbnailPanel.addEventListener("resource-changed", (e) => {
        console.log("e", e);
        const target = e.target.querySelector("[thumbnail-panel]");

        if (target) {
          const next = target.getAttribute("data-next-resource");
          nextButton.setAttribute("data-id", next);

          if (next === null) {
            nextButton.setAttribute("disabled", true);
          } else {
            nextButton.removeAttribute("disabled");
          }

          const previous = target.getAttribute("data-previous-resource");
          previousButton.setAttribute("data-id", previous);

          if (previous === null) {
            previousButton.setAttribute("disabled", true);
          } else {
            previousButton.removeAttribute("disabled");
          }
        }
      });

      nextButton.addEventListener("click", (e) => {
        const next = e.target.getAttribute("data-id");
        if (next != "null")
          thumbnailPanel.setAttribute("current-resource-id", next);
      });

      previousButton.addEventListener("click", (e) => {
        const prev = e.target.getAttribute("data-id");
        if (prev !== "null")
          thumbnailPanel.setAttribute("current-resource-id", prev);
      });
    </script>
  </body>
</html>
```
