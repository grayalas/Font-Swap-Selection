figma.showUI(__html__, { width: 240, height: 340 });

async function changeFont(node, fontFamily) {
  if (node.type === "TEXT") {
    // Load the font before applying it
    await figma.loadFontAsync({ family: fontFamily, style: "Regular" });
    node.fontName = { family: fontFamily, style: "Regular" };
  }

  if ("children" in node) {
    for (const child of node.children) {
      await changeFont(child, fontFamily);
    }
  }
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "apply-font") {
    const nodes = figma.currentPage.selection;
    const fontFamily = msg.fontFamily;

    if (nodes.length === 0) {
      figma.notify("Please select a layer group.");
    } else {
      for (const node of nodes) {
        await changeFont(node, fontFamily);
      }
      figma.notify("Font has been applied successfully.");
      figma.ui.close();
    }
  }
};
