
import { Category } from '@/payload-types';
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1, // Populate subcategories 1 level deep only
      pagination: false,
      where: {
        parent: {
          exists: false
        }
      },
      sort: "name"
    })

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // Because of 'depth: 1' we know that 'doc' will be a type of 'Category'
        ...(doc as Category),
        subcategories: undefined
      }))
    }))

    return formattedData
  })
})
