export const CATALOG_FILE = "/files/catalog.pdf";
export const CATALOG_DOWNLOAD_NAME = "nova-metals-catalog.pdf";

export type SpecRow = {
  termKey: "diameter" | "wall" | "length" | "steel";
  value: string;
};

export type CatalogCard =
  | {
      id: "pipe1";
      kind: "specs";
      titleKey: "pipe1";
      specs: SpecRow[];
    }
  | {
      id: "pipe2" | "pipe3" | "pipe4";
      kind: "text";
      titleKey: "pipe2" | "pipe3" | "pipe4";
      textKey: "pipe2Text" | "pipe3Text" | "pipe4Text";
    };

export const catalogCards: CatalogCard[] = [
  {
    id: "pipe1",
    kind: "specs",
    titleKey: "pipe1",
    specs: [
      { termKey: "diameter", value: "6.0 – 375 mm" },
      { termKey: "wall", value: "0.5 – 4 mm" },
      { termKey: "length", value: "4000 / 6000 mm" },
      { termKey: "steel", value: "AISI 201, 304, 316L, 321, 430" },
    ],
  },
  {
    id: "pipe2",
    kind: "text",
    titleKey: "pipe2",
    textKey: "pipe2Text",
  },
  {
    id: "pipe3",
    kind: "text",
    titleKey: "pipe3",
    textKey: "pipe3Text",
  },
  {
    id: "pipe4",
    kind: "text",
    titleKey: "pipe4",
    textKey: "pipe4Text",
  },
];
