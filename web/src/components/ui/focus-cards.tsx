"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ICategory } from "@/interfaces/Category";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { deleteCategory } from "@/app/api/categories/delete-category";
import { Button } from "@/components/ui/button";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}>
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}>
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

export const CategoryCard = ({
  card,
  index,
  hovered,
  setHovered,
  category,
}: {
  card: any;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  category: ICategory;
}) => {
  const { mutateAsync: deleteCategoryFn } = useMutation({
    mutationFn: deleteCategory,
    mutationKey: ["store-sales"],
    async onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });
      toast.success(data.message);
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <div
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
            hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
          )}>
          <Image
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute inset-0"
          />
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
              hovered === index ? "opacity-100" : "opacity-0"
            )}>
            <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
              {card.title}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category.name}</DialogTitle>
          <DialogDescription>{category.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              onClick={async () => {
                await deleteCategoryFn({
                  id: category.id,
                });
              }}
              type="button"
              variant="destructive">
              Apagar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
