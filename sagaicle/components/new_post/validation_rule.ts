import * as z from "zod";

// const tagSchema = z
//   .string()
//   .array()
//   .min(1, "タグは少なくとも1つ以上選択してください");

const formSchema = z.object({
  title: z
    .string()
    .max(20, "タイトルは20文字以内で入力してください")
    .min(1, "タイトルを入力してください"),
  description: z
    .string()
    .max(60, "ひとこと説明は60文字以内で入力してください")
    .min(1, "ひとこと説明を入力してください"),
  fullDescription: z
    .string()
    .max(200, "詳細説明は60文字以内で入力してください")
    .min(1, "詳細説明を入力してください"),
  distance: z.number().min(0, "距離は0以上の値を入力してください"),
  time: z.number().int().min(0, "時間は0以上の値を入力してください"),
  // tags: z.array(z.string()).min(1, "タグを入力してください"),
  totalCheckpoints: z
    .number()
    .int()
    .max(20, "チェックポイントは20個以内で入力してください")
    .min(1, "チェックポイントを入力してください"),
  images: z
    .array(
      z.object({
        url: z
          .string()
          .max(1023, "画像URLは1023文字以内で入力してください")
          .min(8, "画像URLは8文字以上で入力してください")
          .regex(/https\:.*/),
      })
    )
    .max(6, "画像URLは6枚以内で入力してください")
    .min(1, "画像URLを入力してください"),
  map: z
    .string()
    .max(1023, "マップのURLは1023文字以内で入力してください")
    .min(8, "マップのURLは8文字以上で入力してください")
    .regex(/https\:.*/),
  checkpoints: z
    .array(
      z.object({
        name: z.string().min(1, "チェックポイント名を入力してください"),
        lat: z
          .number()
          .min(-90, "緯度は-90以上の値を入力してください")
          .max(90, "緯度は90以下の値を入力してください"),
        lng: z
          .number()
          .min(-180, "経度は-180以上の値を入力してください")
          .max(180, "経度は180以下の値を入力してください"),
      })
    )
    .min(1, "少なくとも1つのチェックポイントを入力してください"),
});

export default formSchema;
