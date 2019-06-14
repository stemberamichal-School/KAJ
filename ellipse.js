

// MARK: - Drawing shapes
class Ellipse {
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
            return this.drawCircleIn(box, context);
        }

        console.log("didSelectLocation");
    }

    didSelectTemporaryLocation(point, context) {
        if (this.origin) {
            const box = new Box(this.origin, point);
            return this.drawCircleIn(box, context);
        }

        console.log("didSelectTemporaryLocation");
    }

    drawCircleIn(box, context) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");

        element.setAttribute("cx", box.center().x);
        element.setAttribute("cy", box.center().y);
        element.setAttribute("rx", box.size.width / 2);
        element.setAttribute("ry", box.size.height / 2);
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