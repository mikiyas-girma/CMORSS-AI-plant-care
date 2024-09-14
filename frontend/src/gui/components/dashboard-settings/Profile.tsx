import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import FileUploader from "../common/FileUploader"

const Profile = () => {
	const profileFormSchema = z.object({
		firstName: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		lastName: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		email: z.string().email(),
		photo: z.string()
	})

	const form = useForm<z.infer<typeof profileFormSchema>>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
		},
	})

  const onSubmit = async event => {
    event.preventDefault();
  }

	return (
		<div>
			<h2 className="text-3xl font-extrabold dark:text-white text-center">Profile Settings</h2>
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
								<FormItem className="flex-1 w-md basis-96">
									<FormLabel>Profile image</FormLabel>
									<FormControl>
										<FileUploader
											deleteLabel="Delete profile photo"
											onFileDelete={() => {}}
											render={"Image"}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Profile;