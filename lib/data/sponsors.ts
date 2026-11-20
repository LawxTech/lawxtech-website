export interface Sponsor {
  name: string;
  image: string;
  /** Organisations render as a logo; individuals render as a round headshot. */
  kind: "organisation" | "individual";
  websiteUrl?: string;
}

export interface SponsorGroup {
  label: string;
  sponsors: Sponsor[];
}

export const summitSponsorGroups: SponsorGroup[] = [
  {
    label: "Event Sponsors",
    sponsors: [
      {
        name: "Lawexa",
        image: "/assets/partners/lawexa.png",
        kind: "organisation",
        websiteUrl: "https://lawexa.com",
      },
      {
        name: "Rthrive",
        image: "/assets/sponsors/rthrive.png",
        kind: "organisation",
      },
      {
        name: "AirPockets Travels",
        image: "/assets/partners/airpockets-travels.png",
        kind: "organisation",
      },
      {
        name: "Chibudike Anene",
        image: "/assets/sponsors/chibudike-anene.jpg",
        kind: "individual",
      },
    ],
  },
  {
    label: "Tickets Sponsors",
    sponsors: [
      {
        name: "AirPockets Travels",
        image: "/assets/partners/airpockets-travels.png",
        kind: "organisation",
      },
      {
        name: "Riago Legal",
        image: "/assets/sponsors/riago-legal.png",
        kind: "organisation",
      },
      {
        name: "Dr. Rita George-Okoh",
        image: "/assets/sponsors/rita-george-okoh.jpg",
        kind: "individual",
      },
      {
        name: "Chioma Wilson-Dike",
        image: "/assets/sponsors/chioma-wilson-dike.jpg",
        kind: "individual",
      },
      {
        name: "Nonso Azih Esq",
        image: "/assets/sponsors/nonso-azih.jpg",
        kind: "individual",
      },
      {
        name: "Faith Victor Onyekwere",
        image: "/assets/sponsors/faith-victor-onyekwere.jpg",
        kind: "individual",
      },
    ],
  },
];
