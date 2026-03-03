import React from "react";
import { Link } from "react-router-dom";

/**
 * Ultra Premium Food Card (Foodie Theme)
 * - Stronger modern look: glass ring, glow, hover tilt, shimmer
 * - Better hierarchy: title + short meta, “Starting from” price chip
 * - Micro-interactions: lift + image zoom + button glow
 * - Safe defaults
 */

const FoodCard = ({ food }) => {
  if (!food) return null;

  const { id, name, price, image, category } = food;

  return (
    <article className="group relative h-full">
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-r from-foodie-primary/25 via-foodie-accent/15 to-foodie-primary/25 blur-xl opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Card */}
      <div className="relative h-full overflow-hidden rounded-[28px] border border-foodie-border bg-foodie-card shadow-foodie2 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-foodie">
        {/* Image area */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name || "Food Item"}
            className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.10]"
            loading="lazy"
          />

          {/* Premium overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_55%)]" />

          {/* Shimmer */}
          <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-white/20 opacity-0 blur-md transition duration-700 group-hover:translate-x-[220%] group-hover:opacity-100" />

          {/* Category chip */}
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/90 px-3 py-1 text-[11px] font-extrabold text-foodie-ink shadow-sm">
              <span className="h-2 w-2 rounded-full bg-foodie-primary" />
              {category || "Category"}
            </span>
          </div>

          {/* Price chip */}
          <div className="absolute bottom-4 right-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-foodie-primary to-foodie-accent px-4 py-2 text-xs font-extrabold text-white shadow-lg">
              <span className="opacity-90">From</span>
              <span className="text-sm">${price ?? 0}</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-extrabold tracking-tight text-foodie-ink">
                {name || "Food Name"}
              </h3>
              <p className="mt-1 text-sm text-foodie-text">
                Chef-made • Fresh ingredients • Premium taste
              </p>
            </div>

            {/* Small “rating” pill (UI-only) */}
            <div className="shrink-0 rounded-full border border-foodie-border bg-foodie-bg2 px-3 py-1 text-xs font-bold text-foodie-ink">
              ⭐ 4.8
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-foodie-border" />

          {/* Bottom actions */}
          <div className="flex items-center gap-3">
            <Link
              to={`/menu/food/${id ?? 0}`}
              className="relative inline-flex flex-1 items-center justify-center rounded-2xl bg-foodie-ink px-4 py-2.5 text-sm font-extrabold text-white shadow-foodie2 transition hover:opacity-95 active:scale-[0.99]"
            >
              View Details
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 18l6-6-6-6"
                />
              </svg>
            </Link>

            {/* Secondary mini button (nice modern touch) */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-foodie-border bg-foodie-bg2 px-3 py-2.5 text-sm font-extrabold text-foodie-primary transition hover:bg-foodie-bg active:scale-[0.99]"
              aria-label="Quick view"
              onClick={() => {}}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-foodie-primary to-foodie-accent opacity-70" />
      </div>
    </article>
  );
};

export default FoodCard;