import * as fabric from "fabric";

export const customControls = (object) => {
  object.set({
    padding: 8,
    cornerColor: "black",
    cornerStrokeColor: "black",
    borderColor: "black",
    cornerStyle: "circle",
  });

  // rotate------------------------------------------------------------------------

  // use ngrok
  // with bug
  object.controls.tl = new fabric.Control({
    x: -0.5, // Horizontal position
    y: -0.5, // Vertical position
    offsetX: -15, // Move 4px away from the left
    offsetY: -1, // Move 4px away from the top
    cursorStyle: "pointer",
    actionHandler: fabric.controlsUtils.rotationWithSnapping, // Change to rotation
    actionName: "rotate", // Action name for rotation
    render: (ctx, left, top) => {
      const size = 24;
      const img = new Image();
      img.src = "/src/assets/rotate.svg"; // Replace with your custom icon path

      img.onload = () => {
        ctx.drawImage(img, left - size / 2, top - size / 2, size, size);
      };

      // Check if the image has already loaded
      if (img.complete) {
        ctx.drawImage(img, left - size / 2, top - size / 2, size, size);
      }
    },
    cornerSize: 24, // Size of the control point
  });

  // without bug
  // const rotateIcon = new Image();
  // rotateIcon.src = "/src/assets/rotate.svg"; // Path to your rotate icon

  // object.controls.tl = new fabric.Control({
  //   x: -0.5, // Horizontal position
  //   y: -0.5, // Vertical position
  //   offsetX: -15, // Move 15px away from the left
  //   offsetY: -1, // Move 1px away from the top
  //   cursorStyle: "pointer",
  //   actionHandler: fabric.controlsUtils.rotationWithSnapping, // Change to rotation
  //   actionName: "rotate", // Action name for rotation

  //   render: (ctx, left, top) => {
  //     const size = 24; // Icon size

  //     // Ensure the image is fully loaded before rendering
  //     if (rotateIcon.complete) {
  //       ctx.save();

  //       // Draw the rotate icon at the specified position (centered)
  //       ctx.drawImage(rotateIcon, left - size / 2, top - size / 2, size, size);

  //       ctx.restore();
  //     } else {
  //       // Fallback rendering while the icon is loading
  //       ctx.fillStyle = "blue"; // Placeholder color
  //       ctx.fillRect(left - size / 2, top - size / 2, size, size); // Placeholder rectangle
  //     }
  //   },
  //   cornerSize: 24, // Size of the control point
  // });

  // // Preload the rotate icon image to ensure it's ready when needed
  // rotateIcon.onload = function () {
  //   // Optionally trigger a canvas refresh to ensure the icon is rendered
  //   object.canvas.renderAll();
  // };

  // cancel------------------------------------------------------------------------
  const cancelIcon = new Image();
  cancelIcon.src = "/src/assets/cancel.svg"; // Path to your cancel icon

  object.controls.tr = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -1,
    offsetX: 18,
    cursorStyle: "pointer",
    render: (ctx, left, top) => {
      // Ensure the image is fully loaded before rendering
      if (cancelIcon.complete) {
        ctx.save();

        // Draw the cancel icon at the specified position (centered)
        ctx.drawImage(cancelIcon, left - 12, top - 12, 24, 24);

        ctx.restore();
      } else {
        // Fallback rendering while the icon is loading
        ctx.fillStyle = "red"; // Placeholder color
        ctx.fillRect(left - 12, top - 12, 24, 24); // Placeholder rectangle
      }
    },
    cornerSize: 24,

    // Add click functionality to remove the object
    mouseUpHandler: function (eventData, transform, x, y) {
      const target = transform.target; // Reference to the clicked object
      const canvas = target.canvas; // Reference to the canvas

      canvas.remove(target); // Remove the object from the canvas
      canvas.renderAll(); // Re-render the canvas
      return true; // Return true to finalize the mouse action
    },
  });

  // Preload the cancel icon image to ensure it's ready when needed
  cancelIcon.onload = function () {
    // Optionally trigger a canvas refresh to ensure the icon is rendered
    object.canvas.renderAll();
  };

  // Ensure the canvas updates the control positions correctly
  object.on("modified", function () {
    this.setCoords(); // Update coordinates for correct control positions
  });

  // doubleArrow-------------------------------------------------------------------------
  const resizeIcon = new Image();
  resizeIcon.src = "/src/assets/doubleArrow.svg";

  object.controls.bl = new fabric.Control({
    x: -0.5,
    y: 0.5,
    offsetX: -15,
    offsetY: 0,
    cursorStyle: "ew-resize",
    render: (ctx, left, top) => {
      const size = 24;
      const rotationAngle = -45 * (Math.PI / 180);

      // Ensure the image is fully loaded before rendering
      if (resizeIcon.complete) {
        ctx.save();

        // Move the context origin and apply rotation
        ctx.translate(left, top);
        ctx.rotate(rotationAngle);

        // Draw the image
        ctx.drawImage(resizeIcon, -size / 2, -size / 2, size, size);

        // Restore the context
        ctx.restore();
      } else {
        // Fallback or placeholder while the image is loading
        // You can draw a simple rectangle, circle, or any temporary shape here
        ctx.fillStyle = "gray";
        ctx.fillRect(left - size / 2, top - size / 2, size, size);
      }
    },
    cornerSize: 24,
    actionHandler: fabric.controlsUtils.scalingEqually,
    actionName: "scaleX",
  });

  // Preload image to ensure it's ready when needed
  resizeIcon.onload = function () {
    // Optionally trigger a canvas refresh to ensure the icon is rendered
    object.canvas.renderAll();
  };

  object.setControlsVisibility({
    tl: true,
    tr: true,
    bl: true,
    br: false,
    mt: false,
    mb: false,
    ml: false,
    mr: false,
  });

  delete object.controls.mtr;
};
