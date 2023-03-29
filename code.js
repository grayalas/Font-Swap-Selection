"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 240, height: 340 });
function changeFont(node, fontFamily) {
    return __awaiter(this, void 0, void 0, function* () {
        if (node.type === "TEXT") {
            // Load the font before applying it
            yield figma.loadFontAsync({ family: fontFamily, style: "Regular" });
            node.fontName = { family: fontFamily, style: "Regular" };
        }
        if ("children" in node) {
            for (const child of node.children) {
                yield changeFont(child, fontFamily);
            }
        }
    });
}
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === "apply-font") {
        const nodes = figma.currentPage.selection;
        const fontFamily = msg.fontFamily;
        if (nodes.length === 0) {
            figma.notify("Please select a layer group.");
        }
        else {
            for (const node of nodes) {
                yield changeFont(node, fontFamily);
            }
            figma.notify("Font has been applied successfully.");
            figma.ui.close();
        }
    }
});
