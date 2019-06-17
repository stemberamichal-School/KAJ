

// MARK: - Drawing shapes
class Circle extends SimpleShape {

    constructor() {
        super();
        this.origin = undefined;
    }

    drawIn(box, context) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        element.setAttribute("cx", box.center().x);
        element.setAttribute("cy", box.center().y);
        element.setAttribute("r", box.size.diagonal() / 2);
        element.setAttribute("stroke", context.styles.strokeColor);
        element.setAttribute("fill", context.styles.fillColor);

        return element;
    }
}