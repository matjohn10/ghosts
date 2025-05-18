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
    const ghostId = await ctx.db.insert("ghosts", args.form);
    return ghostId;
  },
});
