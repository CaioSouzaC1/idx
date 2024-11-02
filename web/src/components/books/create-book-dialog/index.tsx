import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createBookSchema, CreateBookType } from "@/interfaces/Book/schema";
import { queryClient } from "@/lib/react-query";
import { createFormData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BookText } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBook } from "@/app/api/books/create-book";
import { FileUpload } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import SelectCategory from "@/components/categories/select-category";
import { useRef } from "react";

export default function CreateBookDialog() {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<CreateBookType>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
      synopsis: "",
      redirect_url: "",
      category_id: "",
    },
  });

  const { mutateAsync: createCategoryFn } = useMutation({
    mutationFn: createBook,
    mutationKey: ["create-book"],
    async onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["get-books"],
      });
      toast.success(data.message, {
        id: "create-book",
      });
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
    },
  });

  async function onSubmit(data: CreateBookType) {
    toast.loading("Criando Livro...", {
      id: "create-book",
    });
    await createCategoryFn(createFormData(data));
    form.reset();
  }

  const handleThumbUpload = (files: File[]) => {
    form.setValue("thumb", files[0]);
  };

  const handlePdfUpload = (files: File[]) => {
    form.setValue("pdf", files[0]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2" variant="outline">
          <span>Cadastrar</span>
          <BookText />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar novo livro</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="max-h-[60vh] pr-4 space-y-8 flex flex-col pb-8">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Ordem da Fenix" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SelectCategory form={form} />
                <FormField
                  control={form.control}
                  name="synopsis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sinopse</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Era uma vez..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="redirect_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Url de redirecionamento</FormLabel>
                      <FormControl>
                        <Input placeholder="https://google.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FileUpload onChange={handleThumbUpload} />
                <FileUpload
                  onChange={handlePdfUpload}
                  name="pdf"
                  text="PDF do livro"
                />
              </div>
            </ScrollArea>
            <div className="grid grid-cols-2 gap-4">
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    ref={closeButtonRef}
                    className="w-full"
                    type="button"
                    variant="secondary">
                    Voltar
                  </Button>
                </DialogClose>
              </DialogFooter>
              <Button className="w-full" type="submit">
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
