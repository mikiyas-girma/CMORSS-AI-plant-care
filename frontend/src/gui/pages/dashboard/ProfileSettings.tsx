import Password from "@/gui/components/dashboard-settings/Password";
import Profile from "@/gui/components/dashboard-settings/Profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/gui/components/ui/tabs"

export default function ProfileSettings () {

	return (
		<Tabs defaultValue="account">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				<Profile />
			</TabsContent>
			<TabsContent value="password">
				<Password />
			</TabsContent>
		</Tabs>
	);
}