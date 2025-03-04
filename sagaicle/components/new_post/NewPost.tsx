"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import { useEffect, useState } from "react";
import TagSelector from "../search/search_form/TagSelector";

import * as api from "@/api/services";
import * as schema from "@/api/schemas";

function NewPost() {
  const [tagNames, setTagNames] = useState<schema.TagArray | null>(null);
  const [tags, setTags] = useState<schema.TagArray>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: undefined,
      description: undefined,
      fullDescription: undefined,
      distance: undefined,
      time: undefined,
      totalCheckpoints: undefined,
      images: [],
      map: undefined,
      checkpoints: [],
    },
  });

  const fetchTagNames = async () => {
    try {
      const result = await api.getTags();
      setTagNames(() => result.tags);
    } catch (error) {
      setTagNames(() => null);
    }
  };

  useEffect(() => {
    fetchTagNames();
    imagesField.append({ url: "" });
    CheckpointsField.append({ name: "", lat: 0, lng: 0 });
  }, []);

  const imagesField = useFieldArray({
    control: form.control,
    name: "images",
  });

  const CheckpointsField = useFieldArray({
    control: form.control,
    name: "checkpoints",
  });

  //フォーム送信時の処理
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const postData = {
      title: values.title,
      description: values.description,
      fullDescription: values.fullDescription,
      distance: values.distance,
      time: values.time,
      tags: tags,
      totalCheckpoints: values.checkpoints.length,
      images: values.images.map((image) => image.url),
      map: values.map,
      checkpoints: values.checkpoints.map((checkpoint) => ({
        name: checkpoint.name,
        lat: checkpoint.lat,
        lng: checkpoint.lng,
      })),
    };

    try {
      await api.postRoute(postData);
      alert("投稿しました");
    } catch (error) {
      alert("投稿に失敗しました");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-80 md:w-full m-2 p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border border-theme-gray rounded-lg"
      >
        {/*左列 */}
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="title" className="text-theme-gray">
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
                <Label htmlFor="description" className="text-theme-gray">
                  ひとこと説明
                </Label>
                <FormControl>
                  <Textarea id="description" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullDescription"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="full-description" className="text-theme-gray">
                  詳細説明
                </Label>
                <FormControl>
                  <Textarea id="full-discription" {...field} className="h-36" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="text-theme-gray">
                <Label>タグを選択</Label>
                <FormControl>
                  <TagSelector
                    tagNames={tagNames ?? []}
                    tags={tags}
                    setTags={setTags}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/*右列 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="distance" className="text-theme-gray">
                    距離
                  </Label>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input id="distance" {...field} className="w-full" />
                      <span className="text-sm text-theme-gray">km</span>
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
                    className="text-theme-gray w-full max-w-md"
                  >
                    所要時間
                  </Label>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input id="time" {...field} className="w-full" />
                      <span className="text-sm text-theme-gray">分</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="map"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="map" className="text-theme-gray">
                  地図URL
                </Label>
                <FormControl>
                  <Input id="map" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 border border-theme-gray rounded-lg p-4">
            {CheckpointsField.fields.map((fieldItem, index, array) => (
              <div
                key={fieldItem.id}
                className={`flex flex-col gap-2 border-b border-theme-gray p-2 pt-0 ${
                  index === array.length - 1 ? "border-none" : ""
                }`}
              >
                <FormField
                  control={form.control}
                  name={`checkpoints.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor={`checkpoints-${index}`}
                        className="text-theme-gray"
                      >
                        チェックポイント {index + 1}
                      </Label>
                      <FormControl>
                        <Input id={`checkpoints-${index}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center gap-8">
                  <FormField
                    control={form.control}
                    name={`checkpoints.${index}.lat`}
                    render={({ field }) => (
                      <FormItem>
                        <Label
                          htmlFor={`checkpoints-${index}-lat`}
                          className="text-theme-gray"
                        >
                          緯度
                        </Label>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              id={`checkpoints-${index}-lat`}
                              {...field}
                              className="w-full"
                            />
                            <span className="text-sm text-theme-gray">°</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    key={fieldItem.id}
                    control={form.control}
                    name={`checkpoints.${index}.lng`}
                    render={({ field }) => (
                      <FormItem>
                        <Label
                          htmlFor={`checkpoints-${index}-lng`}
                          className="text-theme-gray"
                        >
                          経度
                        </Label>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              id={`checkpoints-${index}-lng`}
                              {...field}
                              className="w-full"
                            />
                            <span className="text-sm text-theme-gray">°</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => CheckpointsField.remove(index)}
                    className="bg-white border border-red-500 text-red-500 hover:bg-gray-50 transition-colors duration-200 mt-8 "
                  >
                    削除
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={() =>
              CheckpointsField.append({ name: "", lat: 0, lng: 0 })
            } //追加ボタンを押すと、新しいチェックポイントを追加
            className="bg-theme-yellow text-theme-gray px-4 py-2 rounded hover:bg-theme-yellow"
          >
            チェックポイントを追加
          </Button>

          {imagesField.fields.map((fieldItem, index) => (
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
                    画像URL {index + 1}
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
                        onClick={() => imagesField.remove(index)}
                        className="bg-white border border-red-500 text-red-500 hover:bg-gray-50 transition-colors duration-200"
                      >
                        削除
                      </Button>
                    )}
                  </div>
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            onClick={() => imagesField.append({ url: "" })}
            className="bg-theme-yellow text-theme-gray px-4 py-2 rounded hover:bg-theme-yellow"
          >
            画像を追加
          </Button>
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "送信中..." : "投稿"}
        </Button>
      </form>
    </Form>
  );
}

export default NewPost;
