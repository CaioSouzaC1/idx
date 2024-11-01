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
import { BookUp2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  createCategorySchema,
  CreateCategoryType,
} from "@/interfaces/Category/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/app/api/categories/create-category";
import { queryClient } from "@/lib/react-query";
import { createFormData } from "@/lib/utils";
export default function CreateCategoryDialog() {
  const form = useForm<CreateCategoryType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutateAsync: createCategoryFn } = useMutation({
    mutationFn: createCategory,
    mutationKey: ["create-category"],
    async onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });
      toast.success(data.message, {
        id: "create-category",
      });
    },
  });

  async function onSubmit(data: CreateCategoryType) {
    toast.loading("Criando categoria...", {
      id: "create-category",
    });
    await createCategoryFn(createFormData(data));
    form.reset();
  }

  const handleFileUpload = (files: File[]) => {
    form.setValue("thumb", files[0]);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2" variant="outline">
          <span>Cadastrar</span>
          <BookUp2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar nova categoria</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Romance" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva a categoria"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FileUpload onChange={handleFileUpload} />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="submit" variant="secondary">
                  Cadastrar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
