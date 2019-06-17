
// MARK: - Drawing shapes
class Polyline extends ComplexShape {

    constructor() {
        super();
    }

    drawTemporary(locations, context) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        element.setAttribute("points", Polyline.stringFrom(locations));
        element.setAttribute("fill", "none");
        element.setAttribute("stroke", context.styles.strokeColor);

        return element;
    }

    drawPersistent(locations, context) {
        return this.drawTemporary(locations, context);
    }
}