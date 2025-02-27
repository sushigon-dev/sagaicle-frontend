import AlertDialog from "@/components/pop_up/AlertDialog";

interface LogoutFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function LogoutForm({ open, onOpenChange }: LogoutFormProps) {
  const handleLogout = async () => {
    console.log("Submitting Logout Request");

    const res = await fetch("api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      window.location.reload();
      console.log("Logout Success");
    } else {
      const data = await res.json();
      console.log("Logout Failed:", data);
    }
  };

  return (
    <AlertDialog
      title="ログアウト"
      descritpion="ログアウトしますか？"
      cancelMessage="キャンセル"
      actionMessage="ログアウト"
      actionVariant="default"
      actionOnClick={handleLogout}
      open={open}
      onOpenChange={onOpenChange}
    ></AlertDialog>
  );
}

export default LogoutForm;
