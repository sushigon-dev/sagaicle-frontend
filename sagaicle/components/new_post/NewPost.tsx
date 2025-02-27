"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import formSchema from "./validation_rule";
import { useAuth } from "@/context/AuthContext";
import { backendAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import TagSelector from "../search/search_form/TagSelector";

type GetRequestData = {
  title: string;
  description: string;
  full_description: string;
  distance: number;
  time: number;
  tags: string[];
  total_checkpoints: number;
  images: string[];
  map: string;
};
function NewPost() {
  const [tagNames, setTagNames] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const { user, loading, fetchUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      full_description: "",
      distance: 0,
      time: 0,
      total_checkpoints: 0,
      images: [],
      map: "",
      tags: [],
    },
  });

  useEffect(() => {
    setTagNames(() => ["タグ1", "タグ2"]);
    append({ url: "" });
  }, []);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  //フォーム送信時の処理
  // const handleSubmit = async (values: z.infer<typeof formSchema>) => {
  //   const postData = {
  //     email: values.email?.trim(),
  //     password: values.password?.trim(),
  //   };

  //   console.log("Submitting Signin Data:", postData);

  //   const res = await fetch(backendAPI("/api/auth/login"), {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(postData),
  //   });

  //   if (res.ok) {
  //     window.location.reload();
  //     console.log("Signin Success");
  //   } else {
  //     const data = await res.json();
  //     console.log("Signin Failed:", data);
  //   }

  //   await fetchUser();
  // };

  return (
    <Form {...form}>
      <form
        // onSubmit={}
        className="m-2 w-80 md:w-full border border-theme-gray rounded-lg p-4 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/*左列 */}
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="title" className="font-medium text-theme-gray">
                  タイトル
                </Label>
                <FormControl>
                  <Input id="title" {...field} />
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
                <Label
                  htmlFor="description"
                  className="font-medium text-theme-gray"
                >
                  ひとこと説明
                </Label>
                <FormControl>
                  <Textarea id="description" {...field} className="h-24" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_description"
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor="full_description"
                  className="font-medium text-theme-gray"
                >
                  詳細説明
                </Label>
                <FormControl>
                  <Textarea id="full_discription" {...field} className="h-24" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/*右列 */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="distance"
                    className="font-medium text-theme-gray w-full max-w-md"
                  >
                    距離
                  </Label>
                  <FormControl>
                    <div className="flex items-center">
                      <Input id="distance" {...field} className="w-full" />
                      <span className="ml-2 text-sm text-theme-gray">km</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="time"
                    className="font-medium text-theme-gray w-full max-w-md"
                  >
                    所要時間
                  </Label>
                  <FormControl>
                    <div className="flex items-center">
                      <Input id="time" {...field} className="w-full" />
                      <span className="ml-2 text-sm text-theme-gray">分</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="font-medium text-theme-gray text-sm">タグ</div>
          <TagSelector tagNames={tagNames} tags={tags} setTags={setTags} />

          <FormField
            control={form.control}
            name="total_checkpoints"
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor="total_checkpoints"
                  className="font-medium text-theme-gray"
                >
                  チェックポイント
                </Label>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      id="total_checkpoints"
                      {...field}
                      className="max-w-20"
                    />
                    <span className="ml-2 text-sm text-theme-gray">個</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="map"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="map" className="font-medium text-theme-gray">
                  地図URL
                </Label>
                <FormControl>
                  <Input id="map" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          {fields.map((fieldItem, index) => (
            <FormField
              key={fieldItem.id}
              control={form.control}
              name={`images.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor={`images-${index}`}
                    className="font-medium text-theme-gray"
                  >
                    画像URL&emsp;{index + 1}
                  </Label>
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Input id={`images-${index}`} {...field} />
                    </FormControl>
                    <FormMessage />
                    {/* インデックスが 0 の場合は削除ボタンを表示しない */}
                    {index !== 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                        className="bg-white border border-red-500 text-red-500 hover:bg-gray-50 transition-colors duration-200 "
                      >
                        削除
                      </Button>
                    )}
                  </div>
                </FormItem>
              )}
            />
          ))}

          {/* フィールド数が6未満の場合のみ追加ボタンを表示 */}
          {fields.length < 6 && (
            <Button
              type="button"
              onClick={() => append({ url: "" })}
              className="bg-theme-yellow text-theme-gray px-4 py-2 rounded hover:bg-theme-yellow"
            >
              画像URLを追加
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default NewPost;
