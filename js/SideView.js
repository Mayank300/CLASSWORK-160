AFRAME.RegisterCOmponent("place-side-view", {
  init: function () {
    this.createPlaces();
  },

  tick: function () {
    const placeContainer = document.querySelector("#place-container");
    const { state } = placeContainer.getAttribute("tour");
    if (state === "view" || state === "change-view") {
      this.el.setAttribute("visible", true);
    } else {
      this.el.setAttribute("visible", false);
    }
  },

  createPlaces: function () {
    const sideViewContainer = document.querySelector("#side-view-container");
    var xPos = -150;
    var yPos = 30;

    for (var i = 1; 1 <= 4; i++) {
      const position = {
        x: (xPos += 50),
        y: (yPos += 2),
        z: -40,
      };
      const entityEl = this.createPlacesThumbnail(position, i);
      sideViewContainer.appendChild(entityEl);
    }
  },

  createPlacesThumbnail: function (position, i) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("id", `place${i}`);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 3,
    });
    entityEl.setAttribute("material", {
      src: "./assets/helicopter.png",
      opacity: 1,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("cursor-listener", {});
  },
});
