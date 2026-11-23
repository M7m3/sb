"use client";

import Image from "next/image";
import { SectionHead } from "@/components/editorial/SectionHead";
import { Reveal } from "@/components/Reveal";
import { KeyCut } from "@/components/brand/KeyCut";
import { ArrowIcon } from "@/components/brand/Icons";
import { CompactList } from "./CompactList";
import { MasterKeyTree } from "./MasterKeyTree";
import { images, type ImageSlot } from "@/content/images";
import { businessBento as b } from "@/content/locksmith-sections";
import { bookService } from "@/lib/serviceSelection";
import type { SectionCopy, ServiceGroup } from "@/content/types";

const tile = "group relative block overflow-hidden border border-light-ink/15 bg-surface";

function PhotoTile({ slot, label, slug, className }: { slot: ImageSlot; label: string; slug: string; className: string }) {
  return (
    <a
      href={`/?service=${slug}#book`}
      onClick={(e) => {
        e.preventDefault();
        bookService(slug);
      }}
      className={`${tile} ${className}`}
    >
      <Image src={slot.src} alt={slot.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-scrim/75 via-scrim/10 to-transparent" />
      <span className="t-label absolute inset-x-4 bottom-3 text-ink">{label}</span>
    </a>
  );
}

/** 03 / BUSINESS. Bento grid of photo and type tiles, then the master key tree. */
export function BusinessSection({ group, copy }: { group: ServiceGroup; copy: SectionCopy }) {
  return (
    <section id={group.id} className="sec-light scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <SectionHead {...copy} tone="light" />
        </Reveal>

        <Reveal className="mt-10 lg:mt-14">
          <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-3 sm:auto-rows-[minmax(190px,auto)] lg:grid-cols-4 lg:gap-4">
            <PhotoTile slot={images.business.storefront} label={b.storefront.label} slug={b.storefront.slug} className="col-span-2 lg:row-span-2" />
            <PhotoTile slot={images.business.access} label={b.access.label} slug={b.access.slug} className="" />
            <PhotoTile slot={images.business.cctv} label={b.cctv.label} slug={b.cctv.slug} className="" />

            {/* Type tile */}
            <a
              href={`/?service=${b.lockout.slug}#book`}
              onClick={(e) => {
                e.preventDefault();
                bookService(b.lockout.slug);
              }}
              className={`${tile} flex flex-col justify-between bg-light-ink p-4 text-ink`}
            >
              <KeyCut name={b.lockout.slug} size={88} animate className="text-accent-light" />
              <span>
                <span className="t-row-title block">{b.lockout.title}</span>
                <span className="t-small mt-1 flex items-center gap-2 text-ink/75">
                  {b.lockout.line} <ArrowIcon size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </a>

            <PhotoTile slot={images.business.pushBar} label={b.pushBar.label} slug={b.pushBar.slug} className="" />

            {/* Master key tree */}
            <div className={`${tile} col-span-2 bg-transparent p-4 sm:p-6 lg:col-span-4`}>
              <p className="t-label text-accent-on-light">{b.tree.label}</p>
              <div className="mx-auto mt-2 max-w-3xl">
                <MasterKeyTree labels={b.tree.keys} />
              </div>
              <p className="t-lead mt-2 text-center text-light-muted">{b.tree.caption}</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <CompactList items={group.items} tone="light" />
        </Reveal>
      </div>
    </section>
  );
}
