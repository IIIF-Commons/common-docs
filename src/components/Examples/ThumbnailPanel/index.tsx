import "@site/node_modules/@iiif/thumbnail-panel/dist/style.css";

import React from "react";
import {
  ThumbnailPanel,
  IIIFContentProvider,
  useThumbnailPanelContext,
} from "@iiif/thumbnail-panel";

export default function ExampleThumbnailPanel() {
  return (
    <IIIFContentProvider>
      <Navigation />
      <div style={{ width: "100%", overflow: "scroll", padding: "1rem" }}>
        <ThumbnailPanel
          iiifContent="https://digirati-co-uk.github.io/wunder.json"
          orientation="horizontal"
          overrides={{ thumbnailSize: 120 }}
        />
      </div>
    </IIIFContentProvider>
  );
}

function Navigation() {
  const {
    state: { isEnd, isStart, next, prev },
  } = useThumbnailPanelContext();
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        <button
          onClick={prev?.handlePrevClick}
          disabled={isStart}
          data-id={prev?.resourceId}
        >
          Prev
        </button>
        <button
          onClick={next?.handleNextClick}
          disabled={isEnd}
          data-id={next?.resourceId}
        >
          Next
        </button>
      </div>
    </>
  );
}
