
// MARK: - Drawing shapes
class Ellipse extends SimpleShape {

    constructor() {
        super();
        this.origin = undefined;
    }

    drawIn(box, context) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");

        element.setAttribute("cx", box.center().x);
        element.setAttribute("cy", box.center().y);
        element.setAttribute("rx", box.size.width / 2);
        element.setAttribute("ry", box.size.height / 2);
        element.setAttribute("stroke", context.styles.strokeColor);
        element.setAttribute("fill", context.styles.fillColor);

        return element;
    }
}