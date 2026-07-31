import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AccountDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Blend account</DialogTitle>
          <DialogDescription>
            Sign in to track orders, save your basket and unlock member prices.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Register</TabsTrigger>
            <TabsTrigger value="track">Track</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-3 pt-4">
            <Field id="si-email" label="Email or phone" placeholder="you@example.com" />
            <Field id="si-pass" label="Password" type="password" placeholder="••••••••" />
            <Button
              className="w-full"
              onClick={() => {
                toast.success("Welcome back to Blend Supermarket");
                setOpen(false);
              }}
            >
              Sign in
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-3 pt-4">
            <Field id="su-name" label="Full name" placeholder="Chinelo Okafor" />
            <Field id="su-phone" label="Phone number" placeholder="0806 000 0000" />
            <Field id="su-pass" label="Password" type="password" placeholder="••••••••" />
            <Button
              className="w-full"
              onClick={() => {
                toast.success("Account created", {
                  description: "Enjoy ₦1,000 off your first order.",
                });
                setOpen(false);
              }}
            >
              Create account
            </Button>
          </TabsContent>

          <TabsContent value="track" className="space-y-3 pt-4">
            <Field id="tr-id" label="Order ID" placeholder="BLND-2481" />
            <Button
              className="w-full"
              variant="secondary"
              onClick={() =>
                toast("Order BLND-2481 is out for delivery", {
                  description: "Rider Emeka • arriving in about 45 minutes.",
                })
              }
            >
              Track order
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} maxLength={120} />
    </div>
  );
}