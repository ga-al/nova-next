export type TickerDirection = "up" | "down";

export type TickerItem = {
  name: string;
  value: string;
  /** ISO date for <time dateTime> */
  dateTime: string;
  /** Display date shown in the ticker */
  time: string;
  change: string;
  direction: TickerDirection;
};

/** Sample market prices for the marquee (illustrative demo data). */
export const tickerData: TickerItem[] = [
  {
    name: "AISI 201 Welded",
    value: "$1400",
    dateTime: "2023-12-04",
    time: "04/12/2023",
    change: "+0.5%",
    direction: "up",
  },
  {
    name: "AISI 304 Welded",
    value: "$2170",
    dateTime: "2023-12-04",
    time: "04/12/2023",
    change: "-0.5%",
    direction: "down",
  },
  {
    name: "AISI 316",
    value: "$3895",
    dateTime: "2023-12-04",
    time: "04/12/2023",
    change: "+0.5%",
    direction: "up",
  },
];

/** Enough copies so one half stays wider than typical viewports. */
export const TICKER_COPIES_PER_HALF = 4;
