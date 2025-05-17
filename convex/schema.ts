import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ghosts: defineTable({
    name: v.string(),
    lat: v.float64(),
    long: v.float64(),
    personality: v.string(),
    location: v.string(), // house, building, outside, park, etc
    encounters: v.number(),
  }), // todo: add presence: felt, subtle, manfestation, etc
});
