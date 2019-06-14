

// MARK: - Drawing shapes
class Rectangle {
    constructor() {
        this.origin = undefined;
        this.size = undefined;
    }

    didSelectLocation(point, context) {
        if(!this.origin) {
            this.origin = point;
        } else {
            const box = new Box(this.origin, point);
            this.origin = undefined;
            return this.drawRectangleIn(box, context);
        }

        console.log("didSelectLocation");
    }

    didSelectTemporaryLocation(point, context) {
        if (this.origin) {
            const box = new Box(this.origin, point);
            return this.drawRectangleIn(box, context);
        }

        console.log("didSelectTemporaryLocation");
    }

    drawRectangleIn(box, context) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        element.setAttribute("x", box.origin.x);
        element.setAttribute("y", box.origin.y);
        element.setAttribute("width", box.size.width);
        element.setAttribute("height", box.size.height);
        element.setAttribute("stroke", context.styles.strokeColor);
        element.setAttribute("fill", context.styles.fillColor);

        return element;
    }

    needsConfirmation() {
        return false;
    }

    canCancel() {
        return this.origin == true
    }

    cancel() {
        this.origin = undefined;
    }
}