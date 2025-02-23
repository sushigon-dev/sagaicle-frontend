import { Button } from "@/components/ui/button";
import Image from "next/image";

interface OAuthButtonProps {
  logo: string;
  alt: string;
  apiUrl: string;
  text: string;
}

export function OAuthButton({ logo, alt, apiUrl, text }: OAuthButtonProps) {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-4 p-5"
      onClick={() => (window.location.href = apiUrl)}
    >
      <Image src={logo} alt={alt} width={20} height={20} />
      {text}
    </Button>
  );
}
