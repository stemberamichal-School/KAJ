
// MARK: - Drawing shapes
class Rectangle extends SimpleShape {

    constructor() {
        super();
        this.origin = undefined;
    }

    drawIn(box, context) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        element.setAttribute("x", box.origin.x);
        element.setAttribute("y", box.origin.y);
        element.setAttribute("width", box.size.width);
        element.setAttribute("height", box.size.height);
        element.setAttribute("stroke", context.styles.strokeColor);
        element.setAttribute("fill", context.styles.fillColor);

        return element;
    }
}