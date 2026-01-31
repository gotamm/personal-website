interface Talk {
  id: number;
  title: string;
  subTitle: string;
  event: string;
  date: Date;
  link: string;
}
const TALKS: Talk[] = [
  {
    id: 1,
    event: "SH Branches - SH meets Mollie",
    title: "Level Up Your E2E Tests",
    subTitle: "AI-driven testing with Playwright, MCP, and Agents",
    date: new Date("2026-01-28"),
    link: "https://www.eventbrite.it/e/sh-branches-sh-meets-mollie-tickets-1980452489709",
  },
];

export const getTalks = () => {
  return TALKS;
};
