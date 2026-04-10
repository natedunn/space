import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

const documentKind = v.union(
  v.literal('page'),
  v.literal('writing'),
  v.literal('project'),
  v.literal('note'),
)

const documentStatus = v.union(
  v.literal('draft'),
  v.literal('published'),
  v.literal('archived'),
)

const navigationLocation = v.union(
  v.literal('header'),
  v.literal('footer'),
  v.literal('home'),
)

export default defineSchema({
  siteSettings: defineTable({
    siteTitle: v.string(),
    siteDescription: v.string(),
    homeHeadline: v.string(),
    homeIntro: v.string(),
    statusMessage: v.optional(v.string()),
    availableForWork: v.boolean(),
    updatedAt: v.number(),
  }).index('by_updatedAt', ['updatedAt']),

  navigationItems: defineTable({
    location: navigationLocation,
    label: v.string(),
    href: v.string(),
    order: v.number(),
    visible: v.boolean(),
    updatedAt: v.number(),
  })
    .index('by_location', ['location'])
    .index('by_location_order', ['location', 'order']),

  documents: defineTable({
    kind: documentKind,
    status: documentStatus,
    slug: v.string(),
    title: v.string(),
    summary: v.optional(v.string()),
    body: v.string(),
    tags: v.array(v.string()),
    featured: v.boolean(),
    publishedAt: v.optional(v.number()),
    updatedAt: v.number(),
    createdAt: v.number(),
  })
    .index('by_slug', ['slug'])
    .index('by_kind', ['kind'])
    .index('by_status', ['status'])
    .index('by_kind_status', ['kind', 'status'])
    .index('by_updatedAt', ['updatedAt'])
    .index('by_publishedAt', ['publishedAt']),
})
