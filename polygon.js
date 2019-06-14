// MARK: - Drawing shapes
class Polygon {
    constructor() {
        this.points = [];
    }

    didSelectLocation(point, context) {
        console.log("didSelectLocation");

        this.points.push(point);

        if (this.points.length >= 2) {
            return this.drawPolyline(this.points, context);
        }
    }

    didSelectTemporaryLocation(point, context) {
        console.log("didSelectTemporaryLocation");

        if (this.points.length >= 1) {
            return this.drawPolyline([].concat(this.points, [point]), context);
        }
    }

    drawPolyline(points, context) {
        const pointsString = points
            .map(p => p.x + "," + p.y)
            .join(" ");

        console.log(pointsString);

        let element = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        element.setAttribute("points", pointsString);
        element.setAttribute("fill", "none");
        element.setAttribute("stroke", context.styles.strokeColor);

        return element;
    }

    drawPolygon(points, context) {
        const pointsString = points
            .map(p => p.x + "," + p.y)
            .join(" ");

        let element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        element.setAttribute("points", pointsString);
        element.setAttribute("stroke", context.styles.strokeColor);
        element.setAttribute("fill", context.styles.fillColor);

        return element;
    }

    canConfirm() {
        return this.points.length > 1;
    }

    confirm(context) {
        const element = this.drawPolygon(this.points, context);
        this.points = [];
        return element;
    }

    canCancel() {
        return this.points.length > 0;
    }

    cancel() {
        this.points = [];
    }

}