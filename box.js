
// MARK: - Point
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// MARK: - Size
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    diagonal() {
        return Math.sqrt(this.width * this.width + this.height * this.height);
    }
}

// MARK: - Box
class Box {
    constructor(point1, point2) {

        let minX = Math.min(point1.x, point2.x);
        let minY = Math.min(point1.y, point2.y);
        let maxX = Math.max(point1.x, point2.x);
        let maxY = Math.max(point1.y, point2.y);

        this.origin = new Point(minX, minY);
        this.size = new Size(maxX - minX, maxY - minY);


    }

    center() {
        return new Point(this.origin.x + this.size.width / 2, this.origin.y + this.size.height / 2);
    }

    rightBottom() {
        return new Point(this.origin.x + this.size.width, this.origin.y + this.size.height);
    }
}

// MARK: - Translating location coordinates
function normalizedClientLocation(sender, event) {
    const x = event.clientX - sender.getBoundingClientRect().left;
    const y = event.clientY - sender.getBoundingClientRect().top;

    return new Point(x, y);
}