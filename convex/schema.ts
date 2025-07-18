import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  ghosts: defineTable({
    name: v.string(),
    lat: v.float64(),
    long: v.float64(),
    personality: v.string(),
    location: v.string(), // house, building, outside, park, etc
    presence: v.optional(v.string()), // felt, subtle, manfestation,
  }),
  encounters: defineTable({
    user: v.id("users"),
    ghost: v.id("ghosts"),
  })
    .index("user", ["user"])
    .index("ghost", ["ghost"]),
});
