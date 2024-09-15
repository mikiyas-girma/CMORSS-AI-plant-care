import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/gui/components/ui/form"
import { Input } from "@/gui/components/ui/input"
import { Button } from "@/gui/components/ui/button"
import useAuth from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

const Password = () => {
	const passwordFormSchema = z.object({
		password: z.string()
			.min(8, { message: "Password must be at least 8 characters long." })
			.regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
			.regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
			.regex(/[0-9]/, { message: "Password must contain at least one number." }),
		confirmedPassword: z.string()
	})
	.superRefine((val, ctx) => {
		if (val.password !== val.confirmedPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords do not match.",
				path: ['confirmedPassword']
			});
		}
	});

	const form = useForm<z.infer<typeof passwordFormSchema>>({
		resolver: zodResolver(passwordFormSchema),
		defaultValues: {
			password: "",
			confirmedPassword: ""
		},
	});

	const { updateUserPassword, user: {isProcessing} } = useAuth();

  const onSubmit = async (values: z.infer<typeof passwordFormSchema>) => {
		try {
			updateUserPassword(values);
			toast.success("Your password was updated with success.");
		} catch (error) {
			toast.error("Oops something went wrong, cannot update your password, please retry later.");
			console.error(error);
		}
  }

	return (
		<div>
			<h2 className="text-3xl font-extrabold dark:text-white text-center">Password</h2>
			<p className="my-4 text-lg text-gray-500 text-center">
				Update your password.
			</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">
					<div className="grid max-w-sm items-center gap-1.5">
						<FormField
							control={form.control}
							name="password"
							render={({field}) => (
								<FormItem className="flex-1 w-md basis-96">
									<FormLabel>New password</FormLabel>
									<FormControl>
										<Input {...field}/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid max-w-sm items-center gap-1.5">
						<FormField
							control={form.control}
							name="confirmedPassword"
							render={({field}) => (
								<FormItem className="flex-1 w-md basis-96">
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<Input {...field}/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full">
						<Button
							type="submit"
							className="w-2/4 bg-red-500 hover:opacity-85 hover:bg-red-500 hover:text-white"
						>
							{isProcessing && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Update my password
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default Password;