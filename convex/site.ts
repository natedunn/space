import { mutationGeneric, queryGeneric } from 'convex/server'
import { v } from 'convex/values'

const locationValidator = v.union(
  v.literal('header'),
  v.literal('footer'),
  v.literal('home'),
)

function sortByOrder<T extends { order: number }>(items: T[]) {
  return items.sort((a, b) => a.order - b.order)
}

export const getSiteShell = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const [settings] = await ctx.db
      .query('siteSettings')
      .withIndex('by_updatedAt')
      .order('desc')
      .take(1)

    const header = await ctx.db
      .query('navigationItems')
      .withIndex('by_location', (q) => q.eq('location', 'header'))
      .collect()

    const footer = await ctx.db
      .query('navigationItems')
      .withIndex('by_location', (q) => q.eq('location', 'footer'))
      .collect()

    return {
      settings: settings ?? null,
      navigation: {
        header: sortByOrder(header),
        footer: sortByOrder(footer),
      },
    }
  },
})

export const upsertSiteSettings = mutationGeneric({
  args: {
    siteTitle: v.string(),
    siteDescription: v.string(),
    homeHeadline: v.string(),
    homeIntro: v.string(),
    statusMessage: v.optional(v.string()),
    availableForWork: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const [existing] = await ctx.db
      .query('siteSettings')
      .withIndex('by_updatedAt')
      .order('desc')
      .take(1)

    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: now })
      return existing._id
    }

    return await ctx.db.insert('siteSettings', {
      ...args,
      updatedAt: now,
    })
  },
})

export const replaceNavigation = mutationGeneric({
  args: {
    location: locationValidator,
    items: v.array(
      v.object({
        label: v.string(),
        href: v.string(),
        order: v.number(),
        visible: v.boolean(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('navigationItems')
      .withIndex('by_location', (q) => q.eq('location', args.location))
      .collect()

    await Promise.all(existing.map((item) => ctx.db.delete(item._id)))

    const now = Date.now()

    return await Promise.all(
      args.items.map((item) =>
        ctx.db.insert('navigationItems', {
          ...item,
          location: args.location,
          updatedAt: now,
        }),
      ),
    )
  },
})

export const bootstrapSite = mutationGeneric({
  args: {},
  handler: async (ctx) => {
    const now = Date.now()

    const [settings] = await ctx.db
      .query('siteSettings')
      .withIndex('by_updatedAt')
      .order('desc')
      .take(1)

    if (!settings) {
      await ctx.db.insert('siteSettings', {
        siteTitle: 'nate.space',
        siteDescription: 'Personal site, writing archive, and project index.',
        homeHeadline: 'A personal site powered by Convex.',
        homeIntro:
          'Writing, projects, and notes managed from a CMS instead of hardcoded route content.',
        statusMessage: 'Building the CMS foundation.',
        availableForWork: true,
        updatedAt: now,
      })
    }

    const headerItems = await ctx.db
      .query('navigationItems')
      .withIndex('by_location', (q) => q.eq('location', 'header'))
      .collect()

    if (headerItems.length === 0) {
      await ctx.db.insert('navigationItems', {
        location: 'header',
        label: 'Home',
        href: '/',
        order: 0,
        visible: true,
        updatedAt: now,
      })
      await ctx.db.insert('navigationItems', {
        location: 'header',
        label: 'CMS',
        href: '/cms',
        order: 1,
        visible: true,
        updatedAt: now,
      })
    }

    const footerItems = await ctx.db
      .query('navigationItems')
      .withIndex('by_location', (q) => q.eq('location', 'footer'))
      .collect()

    if (footerItems.length === 0) {
      await ctx.db.insert('navigationItems', {
        location: 'footer',
        label: 'GitHub',
        href: 'https://github.com',
        order: 0,
        visible: true,
        updatedAt: now,
      })
    }

    return { ok: true }
  },
})
