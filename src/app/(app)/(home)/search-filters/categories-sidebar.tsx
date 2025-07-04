import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useTRPC } from "@/trpc/client";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ onOpenChange, open }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

  const router = useRouter()

  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CategoriesGetManyOutput[1] | null>(null)

  // If we have parent categories, show those; otherwise, show root Categories
  const currentCategories = parentCategories ?? data ?? []

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null)
    setParentCategories(null)
    onOpenChange(open)
  }

  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput)
      setSelectedCategory(category)
    } else {
      // This is a leaf category -> no subcategories
      if (parentCategories && selectedCategory) {
        // This is a subcategory - navigate to /category/subcategory
        router.push(`/${selectedCategory.slug}/${category.slug}`)
      } else {
        // This is a main category - navigate to /CustomCategory
        if (category.slug === "all") router.push("/")
        else router.push(`/${category.slug}`)
      }

      handleOpenChange(false)
    }
  }

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  }

  const backgroundColor = selectedCategory?.color || "white"

  return (
    <Sheet
      open={open}
      onOpenChange={handleOpenChange}
    >
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{
          backgroundColor
        }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>
            Categories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea
          className="flex flex-col overflow-y-auto h-full pb-2"
        >
          {parentCategories && (
            <button
              onClick={() => handleBackClick()}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              <ChevronLeft className="size-4 mr-2 " />
              back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
            >
              <Link
                href={`/${category.slug === "all" ? "" : category.slug}`}
              >
                {category.name}
              </Link>
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
