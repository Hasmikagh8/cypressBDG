class JQueryUIMenus {
  NAMES = {
    contentText: "JQuery UI Menus",
    menuTitle: "JQueryUI - Menu",
    jqueryTitle: "JQuery UI",
    menuText:
      "JQuery UI Menus are a nice UI element from a user perspective, but poses an interesting automation challenge since it requires mouse operations and synchronization between them.",
    jQueryText:
      "is many things, but one thing specifically that causes automation challenges is their set of Widgets",
    menuLinkName: "menu",
    jQuerylinkName: "jqueryui",
    csvPath: "/downloads/menu.csv",
  };

  LOCATORS={enabled: "Enabled",
    disabled: "Disabled",
    downlaods: "Downloads",
    backToJQueryUI: "Back to JQuery UI",
    files: { pdf: "PDF", csv: "CSV", excel: "Excel" },
    disabledID: "#ui-id-1",
    description:".description",
  };
}

export const jQueryUIMenus = new JQueryUIMenus();
