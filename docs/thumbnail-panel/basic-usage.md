# Basic Usage

For basic HTML integration as a web component.

### Web Component

```html
<script src="https://www.unpkg.com/@iiif/thumbnail-panel/dist/web-components/index.umd.js"></script>
```

### Stylesheet

```html
<link rel="stylesheet" href="https://www.unpkg.com/@iiif/thumbnail-panel/dist/style.css"></link>
```

## Example

```html
<html>
  <head>
    <title>IIIF Thumbnail Panel</title>
    <meta charset="UTF-8" />
     <!-- Reference Thumbnail Panel basic styling from CDN -->
    <link rel="stylesheet" href="https://www.unpkg.com/@iiif/thumbnail-panel/dist/style.css"></link>
  </head>
  <body>
    <!-- Import Thumbnail Panel from CDN -->
    <script src="https://www.unpkg.com/@iiif/thumbnail-panel/dist/web-components/index.umd.js"></script>

    <!-- Simple navigation -->
    <nav>
      <button id="tp-prev">Previous</button>
      <button id="tp-next">Next</button>
    </nav>

    <!-- Web component -->
    <thumbnail-panel
      id="tp"
      iiif-content="https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json"
    ></thumbnail-panel>

    <!-- Our own custom javascript to handle events -->
    <script>
      const tp = document.getElementById("tp");
      const nextButton = document.getElementById("tp-next");
      const prevButton = document.getElementById(
        "tp-prev"
      );

      tp.addEventListener("resource-changed", async (e) => {
        const { resourceIds } = e.detail;

        nextButton.setAttribute("data-id", resourceIds.next);
        if (!resourceIds.next) {
          nextButton.setAttribute("disabled", true);
        } else {
          nextButton.removeAttribute("disabled");
        }

        prevButton.setAttribute("data-id", resourceIds.previous);
        if (!resourceIds.previous) {
          prevButton.setAttribute("disabled", true);
        } else {
          prevButton.removeAttribute("disabled");
        }
      });

      nextButton.addEventListener("click", (e) => {
        const next = e.target.getAttribute("data-id");
        if (next !== "null") tp.setAttribute("current-resource-id", next);
      });

      prevButton.addEventListener("click", (e) => {
        const prev = e.target.getAttribute("data-id");
        if (prev !== "null") tp.setAttribute("current-resource-id", prev);
      });
    </script>

  </body>
</html>
```

### React

The `ThumbnailPanel` component can be used in a _controlled_ or _uncontrolled_ way. [What is controlled vs uncontrolled?](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).

#### Controlled

```tsx
import { ThumbnailPanel } from "@iiif/thumbnail-panel";
```

#### Uncontrolled

```tsx
import { ThumbnailPanel } from "@iiif/thumbnail-panel";

function MyApp() {
    ...

    return (
        <ThumbnailPanel
            iiifContent="https://iiif-commons.github.io/fixtures/examples/thumbnail_panel/non_paged_at_end/v2/manifest.json"
            onResourceChanged={(resourceId?: string) => console.log("resourceId", resourceId)}
            orientation="vertical"
        >
            <Nav />
        </ThumbnailPanel>
    )
}

function Nav() {
    const { isEnd, isStart, next, prev } = useThumbnailPanelContext();

    const { handleNextClick, resourceId: nextResourceId } = next;
    const { handlePrevClick, resourceId: prevResourceId } = prev;

    return (
        <>
            <button onClick={handlePrevClick} disabled={isStart} data-id={prevResourceId}>
                Prev
            </button>
            <button onClick={handleNextClick} disabled={isEnd} data-id={nextResourceId}>
                Next
            </button>
        </>
    );
}

```

#### useThumbnailPanelContext()

Helper hook, details coming soon...

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
