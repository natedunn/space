import { mutationGeneric, queryGeneric } from 'convex/server'
import { v } from 'convex/values'

const kindValidator = v.union(
  v.literal('page'),
  v.literal('writing'),
  v.literal('project'),
  v.literal('note'),
)

const statusValidator = v.union(
  v.literal('draft'),
  v.literal('published'),
  v.literal('archived'),
)

export const listDocuments = queryGeneric({
  args: {
    kind: v.optional(kindValidator),
    status: v.optional(statusValidator),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 50, 100)

    if (args.kind && args.status) {
      return await ctx.db
        .query('documents')
        .withIndex('by_kind_status', (q: any) =>
          q.eq('kind', args.kind).eq('status', args.status!),
        )
        .order('desc')
        .take(limit)
    }

    if (args.kind) {
      return await ctx.db
        .query('documents')
        .withIndex('by_kind', (q) => q.eq('kind', args.kind!))
        .order('desc')
        .take(limit)
    }

    if (args.status) {
      return await ctx.db
        .query('documents')
        .withIndex('by_status', (q) => q.eq('status', args.status!))
        .order('desc')
        .take(limit)
    }

    return await ctx.db.query('documents').withIndex('by_updatedAt').order('desc').take(limit)
  },
})

export const getDocumentBySlug = queryGeneric({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('documents')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique()
  },
})

export const upsertDocument = mutationGeneric({
  args: {
    slug: v.string(),
    kind: kindValidator,
    status: statusValidator,
    title: v.string(),
    summary: v.optional(v.string()),
    body: v.string(),
    tags: v.array(v.string()),
    featured: v.boolean(),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()
    const existing = await ctx.db
      .query('documents')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: now,
      })
      return existing._id
    }

    return await ctx.db.insert('documents', {
      ...args,
      updatedAt: now,
      createdAt: now,
    })
  },
})

export const removeDocument = mutationGeneric({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('documents')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique()

    if (!existing) {
      return { ok: false }
    }

    await ctx.db.delete(existing._id)
    return { ok: true }
  },
})
