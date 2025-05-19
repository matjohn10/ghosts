import { getAuthUserId } from "@convex-dev/auth/server";
import { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { mutation } from "./_generated/server";

export type InsertGhost = Omit<Omit<Doc<"ghosts">, "_id">, "_creationTime">;

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ghosts").collect();
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
