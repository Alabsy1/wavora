import { categories } from "@/data/categories";
import type { CategorySlug } from "@/types";
import { CategoryCard } from "@/components/category-card";
import { SectionHeading } from "@/components/section-heading";
import type { SiteFlags } from "@/lib/site-data";
import { isNavEnabled } from "@/lib/site-data";

const spans: Record<CategorySlug, string> = {
  sea: "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  adventure: "lg:col-span-5",
  stays: "lg:col-span-5",
  spots: "lg:col-span-4",
  eats: "lg:col-span-4",
  experiences: "lg:col-span-4",
};

interface DiscoverySectionProps {
  flags: SiteFlags;
}

export function DiscoverySection({ flags }: DiscoverySectionProps) {
  const visibleCategories = categories.filter((cat) => isNavEnabled(flags, cat.slug));

  if (visibleCategories.length === 0) return null;

  return (
    <section id="discover" className="container-w py-20 sm:py-28">
      <SectionHeading
        eyebrow="Discover"
        title="WHAT ARE YOU IN THE MOOD FOR?"
        description={`${visibleCategories.length} door${visibleCategories.length !== 1 ? "s" : ""} into the Red Sea. Pick a direction — we'll handle the rest.`}
      />
      <div className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-5 sm:auto-rows-[280px] sm:grid-cols-2 lg:auto-rows-[240px] lg:grid-cols-12">
        {visibleCategories.map((category, i) => (
          <CategoryCard
            key={category.slug}
            category={category}
            index={i}
            className={spans[category.slug]}
            priority={i < 2}
          />
        ))}
      </div>
    </section>
  );
}
