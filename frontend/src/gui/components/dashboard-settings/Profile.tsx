import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/gui/components/ui/form";
import { Input } from "@/gui/components/ui/input";
import { Button } from "@/gui/components/ui/button";
import FileUploader from "@/gui/components/common/FileUploader";
import UserAvatar from "@/gui/components/common/UserAvatar";
import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Profile = () => {
	const { updateUserProfile, user } = useAuth();
	const [imgUrl, setImgUrl] = useState<string | null | undefined>(user.data?.photo);
	const profileFormSchema = z.object({
		firstName: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		lastName: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		email: z.string().email(),
		photo: z.string()
    .regex(/^data:image\/(jpeg|png|gif);base64,|^$/, {
      message: "Your photo should be a valid format: JPEG, PNG or GIF.",
    })
		.optional()
    .refine((data) => {
		// Check size
		if (data) {
			const base64String = data.split(',')[1];
			const size = (base64String.length * 3) / 4;
			return size <= 5 * 1024 * 1024;
		} else {
			return true;
		}
    }, {
      message: "The file uploaded must be less than 5Mo.",
    }),
	});

	const form = useForm<z.infer<typeof profileFormSchema>>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			firstName: user.data?.firstName,
			lastName: user.data?.lastName,
			email: user.data?.email,
			photo: undefined
		},
	});

	const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
		try {
			updateUserProfile(values);
			toast.success("Profile informations updated with success.");
		} catch (error) {
			toast.error(
				"Oops something went wrong, cannot update your profile, please retry later."
			);
			console.error(error);
		}
	}

	return (
		<div>
			<h2 className="text-3xl font-extrabold dark:text-white text-center">Settings</h2>
			<p className="my-4 text-lg text-gray-500 text-center">
				Update your basic profile information such as email, first name, last name and photo.
			</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="flex gap-4 flex-wrap p-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({field}) => (
								<FormItem className="flex-1 w-md basis-96">
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input {...field}/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({field}) => (
								<FormItem className="flex-1 w-md basis-96">
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input {...field}/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({field}) => (
								<FormItem className="flex-1 w-md basis-96">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field}/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex justify-center items-center">
						<FormField
							control={form.control}
							name="photo"
							render={({field}) => (
								<FormItem className="flex-1 w-md basis-96 text-center">
									<FormLabel>Profile image</FormLabel>
									<FormControl>
										<FileUploader
											setFileTempUrl={setImgUrl}
											description="Choose your profile image"
											deleteLabel="Delete profile photo"
											render={<UserAvatar url={imgUrl} size={80} />}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="py-3 text-center">
						<Button
							type="submit"
							className="w-3/4 bg-primary-green hover:opacity-85 hover:bg-primary-green hover:text-white"
						>
							{user.isProcessing && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Update my profile
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Profile;