import { createFileRoute } from "@tanstack/react-router";
import { AnimeMangaSection } from "@/components/AnimeMangaSection";

export const Route = createFileRoute("/anime-manga")({
  head: () => ({
    meta: [
      { title: "الأنمي والمانجا — أوتاكو" },
      {
        name: "description",
        content:
          "دليل قانوني 100% للأنمي والمانجا: أخبار AniList، مشاهدة عبر Crunchyroll/Netflix/Muse Asia، ومنصات المانجا الرسمية.",
      },
      { property: "og:title", content: "الأنمي والمانجا — أوتاكو" },
      {
        property: "og:description",
        content: "أخبار، مشاهدة، ومنصات رسمية للأنمي والمانجا.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap",
      },
    ],
  }),
  component: AnimeMangaPage,
});

function AnimeMangaPage() {
  return <AnimeMangaSection />;
}
