"use client";
import { Urls } from "@/interfaces/enum/urls";
import Layout from "../../_layouts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import CreateBookDialog from "@/components/books/create-book-dialog";
import { useGetBooks } from "@/hooks/books/use-get-books";
import { IBook } from "@/interfaces/Book";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/ui/link-preview";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteBook } from "@/app/api/books/delete-book";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { PaginationFull } from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export default function BooksPage() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) ?? "1";

  const { books } = useGetBooks({
    page,
  });

  const { mutateAsync: deleteBookFn } = useMutation({
    mutationFn: deleteBook,
    mutationKey: ["delete-book"],
    async onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["get-books"],
      });
      toast.success(data.message);
    },
  });

  return (
    <Layout breadcrumbItems={<BreadcrumbItems />}>
      <div className="flex justify-end">
        <CreateBookDialog />
      </div>
      <ul className="w-full flex flex-col gap-4">
        {books ? (
          books.data.total > 0 ? (
            books.data.data.map((book: IBook) => {
              return (
                <Dialog key={book.id}>
                  <DialogTrigger>
                    <div className="hover:bg-accent px-4 py-2 rounded-lg flex justify-between items-center">
                      <div className="flex gap-4 flex-col md:flex-row">
                        <div>
                          <Image
                            width={100}
                            height={100}
                            src={book.full_path}
                            alt={book.title}
                            className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left">
                            {book.title}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 text-center md:text-left">
                            {book.category.name}
                          </p>
                        </div>
                      </div>
                      <Button variant="secondary">Ver livro</Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{book.title}</DialogTitle>
                      <DialogDescription>{book.synopsis}</DialogDescription>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          onClick={() => {
                            deleteBookFn({ id: book.id });
                          }}
                          variant="destructive"
                          className="w-full"
                          size="icon">
                          <Trash2 />
                        </Button>
                        <Button className="!p-0">
                          <LinkPreview
                            url={book.pdf_full_path}
                            imageSrc={book.full_path}
                            isStatic
                            className="font-bold w-full px-2 py-4">
                            Ver livro
                          </LinkPreview>
                        </Button>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              );
            })
          ) : (
            <div className="text-center font-bold py-4">
              👀 Nenhum livro encontrado
            </div>
          )
        ) : (
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-20 mb-4 w-full" />
          ))
        )}
      </ul>
      {books && (
        <div className="p-4">
          <PaginationFull
            pageIndex={books.data.current_page}
            totalCount={books.data.total}
            perPage={books.data.per_page}
          />
        </div>
      )}
    </Layout>
  );
}

function BreadcrumbItems() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={Urls.BOOKS}>Livros</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
