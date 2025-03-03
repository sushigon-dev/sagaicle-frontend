"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { OAuthButton } from "../oauth/OAuthButton";

import formSchema from "./validation_rule";
import { useAuth } from "@/context/AuthContext";
import * as api from "@/api/services";
import { AuthRequest } from "@/api/types";

interface RegisterFormProps {
  loginLink?: string;
}

function RegisterForm({ loginLink }: RegisterFormProps) {
  const router = useRouter();
  const { user, loading, fetchUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { userName: "", password: "" },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const postData = {
      userName: values.userName?.trim(),
      password: values.password?.trim(),
    };

    console.log("Submitting Signup Data:", postData);

    try {
      await api.login(postData);
      await fetchUser();
      setTimeout(() => {
        router.push("/search");
      }, 2000);
    } catch (error) {
      form.setError("root", { message: "登録に失敗しました。" });
    }
  };

  return (
    <div className="flex flex-col p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 m-2"
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor="user-name"
                  className="font-medium text-theme-gray"
                >
                  username
                </Label>
                <FormControl>
                  <Input id="user-name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label
                  htmlFor="password"
                  className="font-medium text-theme-gray"
                >
                  Password
                </Label>
                <FormControl>
                  <Input id="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "送信中..." : "送信"}
            </Button>
            {loginLink && (
              <div className="text-xs text-theme-gray mx-auto">
                既にアカウントをお持ちですか？{" "}
                <span
                  onClick={() => router.push(loginLink)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  ログイン
                </span>
              </div>
            )}
          </div>
          {form.formState.errors.root && (
            <p className="mt-2 text-center text-sm text-red-600">
              {form.formState.errors.root.message}
            </p>
          )}
        </form>
      </Form>

      <div className="relative flex items-center my-4">
        <div className="flex-grow border-t border-border"></div>
        <span className="px-4 text-theme-gray text-sm">または</span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      <div className="flex flex-col justify-center gap-2 m-2">
        <OAuthButton
          logo="/oauth_logo/google.svg"
          alt="Google"
          apiUrl="/api/auth/google"
          text="Google で続行"
        />
        <OAuthButton
          logo="/oauth_logo/github.svg"
          alt="GitHub"
          apiUrl="/api/auth/github"
          text="GitHub で続行"
        />
      </div>
    </div>
  );
}

export default RegisterForm;
