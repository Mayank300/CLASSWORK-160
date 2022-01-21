AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
  },

  init: function () {
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvent();
    this.handleClickEvent();
  },

  handleClickEvent: function () {
    this.el.addEventListener("click", (e) => {
      const placeContainer = document.querySelector("#places-container");
      const { state } = placeContainer.getAttribute("tour");
      if (state === "places-list") {
        const id = this.el.getAttribute("id");
        const placeId = [
          "taj-mahal",
          "budapest",
          "eiffel-tower",
          "new-york-city",
        ];
        if (placeId.includes(id)) {
          placeContainer.setAttribute("tour", {
            state: "view",
            selectedCard: id,
          });
        }
      }

      if (state === "view" || state === "change-view") {
        this.handleViewState();
      }
    });
  },

  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placeId = ["taj-mahal", "budapest", "eiffel-tower", "new-york-city"];
    if (placeId.includes(id)) {
      const placeHolderContainer = document.querySelector("#places-container");
      placeHolderContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
      });
      this.el.setAttribute("material", {
        color: "red",
        opacity: 1,
      });
    }
  },

  handleMouseEnterEvents: function () {
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
    });
  },

  handleMouseLeaveEvent: function () {
    this.el.addEventListener("mouseleave", () => {
      const { selectedItemId } = this.data;
      if (selectedItemId) {
        const el = document.querySelector(`#${selectedItemId}`);
        const id = el.getAttribute("id");
        if (id === selectedItemId) {
          el.setAttribute("material", {
            color: "black",
            opacity: 1,
          });
        }
      }
    });
  },

  handleViewState: function () {
    const id = this.el.getAttribute("id");
    const placeContainer = document.querySelector("#place-container");
    const { selectedItemId } = placeContainer.getAttribute("cursor-listener");
    const sideViewPlacesId = ["place1", "place2", "place3", "place4"];
    if (sideViewPlacesId.includes(id)) {
      placeContainer.setAttribute("tour", { state: "change-view" });
    }
    var skyEl = document.querySelector("#main-container");
    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedItemId}/${id}.jpg`,
      color: "white",
    });
  },
});
