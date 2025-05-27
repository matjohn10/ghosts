import { getAuthUserId } from "@convex-dev/auth/server";
import type { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export type InsertGhost = Omit<Omit<Doc<"ghosts">, "_id">, "_creationTime">;

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ghosts").collect();
  },
});

export const getClose = query({
  args: {
    lat1: v.number(),
    long1: v.number(),
    lat2: v.number(),
    long2: v.number(),
  },
  handler: async (ctx, { lat1, long1, lat2, long2 }) => {
    return await ctx.db
      .query("ghosts")
      .filter((q) =>
        q.and(
          q.and(q.lte(q.field("lat"), lat2), q.lte(lat1, q.field("lat"))),
          q.and(q.lte(q.field("long"), long2), q.lte(long1, q.field("long")))
        )
      )
      .collect();
  },
});

export const createGhost = mutation({
  handler: async (ctx, args: { form: InsertGhost }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;
    const ghostId = await ctx.db.insert("ghosts", args.form);
    await ctx.db.insert("encounters", { user: userId, ghost: ghostId });
    return ghostId;
  },
});
