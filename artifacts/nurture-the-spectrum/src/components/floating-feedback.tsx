import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MessageSquarePlus, X, CheckCircle2 } from "lucide-react";

const feedbackSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Please share a bit more (10+ characters)"),
});

export function FloatingFeedback() {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();
  const submitMutation = useSubmitContact();

  // Hide on admin pages
  if (location.startsWith("/admin")) return null;

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof feedbackSchema>) => {
    submitMutation.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
          form.reset();
        },
        onError: (error) => {
          const message =
            (error as { error?: string } | undefined)?.error ||
            "Please try again in a moment.";
          toast({
            title: "Could not send feedback",
            description: message,
            variant: "destructive",
          });
        },
      },
    );
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setIsSuccess(false), 250);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setTimeout(() => setIsSuccess(false), 250);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          aria-label="Send feedback"
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 h-14 w-14 sm:h-auto sm:w-auto sm:px-5 sm:py-3 rounded-full shadow-xl gap-2 hover:scale-105 transition-transform"
        >
          {open ? (
            <X className="w-5 h-5" />
          ) : (
            <>
              <MessageSquarePlus className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Feedback</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        className="w-[calc(100vw-2.5rem)] sm:w-96 p-0 rounded-2xl shadow-2xl border-border/60"
      >
        {isSuccess ? (
          <div className="p-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-3" />
            <h3 className="font-bold text-lg text-foreground mb-1">Thank you!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your feedback has been received. We'll be in touch soon.
            </p>
            <Button onClick={handleClose} variant="outline" size="sm">
              Close
            </Button>
          </div>
        ) : (
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-foreground">Send us feedback</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  We'd love to hear from you.
                </p>
              </div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" className="h-9" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" className="h-9" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what's on your mind..."
                          className="min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitMutation.isPending}
                  size="sm"
                >
                  {submitMutation.isPending ? "Sending..." : "Send Feedback"}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
