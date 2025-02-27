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
import { backendAPI } from "@/lib/api";

interface RegisterFormProps {
  loginLink?: string;
}

function RegisterForm({ loginLink }: RegisterFormProps) {
  const router = useRouter();
  const { user, loading, fetchUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const postData = {
      email: values.email?.trim(),
      password: values.password?.trim(),
    };

    console.log("Submitting Signup Data:", postData);

    const res = await fetch(backendAPI("/api/auth/signup"), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (res.ok) {
      window.location.reload();
      console.log("Signup Success");
    } else {
      const data = await res.json();
      console.log("Signup Failed:", data);
    }

    await fetchUser();
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email" className="font-medium text-theme-gray">
                  E-mail
                </Label>
                <FormControl>
                  <Input id="email" type="email" {...field} />
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
