const colorOptions = {
    fillColors: ["black", "white", "red", "green", "blue", "yellow", "transparent"],
    fillColorOptionsId: "fill-color-options",
    strokeColors: ["black", "white", "red", "green", "blue", "yellow", "transparent"],
    strokeColorOptionsId: "stroke-color-options",
    colorAttribute: "data-color",
    selectedClassName: "selected",
    optionClassName: "color-option"
};

const context = {
    selectedShape: new Rectangle(),
    temporaryShape: undefined,
    currentTouch: undefined,
    styles: {
        fillColor: colorOptions.strokeColors[0],
        strokeColor: colorOptions.strokeColors[0],
    }
};

// MARK: - Prepare color pickers
window.onload = (event) => {
    const createColorOption = (color, selected, onclick) => {
        const option = document.createElement("li");
        option.setAttribute(colorOptions.colorAttribute, color);
        option.style.backgroundColor = color;
        option.className = colorOptions.optionClassName;
        if (selected) { option.classList.add(colorOptions.selectedClassName) }
        option.onclick = onclick;
        return option;
    };
    // MARK: - Prepare fill color options
    const fillOptions = document.getElementById(colorOptions.fillColorOptionsId);
    colorOptions.fillColors.forEach((color, i) => fillOptions.appendChild(createColorOption(color, i == 0, changeFillColor)));
    // MARK: - Prepare stroke color options
    const strokeOptions = document.getElementById(colorOptions.strokeColorOptionsId);
    colorOptions.strokeColors.forEach((color, i) => strokeOptions.appendChild(createColorOption(color, i == 0, changeStrokeColor)));

    setupDrawOptions();
};

window.onresize = (event) => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

function changeFillColor(event) {
    const color = event.target.getAttribute(colorOptions.colorAttribute);
    context.styles.fillColor = color;

    const allOptions = document.querySelectorAll("#" + colorOptions.fillColorOptionsId + " ." + colorOptions.optionClassName);
    allOptions.forEach(o => o.classList.remove(colorOptions.selectedClassName));
    event.target.classList.add(colorOptions.selectedClassName);
}

function changeStrokeColor(event) {
    const color = event.target.getAttribute(colorOptions.colorAttribute);
    context.styles.strokeColor = color;

    const allOptions = document.querySelectorAll("#" + colorOptions.strokeColorOptionsId + " ." + colorOptions.optionClassName);
    allOptions.forEach(o => o.classList.remove(colorOptions.selectedClassName));
    event.target.classList.add(colorOptions.selectedClassName);
}

// Changing shape

function changeShape(event, shape) {
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

    const allShapes = document.querySelectorAll(".shape-option.selected")
    allShapes.forEach(e => e.classList.remove("selected"));
    event.target.classList.add("selected");
}

// MARK: - Drawing
function onmousedownCanvas(sender, event) {
    if (context.temporaryShape) {
        sender.removeChild(context.temporaryShape);
        context.temporaryShape = undefined;
    }

    const location = normalizedClientLocation(sender, event);
    const element = context.selectedShape.onmousedown(location, context);

    if (element) {
        context.temporaryShape = element;
        sender.appendChild(element);
    }

    setupDrawOptions();
}

function onmousemoveCanvas(sender, event) {
    if (context.temporaryShape) {
        sender.removeChild(context.temporaryShape);
        context.temporaryShape = undefined;
    }

    const location = normalizedClientLocation(sender, event);
    const element = context.selectedShape.onmousemove(location, context);

    if (element) {
        context.temporaryShape = element;
        sender.appendChild(element);
    }

    setupDrawOptions();
}

function onmouseupCanvas(sender, event) {
    if (context.temporaryShape) {
        sender.removeChild(context.temporaryShape);
        context.temporaryShape = undefined;
    }

    const location = normalizedClientLocation(sender, event);
    const element = context.selectedShape.onmouseup(location, context);

    if (context.selectedShape.needsConfirmation()) {
        context.temporaryShape = element;
    } else if (element) {
        // TODO: adjust history
    }

    sender.appendChild(element);

    setupDrawOptions();
}

function ontouchstart(event) {
    console.log("ontouchstart");

    if (event.touches.length === 1) {
        const touch = event.touches[0];
        context.currentTouch = touch;
        onmousedownCanvas(touch.target, touch);
    }
}

function ontouchmove(event) {
    console.log("ontouchmove");

    const touch = context.currentTouch;
    if (!touch) {
        return;
    }
    const newTouch = newTouchFrom(event.touches, touch.identifier);
    if(newTouch) {
        context.currentTouch = newTouch;
        onmousemoveCanvas(newTouch.target, newTouch);
    }
}

function ontouchend(event) {
    console.log("ontouchend");

    const touch = context.currentTouch;
    if (!touch) {
        return;
    }
    const newTouch = newTouchFrom(event.touches, touch.identifier);
    if(!newTouch) {
        context.currentTouch = undefined;
        onmouseupCanvas(touch.target, touch);
    }
}

function newTouchFrom(touches, id) {
    let i;
    for (i = 0; i < touches.length; i++) {
        if (id === touches[i].identifier) {
            return touches[i];
        }
    }
}

function setupDrawOptions() {
    const shape = context.selectedShape;
    const confirmOption = document.querySelector(".draw-option.confirm");
    const confirmVisible = shape.needsConfirmation() && shape.canConfirm();
    confirmOption.hidden = !confirmVisible;

    const cancelOption = document.querySelector(".draw-option.cancel");
    const cancelVisible = shape.canCancel();
    cancelOption.hidden = !cancelVisible;

    console.log("setupDrawOptions");
    if (confirmVisible) { console.log("Confirm visible"); }
    if (cancelVisible) { console.log("Cancel visible"); }
}

function confirm() {
    if (!context.selectedShape.needsConfirmation()) {
        return;
    }

    const element = context.selectedShape.confirm(context);
    const canvas = document.getElementById("canvas");
    canvas.appendChild(element);

    if (context.temporaryShape) {
        canvas.removeChild(context.temporaryShape);
        context.temporaryShape = undefined;
    }

    // TODO: Adjust history

    setupDrawOptions();
}

function cancel() {
    if (!context.selectedShape.canCancel()) {
        return;
    }

    const canvas = document.getElementById("canvas");
    context.selectedShape.cancel();

    if (context.temporaryShape) {
        canvas.removeChild(context.temporaryShape);
        context.temporaryShape = undefined;
    }

    setupDrawOptions();
}

function testSquare() {
    let canvas = document.getElementById("canvas");
    let square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    square.setAttribute("x", 20);
    square.setAttribute("y", 20);
    square.setAttribute("width", 50);
    square.setAttribute("height", 50);
    square.setAttribute("stroke", context.styles.strokeColor);
    square.setAttribute("fill", context.styles.fillColor);
    canvas.appendChild(square);
}