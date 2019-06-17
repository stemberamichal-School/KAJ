
// MARK: - Shape
class Shape {
    onmousedown(location, context) {
        ;
    }

    onmousemove(location, context) {
        ;
    }

    onmouseup(location, context) {
        ;
    }

    needsConfirmation() {
        return false;
    }

    canCancel() {
        return false;
    }

    cancel() {
        ;
    }
}

// MARK: - SimpleShape
class SimpleShape extends Shape {

    constructor() {
        super();
        this.origin = undefined;
    }

    onmousedown(location, context) {
        this.origin = location;
    }

    onmousemove(location, context) {
        const box = new Box(this.origin, location);
        return this.drawIn(box, context);
    }

    onmouseup(location, context) {
        const box = new Box(this.origin, location);
        this.origin = undefined;
        return this.drawIn(box, context);
    }

    drawIn(box, context) {
        ;
    }

    needsConfirmation() {
        return false;
    }

    canCancel() {
        return Boolean(this.origin);
    }

    cancel() {
        this.origin = undefined;
    }
}

// MARK: - Complex shape
class ComplexShape extends Shape {

    constructor() {
        super();
        this.locations = []
    }

    onmousedown(location, context) {
        if (this.locations.length == 0) {
            this.locations.push(location);
        } else {
            const tempLocations = [].concat(this.locations, [location]);
            return this.drawTemporary(tempLocations, context);
        }
    }

    onmousemove(location, context) {
        const tempLocations = [].concat(this.locations, [location]);
        return this.drawTemporary(tempLocations, context);
    }

    onmouseup(location, context) {
        this.locations.push(location);
        return this.drawTemporary(this.locations, context);
    }

    static stringFrom(locations) {
        return locations
            .map(p => p.x + "," + p.y)
            .join(" ");
    }

    drawTemporary(locations, context) {
        ;
    }

    drawPersistent(locations, context) {
        ;
    }

    needsConfirmation() {
        return true;
    }

    canConfirm() {
        return this.locations.length > 1;
    }

    confirm(context) {
        const element = this.drawPersistent(this.locations, context);
        this.locations = [];
        return element;
    }

    canCancel() {
        return this.locations.length > 0;
    }

    cancel() {
        this.locations = [];
    }
}
