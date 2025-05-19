import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { g: v.id("ghosts"), opened: v.boolean() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!args.opened) return { encountered: false, count: 0 };
    const encounters = await ctx.db
      .query("encounters")
      .withIndex("ghost", (q) => q.eq("ghost", args.g))
      .collect();

    const userIds = encounters.map((enc) =>
      enc.user === userId ? enc.user : undefined
    );
    const count = encounters.length;
    const user = await Promise.all(
      userIds.filter((g) => g !== undefined).map((g) => ctx.db.get(g))
    );
    return {
      encountered: user && user.length > 0 && user[0]?._id === userId,
      count,
    };
  },
});

export const updateEncounter = mutation({
  args: { id: v.id("ghosts"), encounter: v.boolean() },
  handler: async (ctx, { id, encounter }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;
    const encounters = await ctx.db
      .query("encounters")
      .withIndex("ghost", (q) => q.eq("ghost", id))
      .collect();
    const exists = encounters.find((enc) => enc.user === userId);
    if (encounter && !exists)
      await ctx.db.insert("encounters", { user: userId, ghost: id });
    else if (!encounter && !!exists) await ctx.db.delete(exists._id);
  },
});
