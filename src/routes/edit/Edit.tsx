import * as React from "react";
import { useState } from "react";

import ImageEditor from "@toast-ui/react-image-editor";
import ImageEditorClass from "tui-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

const theme = {
  "common.bi.image":
  "https://i.pinimg.com/originals/5e/38/39/5e3839b3a6c248f9b7d794bf1ef67cf5.jpg",
  "common.bisize.width": "50px",
  "common.bisize.height": "50px",
  "common.backgroundImage": "none",
  "common.backgroundColor": "#1e1e1e",
  "common.border": "0px",

  // header
  "header.backgroundImage": "none",
  "header.backgroundColor": "transparent",
  "header.border": "0px",

  // load button
  "loadButton.backgroundColor": "#fff",
  "loadButton.border": "1px solid #ddd",
  "loadButton.color": "#222",
  "loadButton.fontFamily": "NotoSans, sans-serif",
  "loadButton.fontSize": "12px",

  // download button
  "downloadButton.backgroundColor": "#fdba3b",
  "downloadButton.border": "1px solid #fdba3b",
  "downloadButton.color": "#fff",
  "downloadButton.fontFamily": "NotoSans, sans-serif",
  "downloadButton.fontSize": "12px",

  // icons default
  "menu.normalIcon.color": "#8a8a8a",
  "menu.activeIcon.color": "#555555",
  "menu.disabledIcon.color": "#434343",
  "menu.hoverIcon.color": "#e9e9e9",
  "submenu.normalIcon.color": "#8a8a8a",
  "submenu.activeIcon.color": "#e9e9e9",

  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",
  "submenu.iconSize.width": "32px",
  "submenu.iconSize.height": "32px",

  // submenu primary color
  "submenu.backgroundColor": "#1e1e1e",
  "submenu.partition.color": "#858585",

  // submenu labels
  "submenu.normalLabel.color": "#858585",
  "submenu.normalLabel.fontWeight": "lighter",
  "submenu.activeLabel.color": "#fff",
  "submenu.activeLabel.fontWeight": "lighter",

  // checkbox style
  "checkbox.border": "1px solid #ccc",
  "checkbox.backgroundColor": "#fff",

  // rango style
  "range.pointer.color": "#fff",
  "range.bar.color": "#666",
  "range.subbar.color": "#d1d1d1",

  "range.disabledPointer.color": "#414141",
  "range.disabledBar.color": "#282828",
  "range.disabledSubbar.color": "#414141",

  "range.value.color": "#fff",
  "range.value.fontWeight": "lighter",
  "range.value.fontSize": "11px",
  "range.value.border": "1px solid #353535",
  "range.value.backgroundColor": "#151515",
  "range.title.color": "#fff",
  "range.title.fontWeight": "lighter",

  // colorpicker style
  "colorpicker.button.border": "1px solid #1e1e1e",
  "colorpicker.title.color": "#fff",
};

interface EditProps {
  imgUrl?: string;
}

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

export default function Edit({ imgUrl }: EditProps) {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const editorRef = React.createRef<ImageEditorClass>();

  React.useEffect(() => {
    const handleWindowResize = () => {
      const newWinSize = getWindowSize();
      setWindowSize((curWinSize) => ({ ...curWinSize, ...newWinSize }));
      editorRef.current?.ui?.resizeEditor({
        uiSize: {
          width: `${newWinSize.innerWidth - 100}px`,
          height: `${newWinSize.innerHeight - 100}px`,
        },
      });
      // editorRef.current?.resizeCanvasDimension({
      //   width: newWinSize.innerWidth - 100,
      //   height: newWinSize.innerHeight - 100,
      // });
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize, editorRef]);

  return (
    <ImageEditor
      includeUI={{
        loadImage: {
          path: imgUrl ?? "",
          name: "SampleImage",
        },
        theme,
        //menu: ["shape", "filter"],
        initMenu: "filter",
        uiSize: {
          width: `${windowSize.innerWidth - 100}px`,
          height: `${windowSize.innerHeight - 100}px`,
        },
        menuBarPosition: "bottom",
      }}
      cssMaxHeight={500}
      cssMaxWidth={700}
      selectionStyle={{
        cornerSize: 20,
        rotatingPointOffset: 70,
      }}
      usageStatistics={true}
      ref={editorRef}
    />
  );
}
