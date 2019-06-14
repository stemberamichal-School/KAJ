const context = {
    selectedShape: new Rectangle(),
    temporaryShape: undefined,
    styles: {
        strokeColor: "red",
        fillColor: "red",
    }
};

// MARK: - Settings
function changeStrokeColor(color) {
    context.styles.strokeColor = color;
}

function changeFillColor(color) {
    context.styles.fillColor = color;
}

function changeShape(shape) {
    switch (shape) {

        case "circle":
            context.selectedShape = new Circle();
            break;
        case "ellipse":
            context.selectedShape = new Ellipse();
            break;
        case "polygon":
            context.selectedShape = new Polygon();
            break;
        case "polyline":
            context.selectedShape = new Polyline();
            break;
        case "rectangle":
        default:
            context.selectedShape = new Rectangle();
            break;
    }
}

// MARK: - Drawing
function onclickCanvas(sender, event) {
    const location = normalizedClientLocation(sender, event);
    const element = context.selectedShape.didSelectLocation(location, context);

    if (context.selectedShape.needsConfirmation()) {
        context.temporaryShape = element;
    }

    if (element) {
        sender.appendChild(element);
        // TODO: adjust history
    }
}

function onmousemoveCanvas(sender, event) {
    if (context.temporaryShape) {
        sender.removeChild(context.temporaryShape);
    }

    const location = normalizedClientLocation(sender, event);
    const element = context.selectedShape.didSelectTemporaryLocation(location, context);

    if (element) {
        sender.appendChild(element);
    }

    context.temporaryShape = element;
}

function confirm() {
    const element = context.selectedShape.confirm(context);
    const canvas = document.getElementById("canvas");
    canvas.appendChild(element);

    if (context.temporaryShape) {
        canvas.removeChild(context.temporaryShape);
        context.temporaryShape = undefined;
    }

    // TODO: Adjust history
}

function cancel() {
    const canvas = document.getElementById("canvas");
    context.selectedShape.cancel();

    if (context.temporaryShape) {
        canvas.removeChild(context.temporaryShape);
        context.temporaryShape = undefined;
    }
}