
// MARK: - Drawing shapes
class Polygon extends ComplexShape {
    constructor() {
        super();
    }

    drawTemporary(locations, context) {

        let element = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        element.setAttribute("points", Polygon.stringFrom(locations));
        element.setAttribute("fill", "none");
        element.setAttribute("stroke", context.styles.strokeColor);

        return element;
    }

    drawPersistent(locations, context) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        element.setAttribute("points", Polygon.stringFrom(locations));
        element.setAttribute("stroke", context.styles.strokeColor);
        element.setAttribute("fill", context.styles.fillColor);

        return element;
    }
}